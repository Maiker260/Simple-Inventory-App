import dotenv from "dotenv";

dotenv.config();

export async function fetchAPIData(url) {
    try {
        const response = await fetch(url, {
            headers: {
                'X-MAL-CLIENT-ID': process.env.CLIENT_ID
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (err) {
        console.error('Error getting series details:', err.message);
    }
};