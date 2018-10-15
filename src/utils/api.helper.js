import httpHelper from './http.helper';
import config from '../config';

const BASE_URL = 'https://api.spotify.com/v1';
const TOKEN_BASE_URL = 'https://accounts.spotify.com/authorize';

export const apiEndpoints = {
    PROFILE_URL: `${BASE_URL}/me`,
    TOP_TRACKS: `${BASE_URL}/me/top/tracks`,
    TOKEN_URL: `${TOKEN_BASE_URL}/?client_id=${config.SPOTIFY_CLIENT_ID}&response_type=token&redirect_uri=${config.SPOTIFY_REDIRECT}&scope=${config.SPOTIFY_SCOPES}`,
    RECOMMENDATION_URL: `${BASE_URL}/recommendations`
};

const profile = () => httpHelper.get(apiEndpoints.PROFILE_URL);

// Pass url parameter for paging
const topTracks = (url = apiEndpoints.TOP_TRACKS) => httpHelper.get(url);

const topRecommends = (tracks) => {
    let url = apiEndpoints.RECOMMENDATION_URL;
    url += `?limit=10&seed_tracks=${tracks.join(',')}`;
    return httpHelper.get(url);
};

export default {
    profile,
    topTracks,
    topRecommends
};

