import { configureStore } from '@reduxjs/toolkit';
import { getCurrentSong, getUserProfile } from './service.ts';
import { Song } from "./models/song.model.ts";
import { UserProfileModel } from "./models/user-profile.model.ts";

const initialState = {
    activeTab: 'user',
    scrobbling: false,
    currentSong: null,
    userProfile: null,
};

const actionTypes = {
    SET_ACTIVE_TAB: 'SET_ACTIVE_TAB',
    SET_SCROBBLING: 'SET_SCROBBLING',
    SET_CURRENT_SONG: 'SET_CURRENT_SONG',
    SET_USER_PROFILE: 'SET_USER_PROFILE',
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
    store
};