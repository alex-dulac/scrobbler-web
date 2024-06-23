import {Song} from "./models/song.model.ts";
import {UserProfileModel} from "./models/user-profile.model.ts";
import {SyncResponseModel} from "./models/sync-response.model.ts";
import apiClient from "./axiosConfig.ts";

const getCurrentSong = async (): Promise<Song> => {
    try {
        const response = await apiClient.get('poll-song');
        return response.data.current_song;
    } catch (error) {
        console.error('Error fetching current song:', error);
        throw error;
    }
};

const getUserProfile = async (): Promise<UserProfileModel> => {
    try {
        const response = await apiClient.get('user');
        return response.data.user;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};

const setScrobbling = async (): Promise<boolean> => {
    try {
        const response = await apiClient.post('scrobble-toggle');
        return response.data.is_scrobbling;
    } catch (error) {
        console.error('Error setting scrobble status:', error);
        throw error;
    }
};

const scrobbleSong = async (): Promise<boolean> => {
    try {
        const response = await apiClient.post('scrobble-song');
        return response.data.result;
    } catch (error) {
        console.error('Error scrobbling:', error);
        throw error;
    }
};

const syncWithBackend = async (): Promise<SyncResponseModel> => {
    try {
        const response = await apiClient.get('sync');
        return response.data;
    } catch (error) {
        console.error('Error getting details from backend:', error);
        throw error;
    }
};

export { getCurrentSong, getUserProfile, setScrobbling, scrobbleSong, syncWithBackend };