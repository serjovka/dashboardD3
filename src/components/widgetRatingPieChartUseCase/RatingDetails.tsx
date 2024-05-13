import { useState } from "react";
import { rating, RatingDetailsProps } from "./types.ts";
import styles from "./RatingDetails.module.css";
import { getColor } from "../../helpers/helpers.ts";


export default function RatingDetails({ companies }: RatingDetailsProps){
    const { page, nextPage, previousPage, jumpToPage } = usePagination(0, companies.length - 1);

    const company = <div className={styles.details}>
        <header className={styles.details__header}>
            <div className={styles.details__rating} style={{color: `var(--${getColor(companies[page].rating)})`}}>
                {companies[page].rating}
            </div>
            <div className={styles.details__name}>
                {companies[page].name}
            </div>
        </header>
        <div className={styles.details__contract}>
            {companies[page].contract}
        </div>
    </div>

    const links = Array.from({ length: companies.length }, (_, index) => (
        <a 
            key={index} 
            onClick={() => jumpToPage(index)} 
            className={index === page ? styles.link_active : styles.link}
        />
    ));

    return(
        <div className={styles.card}>
            <div className={styles['page-buttons']} >
                <button className={styles['page-button']} onClick={previousPage}>
                    <img className={styles['page-button_image']} src="/images/arrows/arrow_down-1.svg"/>
                </button>
                <button className={styles['page-button']} onClick={nextPage}>
                    <img className={styles['page-button_image']} src="/images/arrows/arrow_down.svg"/>
                </button>
            </div>
            {company}
            <div className={styles.links}>
                {links}
            </div>
        </div>
    );
}

function usePagination(startPage: number, lastPage: number){
    const [page, setPage] = useState<number>(startPage);

    const nextPage = () => {
        if(page < lastPage){
            setPage(page + 1);
        } else {
            setPage(startPage);
        }
    };

    const previousPage = () => {
        if(page > startPage){
            setPage(page - 1);
        } else {
            setPage(lastPage);
        }
    };

    const jumpToPage = (targetPage: number) => {
        if(targetPage <= lastPage && targetPage >= startPage){
            setPage(targetPage);
        }
    }

    return { page, nextPage, previousPage, jumpToPage}
}