import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import * as routes from './routes';
import { mapKeysToCamelCase } from "../library/utils.ts";
import { currentSong, syncDetails } from "../library/interfaces.ts";

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_API_BASE_URL,
		headers: {
			'Authorization': `Bearer ${import.meta.env.VITE_API_BEARER_TOKEN}`
		}
	}),
	endpoints: (builder) => ({
		getCurrentSong: builder.query<currentSong, void>({
			query: () => routes.POLL,
			transformResponse: (response: any) => mapKeysToCamelCase(response.data),
		}),
		getCurrentSongScrobbles: builder.query<any, void>({
			query: () => routes.USER_CURRENT_TRACK_SCROBBLES,
			transformResponse: (response: any) => mapKeysToCamelCase(response.scrobbles),
		}),
		getScrobbleStatus: builder.query<boolean, void>({
			query: () => routes.SCROBBLE_STATUS,
			transformResponse: (response: any) => mapKeysToCamelCase(response.is_scrobbling),
		}),
		getRecentTracks: builder.query<any, void>({
			query: () => routes.USER_RECENT_TRACKS,
			transformResponse: (response: any) => mapKeysToCamelCase(response.recent_tracks),
		}),
		getUserPlaycount: builder.query<any, void>({
			query: () => routes.USER_PLAYCOUNT,
			transformResponse: (response: any) => mapKeysToCamelCase(response.data.playcount),
		}),
		scrobble: builder.mutation<boolean, void>({
			query: () => ({
				url: routes.SCROBBLE,
				method: 'POST',
			}),
		}),
		scrobbleToggle: builder.mutation<boolean, void>({
			query: () => ({
				url: routes.SCROBBLE_TOGGLE,
				method: 'POST'
			}),
		}),
		syncWithBackend: builder.query<syncDetails, void>({
			query: () => routes.STATE,
			transformResponse: (response: any): syncDetails => mapKeysToCamelCase(response),
		}),
	}),
});

export const {
	useGetCurrentSongQuery,
	useGetCurrentSongScrobblesQuery,
	useGetRecentTracksQuery,
	useGetUserPlaycountQuery,
	useScrobbleMutation,
	useGetScrobbleStatusQuery,
	useScrobbleToggleMutation,
	useSyncWithBackendQuery,
	endpoints,
	util
} = apiSlice;