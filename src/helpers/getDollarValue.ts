import { DollarExchangeResponse } from "../interface/interface";

const fetchUrl =
  "https://pydolarve.org/api/v2/dollar?page=alcambio&format_date=iso&rounded_price=true";

export const getDollarValue = async (): Promise<DollarExchangeResponse> => {
  try {
    const response: Response = await fetch(fetchUrl);
    const data: DollarExchangeResponse = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching dollar value:", error);
    throw new Error("Failed to fetch dollar value");
  }
};
