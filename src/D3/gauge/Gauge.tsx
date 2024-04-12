import { arc } from "d3-shape"
import { scaleLinear } from "d3-scale"
import { ReactNode, useMemo  } from "react"
import styles from "./Gauge.module.css"
import { GaugeProps } from "./types"
import { calculatePointCoordinates } from "../../helpers/helpers"

const defaultOptions = {
    arcPoints: [-Math.PI / 2, 0, Math.PI * 0.2, Math.PI * 0.4, Math.PI / 2],
    arcColors: ['#F74141', '#FFA800', '#F2C94C', '#4ED273'],
    innerRadius: 91,
    outerRadius: 95,
    tickLength: 4,
    tickCount: 30, 
    lowValue: 0.7,
    lowLength: 23,
}

const Gauge = ({
    value,
    min=0,
    max=100,
    width=190,
    label,
    options,
}: GaugeProps) => {
    //Arcs computing
    const arcPoints = options?.arcPoints || defaultOptions.arcPoints;
    const arcColors = options?.arcColors || defaultOptions.arcColors;
    const innerRadius = options?.innerRadius || defaultOptions.innerRadius;
    const outerRadius = options?.outerRadius || defaultOptions.outerRadius;

    const arcs: Array<ReactNode> = [];
    for (let i = 0; i < arcPoints.length - 1; i++) {
        const tmpArc = arc()({
            innerRadius,
            outerRadius,
            startAngle: arcPoints[i],
            endAngle: arcPoints[i + 1],
        }) as string;

        arcs[i] = <path
            key={'arc' + i} 
            d={tmpArc}
            fill={arcColors[i]}
        />
    }

    //angle computing
    const percentScale = scaleLinear()
        .domain([min, max])
        .range([0, 1])
    const percent = percentScale(value)

    const angleScale = scaleLinear()
        .domain([0, 1])
        .range([arcPoints[0], arcPoints[arcPoints.length - 1]])
        .clamp(true)
    const angle = angleScale(percent);

    //indicator points
    const [x0, y0] = calculatePointCoordinates(0, 0, innerRadius, angle); //Конечная точка стрелки
    const [x1, y1] = calculatePointCoordinates(0, -17, 20, angle + 5 / 180 * Math.PI); //Правая точка стрелки
    const [x2, y2] = calculatePointCoordinates(0, -17, 20, angle - 5 / 180 * Math.PI); //Левая точка стрелки

    //pin
    const pinRadius = 17;
    let pinColor = '#F2C94C';
    for(let k = 0; k < arcPoints.length - 1; k++){
        if(angle >= arcPoints[k] && angle <= arcPoints[k + 1]){
            pinColor = arcColors[k];
        }
    }

    //ticks
    const tickLength = options?.tickLength || defaultOptions.tickLength;
    const tickCount = options?.tickCount || defaultOptions.tickCount; 
    const ticks: Array<ReactNode> = [];
    for(let k = 0; k <= tickCount; k += 1){
        const tickAngle = angleScale(k / tickCount);
        const [xt0, yt0] = calculatePointCoordinates(0, 0, innerRadius, tickAngle);
        const [xt1, yt1] = calculatePointCoordinates(0, 0, innerRadius - tickLength, tickAngle);
        ticks[k] = <line x1={xt0} y1={yt0} x2={xt1} y2={yt1} stroke="#B4B5B5" strokeWidth='1px' key={`tick${k}`}/>
    }

    //low
    const lowValue = options?.lowValue || defaultOptions.lowValue;
    const lowLength = options?.lowLength || defaultOptions.lowLength;
    const lowAngle = angleScale(lowValue);
    const [xl0, yl0] = calculatePointCoordinates(0, 0, (innerRadius + outerRadius) / 2 + lowLength / 2, lowAngle);
    const [xl1, yl1] = calculatePointCoordinates(0, 0, (innerRadius + outerRadius) / 2 - lowLength / 2, lowAngle);
    const low = <line x1={xl0} y1={yl0} x2={xl1} y2={yl1} stroke="#EB5757" strokeWidth='1px' strokeDasharray="3, 1"/>

    return (
        <div>
            {label && <div className={styles.gaugeLable}>{label}</div>}
            <svg 
                width={width}
                viewBox={[
                    -width / 2, -width / 2,
                    width, width / 2,
                ].join(" ")}
            >
                {arcs}
                <path id="indicator" 
                    d={`M${x1} ${y1}L${x2} ${y2}L${x0} ${y0}Z`}
                    fill='black'
                /> 
                <g id="pin"> 
                    <circle cx={0} cy={-pinRadius} r={pinRadius} fill={pinColor} />
                    <text textAnchor="middle" y='-10.7' style={{font: "16px / 16px Inter", fill: "white"}}>{value}</text>
                </g>
                <g id="ticks">
                    {ticks}
                </g>
                {low}
            </svg>
        </div>
    )
}

export default Gauge