import dotenv from "dotenv";

dotenv.config();

export async function searchSeries(search, type, items) {
    const url = `https://api.myanimelist.net/v2/${type}?q=${encodeURIComponent(search)}&limit=${items}`

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
        console.error('Error searching series:', err.message);
    }
}

export async function getSeriesDetails(type, itemId) {
    const fields = 'id,title,main_picture,alternative_titles,start_date,end_date,synopsis,mean,rank,popularity,num_list_users,num_scoring_users,nsfw,created_at,updated_at,media_type,status,genres,my_list_status,num_episodes,start_season,broadcast,source,average_episode_duration,rating,pictures,background,related_anime,related_manga,recommendations,studios,statistics,num_chapters';
    const url = `https://api.myanimelist.net/v2/${type}/${itemId}?fields=${fields}`;

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