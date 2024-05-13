import { useEffect, useState } from "react";
import { Loader } from '@consta/uikit/Loader';
import Pie, { pieChartProps } from "../../D3/pie/Pie";
import RatingDetails from "./RatingDetails";
import { rating, responseData } from "./types";
import styles from './WidgetRatingPieChartUseCase.module.css'

const ratingTypes: Record<rating, rating> = {
    bad: 'bad',
    satisfactory: 'satisfactory',
    good: 'good',
    excellent: 'excellent',
}

export default function WidgetRatingPieChartUseCase() {
    const { data, isFetching } = useRatingData(); // Используем custom hook
    const [selectedType, setSelectedType] = useState<rating>(ratingTypes.bad);
    
    const selectType = (value: rating) => setSelectedType(value)

    if (isFetching) {
        return <Loader />; 
    }

    const pieChartData = data ? formatPieChartData(data) : [];
    const companies = data ? getCompaniesByRatingType(data, selectedType) : [];
    
    return (
        <div className={styles.widgetRatingPieChart}>
            <div>
                <div className="header">
                    Доля оценок
                </div>
                <Pie data={pieChartData} width={400} height={200} selectType={selectType}/>
            </div>
            {companies.length > 0 && <RatingDetails companies={companies}/>}
        </div>
    );
}

function useRatingData() {
    const [data, setData] = useState<responseData>();
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/WidgetRatingPieChartUseCase.json')
            const data = await response.json() as responseData;
            setData(data);
            setIsFetching(false);
        }

        setIsFetching(true);
        fetchData();
    }, [])

    return { data, isFetching };
}

function formatPieChartData(data: responseData) {
    return [
        {
            type: ratingTypes.excellent,
            label: `${data.excellentRatings}; ${data.excellentRatingsPercentages}%`,
            value: data.excellentRatingsPercentages
        },
        {
            type: ratingTypes.good,
            label: `${data.goodRatings}; ${data.goodRatingsPercentages}%`,
            value: data.goodRatingsPercentages
        },
        {
            type: ratingTypes.satisfactory,
            label: `${data.satisfactoryRatings}; ${data.satisfactoryPercentages}%`,
            value: data.satisfactoryPercentages
        },
        {
            type: ratingTypes.bad,
            label: `${data.badRatings}; ${data.badRatingsPercentages}%`,
            value: data.badRatingsPercentages
        },
    ];
}

function getCompaniesByRatingType(data: responseData, ratingType: rating) {
    switch (ratingType) {
        case ratingTypes.bad:
            return data.badRatingsCompanies.map(company => ({
                rating: company.badCompanyRating,
                name: company.badCompanyName,
                contract: company.badCompanyContract,
            }));
        case ratingTypes.satisfactory:
            return data.satisfactoryRatingsCompanies.map(company => ({
                rating: company.satisfactoryCompanyRating,
                name: company.satisfactoryCompanyName,
                contract: company.satisfactoryCompanyContract,
            }));
        case ratingTypes.good:
            return data.goodRatingsCompanies.map(company => ({
                rating: company.goodCompanyRating,
                name: company.goodCompanyName,
                contract: company.goodCompanyContract,
            }));
        case ratingTypes.excellent:
            return data.excellentRatingsCompanies.map(company => ({
                rating: company.excellentCompanyRating,
                name: company.excellentCompanyName,
                contract: company.excellentCompanyContract,
            }));
        default:
            return [];
    }
}