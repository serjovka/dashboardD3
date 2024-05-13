import { useEffect, useState } from "react";
import { Loader } from '@consta/uikit/Loader';
import styles from "./WidgetParamsUseCase.module.css";
import { responseData, raitingRegionsResponse, typesOfJobResponse } from "./types";
import { timeFormaterForSpeed } from "../../helpers/helpers";

export default function WidgetParamsUseCase() {
    const [data, setData] = useState<responseData>();
    const [isFetching, setIsFetching] = useState(false);
    const [regions, setRegions] = useState<raitingRegionsResponse>();
    const [jobs, setJobs] = useState<typesOfJobResponse>();
    const [error, setError] = useState<string>();

    useEffect(() => {
        const fetchRegions = async () => {
            const response = await fetch('/dictionaries/ratingregions.json')
            const data = await response.json() as raitingRegionsResponse;
            return data; 
        };

        const fetchJobs = async () => {
            const response = await fetch('/dictionaries/typesofjobs.json')
            const data = await response.json() as typesOfJobResponse;
            return data;
        }

        const fetchData = async () => {
            const response = await fetch('/WidgetParamsUseCase.json')
            const data = await response.json() as responseData;
            return data;
        };

        const fetchAllData = async () => {
            const allPromises = [fetchData(), fetchJobs(), fetchRegions()]; 
            const results = await Promise.allSettled(allPromises) as [
                {status: 'fulfilled' | 'rejected', value: responseData},
                {status: 'fulfilled' | 'rejected', value: typesOfJobResponse},
                {status: 'fulfilled' | 'rejected', value: raitingRegionsResponse}
            ];
            const status = results.every((result) => {
                return result.status === 'fulfilled';
            });
            //Все запросы выполнились
            if(status) {
                setData(results[0].value);
                setJobs(results[1].value);
                setRegions(results[2].value);
                setIsFetching(false);
            } //Какой-то из запросов не выполнился
            else {
                setError("Запрос не выполнен");
            }
        };
        setIsFetching(true);
        fetchAllData();
    }, [])

    return (
        <>
            {isFetching || !data || !jobs || !regions
                ? <Loader />
                : <div className={styles.widgetParamsUseCase}>
                    <div className={styles.widgetParamsUseCase__property}>
                        <div className={styles["widgetParamsUseCase__property-title"]}>Период оценки</div>
                        <div className={styles["widgetParamsUseCase__property-value"]}>{timeFormaterForSpeed(data.period1)}</div>
                    </div>
                    <div className={styles.widgetParamsUseCase__separator}></div> 
                    <div className={styles.widgetParamsUseCase__property}>
                        <div className={styles["widgetParamsUseCase__property-title"]}>Период сравнения</div>
                        <div className={styles["widgetParamsUseCase__property-value"]}>{timeFormaterForSpeed(data.period2)}</div>
                    </div>
                    <div className={styles.widgetParamsUseCase__separator}></div>
                    <div className={styles.widgetParamsUseCase__property}>
                        <div className={styles["widgetParamsUseCase__property-title"]}>Вид работ</div>
                        <div className={styles["widgetParamsUseCase__property-value"]}>
                            {jobs.typesofjobs.find((job) => {
                                return job.id === data.jobTypes;
                            })?.label}
                        </div>
                    </div>
                    <div className={styles.widgetParamsUseCase__separator}></div>
                    <div className={styles.widgetParamsUseCase__property}>
                        <div className={styles["widgetParamsUseCase__property-title"]}>Регион</div>
                        <div className={styles["widgetParamsUseCase__property-value"]}>
                            {regions.ratingregions.find((region) => {
                                return region.id === data.region;
                            })?.label}
                        </div>
                    </div>
                </div>
            }
        </>
    );
}