import {Song} from "./models/song.model.ts";
import {SyncResponse} from "./models/responses/sync-response.model.ts";
import apiClient from "./helpers/axiosConfig.ts";
import handleError from "./helpers/errorHandler.ts";

// App
const POLL: string = 'poll-song';
const STATE: string = 'state';

// Scrobble
const SCROBBLE: string = 'scrobble';
const SCROBBLE_STATUS: string = SCROBBLE + '/status';
const SCROBBLE_TOGGLE: string = SCROBBLE + '/toggle';

// User
const USER: string = 'user';
const USER_RECENT_TRACKS: string = USER + '/recent-tracks';
const USER_LOVED_TRACKS: string = USER + '/loved-tracks';
const USER_TOP_ARTISTS: string = USER + '/top-artists';
const USER_TOP_ALBUMS: string = USER + '/top-albums';
const USER_PLAYCOUNT: string = USER + '/playcount';

const syncWithBackend = async (): Promise<SyncResponse> => {
    try {
        const response = await apiClient.get(STATE);
        return response.data;
    } catch (error) {
        return handleError(error, 'Error syncing with backend');
    }
};

const getCurrentSong = async (): Promise<Song> => {
    try {
        const response = await apiClient.get(POLL);
        return response.data.current_song;
    } catch (error) {
        return handleError(error, 'Error fetching current song');
    }
};

const getUserStats = async (): Promise<any> => {
    try {
        const response = await apiClient.get(USER);
        return response.data.user;
    } catch (error) {
        return handleError(error, 'Error fetching user');
    }
};

const getRecentTracks = async (): Promise<any> => {
    try {
        const response = await apiClient.get(USER_RECENT_TRACKS);
        return response.data.recent_tracks;
    } catch (error) {
        return handleError(error, 'Error fetching user recent tracks');
    }
};

const getLovedTracks = async (): Promise<any> => {
    try {
        const response = await apiClient.get(USER_LOVED_TRACKS);
        return response.data.loved_tracks;
    } catch (error) {
        return handleError(error, 'Error fetching user recent tracks');
    }
};

const getTopArtists = async (): Promise<any> => {
    try {
        const response = await apiClient.get(USER_TOP_ARTISTS);
        return response.data.top_artists;
    } catch (error) {
        return handleError(error, 'Error fetching user top artists');
    }
};

const getTopAlbums = async (): Promise<any> => {
    try {
        const response = await apiClient.get(USER_TOP_ALBUMS);
        return response.data.top_albums;
    } catch (error) {
        return handleError(error, 'Error fetching user top albums');
    }
};

const getUserPlaycount = async (): Promise<any> => {
    try {
        const response = await apiClient.get(USER_PLAYCOUNT);
        return response.data.playcount;
    } catch (error) {
        return handleError(error, 'Error fetching user playcount');
    }
};

const setScrobbling = async (): Promise<boolean> => {
    try {
        const response = await apiClient.post(SCROBBLE_TOGGLE);
        return response.data.is_scrobbling;
    } catch (error) {
        return handleError(error, 'Error setting scrobble status');
    }
};

const scrobbleSong = async (): Promise<boolean> => {
    try {
        const response = await apiClient.post(SCROBBLE);
        return response.data.result;
    } catch (error) {
        return handleError(error, 'Error scrobbling song');
    }
};

const scrobbleStatus = async (): Promise<boolean> => {
    try {
        const response = await apiClient.post(SCROBBLE_STATUS);
        return response.data.is_scrobbling;
    } catch (error) {
        return handleError(error, 'Error scrobbling status');
    }
};

export { getCurrentSong, getUserStats, setScrobbling, scrobbleSong, syncWithBackend };