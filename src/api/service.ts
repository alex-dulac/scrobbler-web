import {Song} from "../models/song.model.ts";
import {SyncStateResponse} from "../models/responses/sync-response.model.ts";
import apiClient from "../helpers/axiosConfig.ts";
import handleError from "../helpers/errorHandler.ts";
import * as routes from "./routes.ts";


const syncState = async (): Promise<SyncStateResponse> => {
    try {
        const response = await apiClient.get(routes.STATE);
        return response.data;
    } catch (error) {
        return handleError(error, 'Error syncing with backend');
    }
};

const getCurrentSong = async (): Promise<Song> => {
    try {
        const response = await apiClient.get(routes.POLL);
        return response.data.current_song;
    } catch (error) {
        return handleError(error, 'Error fetching current song');
    }
};

const getUser = async (): Promise<any> => {
    try {
        const response = await apiClient.get(routes.USER);
        return response.data.user;
    } catch (error) {
        return handleError(error, 'Error fetching user');
    }
};

const getRecentTracks = async (): Promise<any> => {
    try {
        const response = await apiClient.get(routes.USER_RECENT_TRACKS);
        return response.data.recent_tracks;
    } catch (error) {
        return handleError(error, 'Error fetching user recent tracks');
    }
};

const getLovedTracks = async (): Promise<any> => {
    try {
        const response = await apiClient.get(routes.USER_LOVED_TRACKS);
        return response.data.loved_tracks;
    } catch (error) {
        return handleError(error, 'Error fetching user recent tracks');
    }
};

const getTopArtists = async (): Promise<any> => {
    try {
        const response = await apiClient.get(routes.USER_TOP_ARTISTS);
        return response.data.top_artists;
    } catch (error) {
        return handleError(error, 'Error fetching user top artists');
    }
};

const getTopAlbums = async (): Promise<any> => {
    try {
        const response = await apiClient.get(routes.USER_TOP_ALBUMS);
        return response.data.top_albums;
    } catch (error) {
        return handleError(error, 'Error fetching user top albums');
    }
};

const getUserPlaycount = async (): Promise<any> => {
    try {
        const response = await apiClient.get(routes.USER_PLAYCOUNT);
        return response.data.playcount;
    } catch (error) {
        return handleError(error, 'Error fetching user playcount');
    }
};

const setScrobbling = async (): Promise<boolean> => {
    try {
        const response = await apiClient.post(routes.SCROBBLE_TOGGLE);
        return response.data.is_scrobbling;
    } catch (error) {
        return handleError(error, 'Error setting scrobble status');
    }
};

const scrobbleSong = async (): Promise<boolean> => {
    try {
        const response = await apiClient.post(routes.SCROBBLE);
        return response.data.result;
    } catch (error) {
        return handleError(error, 'Error scrobbling song');
    }
};

const scrobbleStatus = async (): Promise<boolean> => {
    try {
        const response = await apiClient.post(routes.SCROBBLE_STATUS);
        return response.data.is_scrobbling;
    } catch (error) {
        return handleError(error, 'Error scrobbling status');
    }
};

export {
    syncState,
    getCurrentSong,
    getUser,
    getRecentTracks,
    getLovedTracks,
    getTopArtists,
    getTopAlbums,
    getUserPlaycount,
    setScrobbling,
    scrobbleSong,
    scrobbleStatus,
};