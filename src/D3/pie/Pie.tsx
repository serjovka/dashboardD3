import * as d3 from 'd3';
import { useEffect, useRef } from "react";
import { rating } from '../../components/widgetRatingPieChartUseCase/types';

type pieData = {
    label: string,
    type: rating,
    value: number,
};

export type pieChartProps = {
    data: pieData[];
    width: number;
    height: number;
    selectType: (value: rating) => void;
}

const pieChartColors = {
    excellent: '#22C38E',
    good: '#F2C94C',
    satisfactory: '#FFA800',
    bad: '#EB5757',
};

const MARGIN_X = 27;
const MARGIN_Y = 27;
const INFLEXION_PADDING = 20; // space between pie and label inflexion point

export default function Pie({ data, width, height, selectType }: pieChartProps) {
    const ref = useRef(null);
    useEffect(() => {
        if (!ref.current) return;
        
        const svg = d3.select(ref.current);
        svg.selectAll("*").remove(); // Очистка SVG

        const radius = Math.min(width - 2 * MARGIN_X, height - 2 * MARGIN_Y) / 2;

        const pie = d3.pie<pieData>()
            .value(d => d.value);

        const arc = d3.arc<d3.PieArcDatum<pieData>>()
            .innerRadius(0)
            .outerRadius(radius);
        
        const inflexionArc = d3.arc<d3.PieArcDatum<pieData>>()
            .innerRadius(radius + INFLEXION_PADDING)
            .outerRadius(radius + INFLEXION_PADDING);
        
        const g = svg.append('g')
            .attr('transform', `translate(${width / 2}, ${height / 2})`);

        const labelParams = (d: d3.PieArcDatum<pieData>) => {
            const centoid = arc.centroid(d);
            const inflexionPoint = inflexionArc.centroid(d);
            const isRightLabel = inflexionArc.centroid(d)[0] > 0;
            const labelPosX = inflexionArc.centroid(d)[0] + 50 * (isRightLabel ? 1 : -1);
            const textAnchor = isRightLabel ? "start" : "end";
            return {
                centoid,
                inflexionPoint,
                isRightLabel,
                labelPosX,
                textAnchor
            };
        } 

        g.selectAll('.arc')
            .data(pie(data))
            .enter()
            .append('path')
            .attr('class', 'arc')
            .attr('d', arc)
            .attr('fill', (d) => pieChartColors[d.data.type])
            .attr('stroke', 'white')
            .attr('stroke-width', 3)
            .on('click', function(_, d) {
                selectType(d.data.type)
            });

        g.selectAll('line')
            .data(pie(data))
            .enter()
            .append('line')
            .attr('x1', d => labelParams(d).centoid[0])
            .attr('y1', d => labelParams(d).centoid[1])
            .attr('x2', d => labelParams(d).inflexionPoint[0])
            .attr('y2', d => labelParams(d).inflexionPoint[1])
            .attr('stroke', (d) => pieChartColors[d.data.type])
        
        g.selectAll('line2')
            .data(pie(data))
            .enter()
            .append('line')
            .attr('x1', d => labelParams(d).inflexionPoint[0])
            .attr('y1', d => labelParams(d).inflexionPoint[1])
            .attr('x2', d => labelParams(d).labelPosX)
            .attr('y2', d => labelParams(d).inflexionPoint[1])
            .attr('stroke', (d) => pieChartColors[d.data.type])

        g.selectAll('text')
            .data(pie(data))
            .enter()
            .append('text')
            .attr('x', d => labelParams(d).labelPosX + (labelParams(d).isRightLabel ? 2 : -2))
            .attr('y', d => labelParams(d).inflexionPoint[1])
            .style('text-anchor', d => labelParams(d).textAnchor)
            .attr('dy', '0.35em')
            .text(d => d.data.label)

    }, [data, height, width]);
    
    return (
        <svg ref={ref} width={width} height={height}></svg>
      );
}