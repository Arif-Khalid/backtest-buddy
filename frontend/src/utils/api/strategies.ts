import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/returns/",
});

function getDateString(date: Date) {
  return date.toISOString().slice(0, 10);
}

export async function getStrategies(
  symbol: string,
  strategy: string,
  period: string,
  amount: number,
  start: Date,
  end: Date
) {
  try {
    symbol = symbol.toUpperCase();
    console.log(symbol);
    const startDateString = getDateString(start);
    const endDateString = getDateString(end);
    const response = await axiosInstance.get(`${symbol}/${strategy}`, {
      params: {
        period: period,
        amount: amount,
        start: startDateString,
        end: endDateString,
      },
    });
    return response.data;
  } catch (e) {
    console.error(e);
  }
}
