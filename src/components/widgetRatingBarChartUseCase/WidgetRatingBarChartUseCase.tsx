import { useEffect, useState } from "react";
import Barplot from "../../D3/barplot/Barplot";
import { Loader } from "@consta/uikit/Loader";
import styles from "./WidgetRatingBarChartUseCase.module.css"

type ResponseData = {
    "companyid": number;	
    "companyname": string;	
    "ratingperiod1": number;	
    "contractsperiod1": number;
    "ratingperiod2": number;	
    "contractsperiod2": number;	
}[];

export default function WidgetRatingBarChartUseCase(){
    const {data, isFetching} = useBarPlotData();
    
    if(isFetching || !data) return <Loader />

    return (
        <div className={styles.widgetRatingBarChartUseCase}>
            <div className={styles.header}>Рейтинг контрагентов</div>
            <Barplot data={data} height={300}/>
        </div>
    );
}

function useBarPlotData() {
    const [data, setData] = useState<ResponseData>();
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/WidgetRatingBarChartUseCase.json')
            const data = await response.json() as ResponseData;
            setData(data);
            setIsFetching(false);
        }

        setIsFetching(true);
        fetchData();
    }, [])

    return { data, isFetching };
}