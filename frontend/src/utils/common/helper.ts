export function roundToDecimalPlaces(x: number, decimalPlaces: number){
    return Math.round(x * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
}