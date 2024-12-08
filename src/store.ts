import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Song } from "./models/song.model.ts";
import { User } from "./models/user.model.ts";
import { LastFmAlbum } from "./models/lastfm-album.model.ts";
import { contentTypes, dashboardTypes } from "./library/constants.ts";
import { apiSlice } from "./api/apiSlice.ts";
import { syncDetails } from "./library/interfaces.ts";

interface State {
  activeIntegration: number;
  activeLastFmTab: string;
  actionProcessing: { [key: string]: boolean };
  contentFocus: string;
  currentSong: Song | null;
  currentSongScrobbles: {timestamp: string, count: number}[] | null;
  lastfmAlbum: LastFmAlbum | null;
  loading: boolean;
  polling: boolean;
  scrobbling: boolean;
  scrobbleSongResult: boolean | null;
  user: User | null;
}

const initialState: State = {
  activeIntegration: 0,
  activeLastFmTab: dashboardTypes.RECENT_TRACKS,
  actionProcessing: {},
  contentFocus: contentTypes.LAST_FM,
  currentSong: null,
  currentSongScrobbles: null,
  lastfmAlbum: null,
  loading: false,
  polling: false,
  scrobbling: false,
  scrobbleSongResult: null,
  user: null,
};

export const SET_CONTENT_FOCUS: string = 'SET_CONTENT_FOCUS';
export const SET_POLLING: string = 'SET_POLLING';
export const SCROBBLE_SONG: string = 'SCROBBLE_SONG';
export const SET_CURRENT_SONG: string = 'SET_CURRENT_SONG';
export const SET_USER_PLAYCOUNT: string = 'SET_USER_PLAYCOUNT';
export const SET_USER_RECENT_TRACKS: string = 'SET_USER_RECENT_TRACKS';
export const SET_SCROBBLE_SONG_RESULT: string = 'SET_SCROBBLE_SONG_RESULT';
export const SET_SYNC_DETAILS: string = 'SET_SYNC_DETAILS';

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setActiveLastFmTab: (state, action: PayloadAction<string>) => {
      state.activeLastFmTab = action.payload;
    },
    setContentFocus: (state, action: PayloadAction<string>) => {
      state.contentFocus = action.payload;
    },
    setScrobbling: (state, action: PayloadAction<boolean>) => {
      state.scrobbling = action.payload;
    },
    setPolling: (state, action: PayloadAction<boolean>) => {
      state.polling = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setCurrentSong: (state, action: PayloadAction<Song>) => {
      state.currentSong = action.payload;
    },
    setCurrentSongScrobbles: (state, action: PayloadAction<{timestamp: string, count: number}[] | null>) => {
      state.currentSongScrobbles = action.payload;
    },
    setUserPlaycount: (state, action: PayloadAction<string>) => {
      state.user ? state.user.playcount = action.payload : null;
    },
    setUserRecentTracks: (state, action: PayloadAction<any>) => {
      const transformedPayload = action.payload.map(([track, album]: [any, any]) => [
        { ...track, scrobbledAt: track.scrobbled_at },
        { ...album, imageUrl: album.image_url }
      ]);

      state.user? state.user.recentTracks = transformedPayload : null;
    },
    setScrobbleSongResult: (state, action: PayloadAction<boolean | null>) => {
      state.scrobbleSongResult = action.payload;
    },
    setSyncDetails: (state, action: PayloadAction<syncDetails>) => {
      state.activeIntegration = action.payload.activeIntegration;
      state.currentSong = action.payload.currentSong;
      state.lastfmAlbum = action.payload.lastFmAlbum;
      state.scrobbling = action.payload.isScrobbling;
      state.user = {
        ...state.user,
        ...action.payload.user,
        recentTracks: state.user?.recentTracks, // Preserve the existing recentTracks
      };
    },
  },
});

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const {
  setCurrentSong,
  setCurrentSongScrobbles,
  setLoading,
  setPolling,
  setScrobbling,
  setSyncDetails
} = appSlice.actions;