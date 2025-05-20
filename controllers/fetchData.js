import { getSeriesDetails } from "../services/malAPI.js";

export default async function fetchData(type, id) {
    try {
        const response = await getSeriesDetails(type, id);

        return response;

    } catch (err) {
        console.error('Error Getting Details:', err);
    }
}