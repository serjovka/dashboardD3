import { Time } from "../../types";

export type responseData = {
    period1: Time,
    period2: Time,
    region: string,
    jobTypes: string,
};

export type raitingRegionsResponse = {
    ratingregions: {
        id: string,
        label: string,
    }[];
};

export type typesOfJobResponse = {
    typesofjobs: {
        id: string,
        label: string,
    }[];
};