import { useEffect, useState } from "react";
import { Loader } from '@consta/uikit/Loader';
import { formatPoints } from "../../helpers/helpers";
import Gauge from "../../D3/gauge/Gauge";
import styles from "./WidgetRatingGaugeChart.module.css";

type responseData = {
    averageratingperiod1: number,
    averageratingperiod2: number,
    differenceratings: number,
    sign: 'plus' | 'minus' | 'zero'
};

export default function WidgetRatingGaugeChart() {
    const [data, setData] = useState<responseData>();
    const [isFetching, setIsFetching] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/WidgetRatingGaugeChartUseCase.json')
            const data = await response.json() as responseData;
            setData(data);
            setIsFetching(false);
        }

        setIsFetching(true);
        fetchData();
    },[])

    return (
        <div className={styles.widgetRatingGaugeChart}>
            <div className={styles.title}>Изменение средней оценки</div>
            <div className={styles.chartsContainer}>
                {(isFetching || !data) 
                    ? <Loader size='m' className={styles.loader}/>
                    : <> 
                        <Gauge value={data.averageratingperiod1} label="I квартал 2023"/>
                        <svg
                            className={styles.differenceContainer}
                            width={80}
                            viewBox={[
                                -40, -40,
                                80, 40,
                            ].join(" ")}
                        >
                            <text textAnchor="middle" y={-17} className={styles.differenceratings}>{formatPoints(data.differenceratings)}</text>
                            <path d="M0 0L4.5, -7.79L-4.5 -7.79Z" fill='#EB5757'/>
                        </svg>
                        <Gauge value={data.averageratingperiod2} label="II квартал 2023"/>
                    </>
                }
            </div>
        </div>
    );
}