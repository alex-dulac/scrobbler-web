import {Song} from "./models/song.model.ts";
import {UserProfileModel} from "./models/user-profile.model.ts";
import {SyncResponseModel} from "./models/sync-response.model.ts";
import apiClient from "./axiosConfig.ts";
import handleError from "./errorHandler.ts";

const getCurrentSong = async (): Promise<Song> => {
    try {
        const response = await apiClient.get('poll-song');
        return response.data.current_song;
    } catch (error) {
        return handleError(error, 'Error fetching current song');
    }
};

const getUserProfile = async (): Promise<UserProfileModel> => {
    try {
        const response = await apiClient.get('user');
        return response.data.user;
    } catch (error) {
        return handleError(error, 'Error fetching user');
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

const syncWithBackend = async (): Promise<SyncResponseModel> => {
    try {
        const response = await apiClient.get('sync');
        return response.data;
    } catch (error) {
        return handleError(error, 'Error synciung with backend');
    }
};

export { getCurrentSong, getUserProfile, setScrobbling, scrobbleSong, syncWithBackend };