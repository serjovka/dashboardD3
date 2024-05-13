export type responseData = { 	
    "allRatings": number,	
    "excellentRatings": number,	
    "excellentRatingsPercentages": number,	
    "goodRatings": number,	
    "goodRatingsPercentages": number,	
    "satisfactoryRatings": number,	
    "satisfactoryPercentages": number,	
    "badRatings": number,	
    "badRatingsPercentages": number,	
    "badRatingsCompanies": {	
        "badCompanyRating": number,	
        "badCompanyName": string,	
        "badCompanyContract": string,	
    }[],
    "satisfactoryRatingsCompanies": {	
        "satisfactoryCompanyRating": number,	
        "satisfactoryCompanyName": string,	
        "satisfactoryCompanyContract": string,	
    }[],
    "goodRatingsCompanies": {	
        "goodCompanyRating": number,	
        "goodCompanyName": string,	
        "goodCompanyContract": string,	
    }[],
    "excellentRatingsCompanies": {	
        "excellentCompanyRating": number,	
        "excellentCompanyName": string,	
        "excellentCompanyContract": string,	
    }[],
};

export type rating = 'bad' | 'satisfactory' | 'good' | 'excellent';

export type RatingDetailsProps = {
    companies: {
        rating: number;
        name: string;
        contract: string;
    }[];
}