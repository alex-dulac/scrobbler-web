import axios from 'axios';
import {Song} from "./models/song.model.ts";
import {UserProfileModel} from "./models/user-profile.model.ts";

const API_BASE_URL = 'http://0.0.0.0:8000/';

const getCurrentSong = async (): Promise<Song> => {
    try {
        const response = await axios.get<any>(API_BASE_URL + 'poll-song');
        return response.data.current_song;
    } catch (error) {
        console.error('Error fetching current song:', error);
        throw error;
    }
};

const getUserProfile = async (): Promise<UserProfileModel> => {
    try {
        const response = await axios.get<any>(API_BASE_URL + 'user');
        return response.data.user;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};

const setScrobbling = async (): Promise<boolean> => {
    try {
        const response = await axios.get<any>(API_BASE_URL + 'scrobble-toggle');
        return response.data.is_scrobbling;
    } catch (error) {
        console.error('Error setting scrobble status:', error);
        throw error;
    }
};

const scrobbleSong = async (): Promise<boolean> => {
    try {
        const response = await axios.post<any>(API_BASE_URL + 'scrobble-song');
        return response.data.result;
    } catch (error) {
        console.error('Error scrobbling:', error);
        throw error;
    }
};

const syncWithBackend = async (): Promise<boolean> => {
    try {
        const response = await axios.get<any>(API_BASE_URL + 'sync');
        return response.data.result;
    } catch (error) {
        console.error('Error getting details from backend:', error);
        throw error;
    }
};

export { getCurrentSong, getUserProfile, setScrobbling, scrobbleSong, syncWithBackend };