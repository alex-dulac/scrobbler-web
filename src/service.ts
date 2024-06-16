import axios from 'axios';
import {Song} from "./models/song.model.ts";
import {UserProfileModel} from "./models/user-profile.model.ts";

const API_BASE_URL = 'http://0.0.0.0:8000/';

const getCurrentSong = async (): Promise<Song> => {
    try {
        const response = await axios.get<any>(API_BASE_URL + 'current-song');
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

export { getCurrentSong, getUserProfile };