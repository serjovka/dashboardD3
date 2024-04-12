import { Chart, register } from '@antv/g2';
import { useEffect, useRef } from 'react';
import { CustomIndicator } from './shape/customIndicator';

export default function Gauge({ value }: { value: number }){
    const chartContainer = useRef(null);

    useEffect(() => {
        register('shape.pin.customIndicator', CustomIndicator);

        if (chartContainer.current){
            const chart = new Chart({
                container: chartContainer.current,
                autoFit: true,
            });

            renderGauge(chart);
              
            return () => {
                chart.destroy();
            };
        }
    }, []);

    const renderGauge = ( chart: Chart ) => {

        chart.gauge(); // Gauge
        chart.interaction('tooltip', { disableNative: true }); // Disable tooltip
        chart.data({
            value: {
                target: value,
                total: 1,
                name: 'score',
                thresholds: [0.5, 0.7, 0.9, 1],
            },
        }); // Gauge Data
        chart.style('pointerShape', 'customIndicator');
        chart.scale('color', {
            range: ['#F74141', '#FFA800', '#F2C94C', '#4ED273'],
        }); // Gauge Colors   
        chart.style({
            arcLineWidth: 4,
            pointerShape: 'customIndicator',
            pinShape: 'customIndicator',
        });
        // chart.style('textContent', 
        //     (target: number, total: number) => {
        //         return `${(target / total) * 100}%`;
        //     },
        // );
        chart.legend(false); // Disable Gauge Legend
        chart.render().catch((error: any) => console.error(error)); // Render
    }
      
      // Рендер компонента
      return <div ref={chartContainer}></div>;

}