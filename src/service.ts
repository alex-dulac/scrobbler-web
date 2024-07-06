import {Song} from "./models/song.model.ts";
import {SyncResponse} from "./models/sync-response.model.ts";
import apiClient from "./axiosConfig.ts";
import handleError from "./errorHandler.ts";
import {UserStats} from "./models/user-stats.model.ts";

const getCurrentSong = async (): Promise<Song> => {
    try {
        const response = await apiClient.get('poll-song');
        return response.data.current_song;
    } catch (error) {
        return handleError(error, 'Error fetching current song');
    }
};

const getUserStats = async (): Promise<UserStats> => {
    try {
        const response = await apiClient.get('user');
        return response.data.user;
    } catch (error) {
        return handleError(error, 'Error fetching user stats');
    }
};

const setScrobbling = async (): Promise<boolean> => {
    try {
        const response = await apiClient.post('scrobble-toggle');
        return response.data.is_scrobbling;
    } catch (error) {
        return handleError(error, 'Error setting scrobble status');
    }
};

const scrobbleSong = async (): Promise<boolean> => {
    try {
        const response = await apiClient.post('scrobble-song');
        return response.data.result;
    } catch (error) {
        return handleError(error, 'Error scrobbling song');
    }
};

const syncWithBackend = async (): Promise<SyncResponse> => {
    try {
        const response = await apiClient.get('sync');
        return response.data;
    } catch (error) {
        return handleError(error, 'Error syncing with backend');
    }
};

export { getCurrentSong, getUserStats, setScrobbling, scrobbleSong, syncWithBackend };