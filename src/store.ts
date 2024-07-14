import { configureStore } from '@reduxjs/toolkit';
import {getCurrentSong, getUser, getUserPlaycount, scrobbleSong, setScrobbling, syncState} from './api/service.ts';
import { Song } from "./models/song.model.ts";
import { UserModel } from "./models/user.model.ts";
import { SyncStateResponse } from "./models/responses/sync-response.model.ts";

interface State {
    activeTab: string;
    scrobbling: boolean | null;
    currentSong: Song | null;
    userProfile: UserModel | null;
    scrobbleSongResult: boolean | null;
}

const initialState: State = {
    activeTab: 'scrobbler',
    scrobbling: null,
    currentSong: null,
    userProfile: null,
    scrobbleSongResult: null,
};

const SET_ACTIVE_TAB: string = 'SET_ACTIVE_TAB';
const SET_SCROBBLING: string = 'SET_SCROBBLING';
const SET_CURRENT_SONG: string = 'SET_CURRENT_SONG';
const SET_USER: string = 'SET_USER';
const SET_USER_PLAYCOUNT: string = 'SET_USER_PLAYCOUNT';
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
    setCurrentSong: (song: Song) => ({
        type: SET_CURRENT_SONG,
        payload: song,
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
    const currentSong: Song = await getCurrentSong();
    dispatch(actions.setCurrentSong(currentSong));
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
                currentSong: action.payload
            };

        case SET_USER:
            return {
                ...state,
                userProfile: {
                    ...state.userProfile,
                    name: action.payload.name,
                    lastFmUrl: action.payload.url,
                    imageUrl: action.payload.image_url,
                }
            };

        case SET_USER_PLAYCOUNT:
            return {
                ...state,
                userProfile: {
                    ...state.userProfile,
                    playcount: action.payload
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
                userProfile: {
                    ...state.userProfile,
                    name: syncDetails.user.name,
                    lastFmUrl: syncDetails.user.url,
                    imageUrl: syncDetails.user.image_url,
                },
                scrobbling: syncDetails.is_scrobbling,
                currentSong: syncDetails.current_song,
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
    scrobbleSongAction,
    syncWithBackendAction,
    store
};
