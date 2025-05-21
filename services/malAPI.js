import dotenv from "dotenv";
import { fetchAPIData } from "../controllers/fetchAPIData.js";

dotenv.config();

export async function searchSeries(search, type, items) {
    const url = `https://api.myanimelist.net/v2/${type}?q=${encodeURIComponent(search)}&limit=${items}`

    return fetchAPIData(url);
}

export async function getSeriesDetails(type, itemId) {
    const fields = 'id,title,main_picture,alternative_titles,start_date,end_date,synopsis,mean,rank,popularity,num_list_users,num_scoring_users,nsfw,created_at,updated_at,media_type,status,genres,my_list_status,num_episodes,start_season,broadcast,source,average_episode_duration,rating,pictures,background,related_anime,related_manga,recommendations,studios,statistics,num_chapters';
    const url = `https://api.myanimelist.net/v2/${type}/${itemId}?fields=${fields}`;

    return fetchAPIData(url);
};