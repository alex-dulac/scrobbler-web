import { configureStore } from '@reduxjs/toolkit';
import { getCurrentSong, getUserStats, scrobbleSong, setScrobbling, syncWithBackend } from './service.ts';
import { Song } from "./models/song.model.ts";
import { UserModel } from "./models/user.model.ts";
import { SyncResponse } from "./models/sync-response.model.ts";
import { UserStats } from "./models/user-stats.model.ts";

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

const actionTypes = {
    SET_ACTIVE_TAB: 'SET_ACTIVE_TAB',
    SET_SCROBBLING: 'SET_SCROBBLING',
    SET_CURRENT_SONG: 'SET_CURRENT_SONG',
    SET_USER_STATS: 'SET_USER_STATS',
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
    setUserProfile: (userStats: UserStats) => ({
        type: actionTypes.SET_USER_STATS,
        payload: userStats,
    }),
    setScrobbleSongResult: (scrobbleSongResult: boolean) => ({
        type: actionTypes.SET_SCROBBLE_SONG_RESULT,
        payload: scrobbleSongResult,
    }),
    setSyncDetails: (syncDetails: SyncResponse) => ({
        type: actionTypes.SET_SYNC_DETAILS,
        payload: syncDetails,
    }),
};

const getCurrentSongAction = () => async (dispatch: AppDispatch) => {
    try {
        const currentSong: Song = await getCurrentSong();
        dispatch(actions.setCurrentSong(currentSong));
    } catch (error) {
        console.error('Error fetching current song:', error);
    }
};

const getUserStatsAction = () => async (dispatch: AppDispatch) => {
    try {
        const userStats: UserStats = await getUserStats();
        dispatch(actions.setUserProfile(userStats));
    } catch (error) {
        console.error('Error fetching user profile:', error);
    }
};

const setScrobblingAction = () => async (dispatch: AppDispatch) => {
    try {
        const scrobbling: boolean = await setScrobbling();
        dispatch(actions.setScrobbling(scrobbling));
    } catch (error) {
        console.error('Error setting scrobbling status:', error);
    }
};

const scrobbleSongAction = () => async (dispatch: AppDispatch) => {
    try {
        const result: boolean = await scrobbleSong();
        dispatch(actions.setScrobbleSongResult(result));
    } catch (error) {
        console.error('Error setting scrobbled song result:', error);
    }
};

const syncWithBackendAction = () => async (dispatch: AppDispatch) => {
    try {
        const result: SyncResponse = await syncWithBackend();
        dispatch(actions.setSyncDetails(result));
    } catch (error) {
        console.error('Error syncing with backend:', error);
    }
};

const reducer = (state: State = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.SET_ACTIVE_TAB:
            return {
                ...state,
                activeTab: action.payload
            };

        case actionTypes.SET_SCROBBLING:
            return {
                ...state,
                scrobbling: action.payload
            };

        case actionTypes.SET_CURRENT_SONG:
            return {
                ...state,
                currentSong: action.payload
            };

        case actionTypes.SET_USER_STATS:
            return {
                ...state,
                userProfile: {
                    ...state.userProfile,
                    stats: {
                        playCount: action.payload.playcount,
                        recentTracks: action.payload.recent_tracks
                    },
                }
            };

        case actionTypes.SET_SCROBBLE_SONG_RESULT:
            return {
                ...state,
                scrobbleSongResult: action.payload
            };

        case actionTypes.SET_SYNC_DETAILS:
            const syncDetails = action.payload as SyncResponse;

            return {
                ...state,
                userProfile: {
                    name: syncDetails.user.name,
                    lastFmUrl: syncDetails.user.url,
                    imageUrl: syncDetails.user.image_url,
                    stats: syncDetails.user.stats,
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
    actionTypes,
    actions,
    getCurrentSongAction,
    getUserStatsAction,
    setScrobblingAction,
    scrobbleSongAction,
    syncWithBackendAction,
    store
};