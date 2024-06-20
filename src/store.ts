import { configureStore } from '@reduxjs/toolkit';
import {getCurrentSong, getUserProfile, scrobbleSong, setScrobbling, syncWithBackend} from './service.ts';
import { Song } from "./models/song.model.ts";
import { UserProfileModel } from "./models/user-profile.model.ts";

const initialState = {
    activeTab: 'user',
    scrobbling: null,
    currentSong: null,
    userProfile: null,
    scrobbleSongResult: null,
};

const actionTypes = {
    SET_ACTIVE_TAB: 'SET_ACTIVE_TAB',
    SET_SCROBBLING: 'SET_SCROBBLING',
    SET_CURRENT_SONG: 'SET_CURRENT_SONG',
    SET_USER_PROFILE: 'SET_USER_PROFILE',
    SET_SCROBBLE_SONG_RESULT: 'SET_SCROBBLE_SONG_RESULT',
    SET_SYNC_DETAILS: 'SET_SYNC_DETAILS',
};

const actions = {
    setActiveTab: (tab: string) => ({
        type: actionTypes.SET_ACTIVE_TAB,
        payload: tab,
    }),
    setScrobbling: (scrobbling: boolean) => ({
        type: actionTypes.SET_SCROBBLING,
        payload: scrobbling,
    }),
    setCurrentSong: (song: Song) => ({
        type: actionTypes.SET_CURRENT_SONG,
        payload: song,
    }),
    setUserProfile: (userProfile: UserProfileModel) => ({
        type: actionTypes.SET_USER_PROFILE,
        payload: userProfile,
    }),
    setScrobbleSongResult: (scrobbleSongResult: boolean) => ({
        type: actionTypes.SET_SCROBBLE_SONG_RESULT,
        payload: scrobbleSongResult,
    }),
    setSyncDetails: (syncDetails: boolean) => ({
        type: actionTypes.SET_SYNC_DETAILS,
        payload: syncDetails,
    }),
};

const getCurrentSongAction = () => async (dispatch: AppDispatch) => {
    try {
        const currentSong = await getCurrentSong();
        dispatch(actions.setCurrentSong(currentSong));
    } catch (error) {
        console.error('Error fetching current song:', error);
    }
};

const getUserProfileAction = () => async (dispatch: AppDispatch) => {
    try {
        const userProfile = await getUserProfile();
        dispatch(actions.setUserProfile(userProfile));
    } catch (error) {
        console.error('Error fetching user profile:', error);
    }
};

const setScrobblingAction = () => async (dispatch: AppDispatch) => {
    try {
        const scrobbling = await setScrobbling();
        dispatch(actions.setScrobbling(scrobbling));
    } catch (error) {
        console.error('Error setting scrobbling status:', error);
    }
};

const scrobbleSongAction = () => async (dispatch: AppDispatch) => {
    try {
        const result = await scrobbleSong();
        dispatch(actions.setScrobbleSongResult(result));
    } catch (error) {
        console.error('Error setting scrobbled song result:', error);
    }
};

const syncWithBackendAction = () => async (dispatch: AppDispatch) => {
    try {
        const result = await syncWithBackend();
        console.log(result);
        dispatch(actions.setSyncDetails(result));
    } catch (error) {
        console.error('Error syncing with backend:', error);
    }
};

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.SET_ACTIVE_TAB:
            return { ...state, activeTab: action.payload };
        case actionTypes.SET_SCROBBLING:
            return {...state, scrobbling: action.payload };
        case actionTypes.SET_CURRENT_SONG:
            return {...state, currentSong: action.payload };
        case actionTypes.SET_USER_PROFILE:
            return {...state, userProfile: action.payload };
        case actionTypes.SET_SCROBBLE_SONG_RESULT:
            return {...state, scrobbleSongResult: action.payload };
        case actionTypes.SET_SYNC_DETAILS:
            return {
                ...state,
                userProfile: action.payload.user,
                scrobbling: action.payload.is_scrobbling,
                currentSong: action.payload.current_song,
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
    actionTypes,
    actions,
    getCurrentSongAction,
    getUserProfileAction,
    setScrobblingAction,
    scrobbleSongAction,
    syncWithBackendAction,
    store
};