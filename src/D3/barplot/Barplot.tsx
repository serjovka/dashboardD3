import * as d3 from 'd3';
import { useEffect, useRef } from "react";
import { rating } from '../../components/widgetRatingPieChartUseCase/types';
import { getColor } from '../../helpers/helpers';

type BarPlotData = {	
    "companyid": number;	
    "companyname": string;	
    "ratingperiod1": number;	
    "contractsperiod1": number;
    "ratingperiod2": number;	
    "contractsperiod2": number;	
};

export type BarPlotProps = {
    data: BarPlotData[];
    height: number;
}

const OUTSIDE_MARGIN = {
    top: 12,
    right: 24,
    bottom: 50,
    left: 12,
}
const BAR_WIDTH = 24;
const PERIOD_MARGIN = 12;
const COMPANY_MARGIN = 150;
const TEXT_MARGIN = 2;

export default function Barplot({ data, height }: BarPlotProps) {
    const ref = useRef(null);
    useEffect(() => {
        if (!ref.current) return;
        
        const svg = d3.select(ref.current);
        
        svg.selectAll("*").remove(); // Очистка SVG
        
        const svgWidth = (svg.node() as Element).getBoundingClientRect().width; // Ширина всего svg элемента
        const width = (BAR_WIDTH * 4 + PERIOD_MARGIN) * (data.length) + COMPANY_MARGIN * (data.length - 1) // Ширина зоны визуализации
        height -= OUTSIDE_MARGIN.bottom - OUTSIDE_MARGIN.top;
        
        const x = d3.scaleBand()
            .range([OUTSIDE_MARGIN.left, width])
            .domain(data.map(d => d.companyname));

        const y = d3.scaleLinear()
            .range([height, OUTSIDE_MARGIN.top])
            .domain([0, 100]);


        const g = svg.append("g")
            .selectAll("g")
            .data(data)
            .enter().append("g")
            .attr("transform", d => `translate(${x(d.companyname) as number + x.bandwidth() / 2 - 2 * BAR_WIDTH - PERIOD_MARGIN}, 0)`)
        
        const groupData = (d: BarPlotData) => [
            { key: "ratingperiod1", value: d.ratingperiod1, color: `var(--${getColor(d.ratingperiod1)})`},
            { key: "contractsperiod1", value: d.contractsperiod1, color: `var(--color-bg-brand)`},
            { key: "ratingperiod2", value: d.ratingperiod2, color: `var(--${getColor(d.ratingperiod2)})`},
            { key: "contractsperiod2", value: d.contractsperiod2, color: `#2650BB`}
        ]

        svg.append("g")
            .attr("transform", `translate(15, ${height})`)
            .call(d3.axisBottom(x))
        
        svg.append("g")
            .call(d3.axisLeft(y)
                .ticks(10)
                .tickSize(-svgWidth))
            .attr('color', "var(--color-bg-border)")
            .attr('transform', 'translate(27)')
            .style('font-size', '12px')

        g.selectAll("rect")
            .data(groupData)
            .enter().append("rect")
            .attr("x", (_, i) => i * (BAR_WIDTH + PERIOD_MARGIN))
            .attr("y", d => y(d.value))
            .attr("width", BAR_WIDTH) 
            .attr("height", d => height - y(d.value))
            .attr("fill", (d) => d.color);

        g.selectAll("text")
            .data(groupData)
            .enter().append("text")
            .attr("x", (_, i) => i * (BAR_WIDTH + PERIOD_MARGIN) + BAR_WIDTH / 2)
            .attr("y", d => y(d.value) - TEXT_MARGIN)
            .attr("fill", "var('--color-typo-primary')")
            .attr("width", BAR_WIDTH)
            .attr("text-anchor", "middle")
            .text(d => d.value);
            
    }, [data, height]);
    
    return (
        <svg ref={ref} width='100%' height={height}></svg>
      );
}