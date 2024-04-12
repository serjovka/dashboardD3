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