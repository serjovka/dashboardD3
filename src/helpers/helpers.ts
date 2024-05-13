import { rating } from "../components/widgetRatingPieChartUseCase/types";
import { Time } from "../types";

export function formatPoints(count: number) {
    if (count === 1) {
        return count + " балл";
    } else if (count >= 2 && count <= 4) {
        return count + " балла";
    } else {
        return count + " баллов";
    }
}

export function calculatePointCoordinates(
    centerX: number, 
    centerY: number, 
    radius: number, 
    angleInRadians: number
): number[] {
    const x = centerX + radius * Math.cos(angleInRadians - Math.PI / 2);
    const y = centerY + radius * Math.sin(angleInRadians - Math.PI / 2);
    return [x, y];
}

export function timeFormaterForSpeed (time: Time) {
    let dateFrom = new Date(time.timestampFrom * 1000)
    let dateTo = new Date(time.timestampTo * 1000)

    return `
        ${quarterFind(dateFrom.getMonth() + 1)} 
        квартал ${dateFrom.getFullYear()} года
        `
}

function quarterFind (num: number) {
    return num < 4 ? 'I' : (num > 3 && num < 7) ? 'II' : (num > 6 && num < 10) ? 'III' : 'IV'
}

const colors: Record<rating, string> = {
    'bad': 'color-bg-alert',
    'satisfactory': 'color-bg-warning',
    'good': 'color-bg-caution',
    'excellent': 'color-bg-success'
}

export function getColor(rating: number){
    if(rating >= 90) return colors.excellent;
    if(rating >= 70) return colors.good;
    if(rating >= 50) return colors.satisfactory;
    return colors.bad;
}