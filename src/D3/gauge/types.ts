export type GaugeProps = {
    value: number,
    min?: number, 
    max?: number,
    width?: number,
    label?: string,
    options?: Options,
}

export type Options = {
    arcPoints?: number[],
    arcColors?: string[],
    innerRadius?: number,
    outerRadius?: number,
    tickLength?: number;
    tickCount?: number; 
    lowValue?: number,
    lowLength?: number,
}