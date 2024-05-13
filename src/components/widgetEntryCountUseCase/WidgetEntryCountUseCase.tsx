import { useEffect, useState } from "react";
import { Loader } from '@consta/uikit/Loader';
import styles from "./WidgetEntryCountUseCase.module.css";
import { timeFormaterForSpeed } from "../../helpers/helpers";

type responseData = { 	
    companiesquantity: number,	
    objectsquantity: number,	
    contractsquantity: number,	
}	

export default function WidgetEntryCountUseCase() {
    const [data, setData] = useState<responseData>();
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState<string>();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/widgetEntryCountUseCase.json')
            const data = await response.json() as responseData;
            setData(data);
            setIsFetching(false);
        };

        setIsFetching(true);
        fetchData();
    }, [])

    return (
        <>
            {isFetching || !data 
                ? <Loader />
                : <div className={styles.widgetEntryCountUseCase}>
                    <div className={styles.widgetEntryCountUseCase__item}>
                        <div className={styles['widgetEntryCountUseCase__logo-container']}>
                            <img className={styles.widgetEntryCountUseCase__logo} src="/images/solar_case-linear.svg"/>
                        </div>
                        <div className={styles.widgetEntryCountUseCase__quantity}>
                            {data.companiesquantity}
                        </div>
                        <div className={styles.widgetEntryCountUseCase__title}>
                            Компаний
                        </div>
                    </div>
                    <div className={styles.widgetEntryCountUseCase__item}>
                        <div className={styles['widgetEntryCountUseCase__logo-container']}>
                            <img className={styles.widgetEntryCountUseCase__logo} src="/images/48.svg"/>
                        </div>
                        <div className={styles.widgetEntryCountUseCase__quantity}>
                            {data.objectsquantity}
                        </div>
                        <div className={styles.widgetEntryCountUseCase__title}>
                            Объектов
                        </div>
                    </div>
                    <div className={styles.widgetEntryCountUseCase__item}>
                        <div className={styles['widgetEntryCountUseCase__logo-container']}>
                            <img className={styles.widgetEntryCountUseCase__logo} src="/images/iconamoon_file-document-light.svg"/>
                        </div>
                        <div className={styles.widgetEntryCountUseCase__quantity}>
                            {data.contractsquantity}
                        </div>
                        <div className={styles.widgetEntryCountUseCase__title}>
                            Договоров
                        </div>
                    </div>
                </div>
            }
        </>
    );
}