import dotenv from "dotenv";

dotenv.config();

export async function searchSeries(query, type, items) {
    const url = `https://api.myanimelist.net/v2/${type}?q=${encodeURIComponent(query)}&limit=${items}`

    try {
        const response = await fetch(url, {
            headers: {
                'X-MAL-CLIENT-ID': process.env.CLIENT_ID
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = response.json();
        return data;

    } catch (error) {
        console.error('Error searching series:', error.message);
    }
}