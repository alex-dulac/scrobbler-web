import { configureStore } from '@reduxjs/toolkit';
import {
    getCurrentSong,
    getRecentTracks,
    getUserPlaycount,
    scrobbleSong,
    setScrobbling,
    syncState
} from './api/service.ts';
import { Song } from "./models/song.model.ts";
import { User } from "./models/user.model.ts";
import { LastFmAlbum } from "./models/lastfm-album.model.ts";
import { contentTypes, dashboardTypes } from "./constants.ts";
import { mapKeysToCamelCase } from "./helpers/utils.ts";

interface State {
    activeLastFmTab: string;
    contentFocus: string;
    scrobbling: boolean | null;
    currentSong: Song | null;
    lastfmAlbum: LastFmAlbum | null;
    user: User | null;
    scrobbleSongResult: boolean | null;
}

const initialState: State = {
    activeLastFmTab: dashboardTypes.RECENT_TRACKS,
    contentFocus: contentTypes.LAST_FM,
    scrobbling: null,
    currentSong: null,
    lastfmAlbum: null,
    user: null,
    scrobbleSongResult: null,
};

const SET_ACTIVE_LAST_FM_TAB: string = 'SET_ACTIVE_LAST_FM_TAB';
const SET_CONTENT_FOCUS: string = 'SET_CONTENT_FOCUS';
const SET_SCROBBLING: string = 'SET_SCROBBLING';
const SET_CURRENT_SONG: string = 'SET_CURRENT_SONG';
const SET_USER_PLAYCOUNT: string = 'SET_USER_PLAYCOUNT';
const SET_USER_RECENT_TRACKS: string = 'SET_USER_RECENT_TRACKS';
const SET_SCROBBLE_SONG_RESULT: string = 'SET_SCROBBLE_SONG_RESULT';
const SET_SYNC_DETAILS: string = 'SET_SYNC_DETAILS';

const actions = {
    setActiveLastFmTab: (tab: string) => ({
        type: SET_ACTIVE_LAST_FM_TAB,
        payload: tab,
    }),
    setContentFocus: (content: string) => ({
        type: SET_CONTENT_FOCUS,
        payload: content,
    }),
    setScrobbling: (scrobbling: boolean) => ({
        type: SET_SCROBBLING,
        payload: scrobbling,
    }),
    setUserPlaycount: (playcount: string) => ({
        type: SET_USER_PLAYCOUNT,
        payload: playcount,
    }),
    setUserRecentTracks: (recentTracks: []) => ({
        type: SET_USER_RECENT_TRACKS,
        payload: recentTracks,
    }),
    setCurrentSong: (response: any) => ({
        type: SET_CURRENT_SONG,
        payload: response,
    }),
    setScrobbleSongResult: (scrobbleSongResult: boolean) => ({
        type: SET_SCROBBLE_SONG_RESULT,
        payload: scrobbleSongResult,
    }),
    setSyncDetails: (syncDetails: any) => ({
        type: SET_SYNC_DETAILS,
        payload: syncDetails,
    }),
};

const getCurrentSongAction = () => async (dispatch: AppDispatch) => {
    const currentSongResponse = await getCurrentSong();
    const currentSong = mapKeysToCamelCase(currentSongResponse);
    dispatch(actions.setCurrentSong(currentSong));
};

const setScrobblingAction = () => async (dispatch: AppDispatch) => {
    const scrobbling: boolean = await setScrobbling();
    dispatch(actions.setScrobbling(scrobbling));
};

const getUserPlaycountAction = () => async (dispatch: AppDispatch) => {
    const userPlaycount: string = await getUserPlaycount();
    dispatch(actions.setUserPlaycount(userPlaycount));
};

const getUserRecentTracksAction = () => async (dispatch: AppDispatch) => {
    const recentTracks: [] = await getRecentTracks();
    dispatch(actions.setUserRecentTracks(recentTracks));
};

const scrobbleSongAction = () => async (dispatch: AppDispatch) => {
    const result: boolean = await scrobbleSong();
    dispatch(actions.setScrobbleSongResult(result));
};

const syncWithBackendAction = () => async (dispatch: AppDispatch) => {
    const result = await syncState();
    const state = mapKeysToCamelCase(result);
    dispatch(actions.setSyncDetails(state));
};

const reducer = (state: State = initialState, action: any) => {
    switch (action.type) {
        case SET_ACTIVE_LAST_FM_TAB:
            return {
                ...state,
                activeLastFmTab: action.payload
            };

        case SET_CONTENT_FOCUS:
            return {
                ...state,
                contentFocus: action.payload
            };

        case SET_SCROBBLING:
            return {
                ...state,
                scrobbling: action.payload
            };

        case SET_CURRENT_SONG:
            return {
                ...state,
                ...action.payload
            };

        case SET_USER_PLAYCOUNT:
            return {
                ...state,
                user: {
                    ...state.user,
                    playcount: action.payload
                }
            };

        case SET_USER_RECENT_TRACKS:
            const transformedPayload = action.payload.map(([track, album]: [any, any]) => [
                { ...track, scrobbledAt: track.scrobbled_at },
                { ...album, imageUrl: album.image_url }
            ]);

            return {
               ...state,
                user: {
                   ...state.user,
                    recentTracks: transformedPayload
                }
            };

        case SET_SCROBBLE_SONG_RESULT:
            return {
                ...state,
                scrobbleSongResult: action.payload
            };

        case SET_SYNC_DETAILS:
            return {
                ...state,
                ...action.payload,
                scrobbling: action.payload.isScrobbling,
            };

        default:
            return state;
    }
};

const store = configureStore({
    reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export {
    actions,
    getCurrentSongAction,
    setScrobblingAction,
    getUserPlaycountAction,
    getUserRecentTracksAction,
    scrobbleSongAction,
    syncWithBackendAction,
    store
};
