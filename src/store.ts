import { configureStore } from '@reduxjs/toolkit';
import {
    getCurrentSong,
    getRecentTracks,
    getUser,
    getUserPlaycount,
    scrobbleSong,
    setScrobbling,
    syncState
} from './api/service.ts';
import { Song } from "./models/song.model.ts";
import { User } from "./models/user.model.ts";
import { SyncStateResponse } from "./models/responses/sync-response.model.ts";
import {LastFmAlbum} from "./models/lastfm-album.model.ts";

interface State {
    activeTab: string;
    scrobbling: boolean | null;
    currentSong: Song | null;
    lastfmAlbum: LastFmAlbum | null;
    user: User | null;
    scrobbleSongResult: boolean | null;
}

const initialState: State = {
    activeTab: 'recent',
    scrobbling: null,
    currentSong: null,
    lastfmAlbum: null,
    user: null,
    scrobbleSongResult: null,
};

const SET_ACTIVE_TAB: string = 'SET_ACTIVE_TAB';
const SET_SCROBBLING: string = 'SET_SCROBBLING';
const SET_CURRENT_SONG: string = 'SET_CURRENT_SONG';
const SET_USER: string = 'SET_USER';
const SET_USER_PLAYCOUNT: string = 'SET_USER_PLAYCOUNT';
const SET_USER_RECENT_TRACKS: string = 'SET_USER_RECENT_TRACKS';
const SET_SCROBBLE_SONG_RESULT: string = 'SET_SCROBBLE_SONG_RESULT';
const SET_SYNC_DETAILS: string = 'SET_SYNC_DETAILS';

const actions = {
    setActiveTab: (tab: string) => ({
        type: SET_ACTIVE_TAB,
        payload: tab,
    }),
    setScrobbling: (scrobbling: boolean) => ({
        type: SET_SCROBBLING,
        payload: scrobbling,
    }),
    setUser: (user: any) => ({
        type: SET_SCROBBLING,
        payload: user,
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
    setSyncDetails: (syncDetails: SyncStateResponse) => ({
        type: SET_SYNC_DETAILS,
        payload: syncDetails,
    }),
};

const getCurrentSongAction = () => async (dispatch: AppDispatch) => {
    const currentSongResponse = await getCurrentSong();
    dispatch(actions.setCurrentSong(currentSongResponse));
};

const setScrobblingAction = () => async (dispatch: AppDispatch) => {
    const scrobbling: boolean = await setScrobbling();
    dispatch(actions.setScrobbling(scrobbling));
};

const getUserAction = () => async (dispatch: AppDispatch) => {
    const user: any = await getUser();
    dispatch(actions.setUser(user));
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
    const result: SyncStateResponse = await syncState();
    dispatch(actions.setSyncDetails(result));
};

const reducer = (state: State = initialState, action: any) => {
    switch (action.type) {
        case SET_ACTIVE_TAB:
            return {
                ...state,
                activeTab: action.payload
            };

        case SET_SCROBBLING:
            return {
                ...state,
                scrobbling: action.payload
            };

        case SET_CURRENT_SONG:
            return {
                ...state,
                currentSong: action.payload.current_song,
                lastfmAlbum: {
                    title: action.payload.lastfm_album?.title,
                    imageUrl: action.payload.lastfm_album?.image_url,
                    releaseDate: action.payload.lastfm_album?.release_date,
                    tracks: action.payload.lastfm_album?.tracks,
                    url: action.payload.lastfm_album?.url,
                },
            };

        case SET_USER:
            return {
                ...state,
                user: {
                    ...state.user,
                    name: action.payload.name,
                    lastFmUrl: action.payload.url,
                    imageUrl: action.payload.image_url,
                }
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
            const syncDetails = action.payload as SyncStateResponse;

            return {
                ...state,
                user: {
                    ...state.user,
                    name: syncDetails.user.name,
                    lastFmUrl: syncDetails.user.url,
                    imageUrl: syncDetails.user.image_url,
                },
                scrobbling: syncDetails.is_scrobbling,
                currentSong: syncDetails.current_song,
                lastfmAlbum: {
                    title: syncDetails.lastfm_album?.title,
                    imageUrl: syncDetails.lastfm_album?.image_url,
                    releaseDate: syncDetails.lastfm_album?.release_date,
                    tracks: syncDetails.lastfm_album?.tracks,
                    url: syncDetails.lastfm_album?.url,
                },
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
    getUserAction,
    getUserPlaycountAction,
    getUserRecentTracksAction,
    scrobbleSongAction,
    syncWithBackendAction,
    store
};
