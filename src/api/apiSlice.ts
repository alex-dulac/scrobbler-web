		import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
		import * as routes from './routes';
		import { mapKeysToCamelCase } from "../library/utils.ts";
		import { Song } from "../models/song.model.ts";
		import { syncDetails } from "../library/interfaces.ts";

		export const apiSlice = createApi({
		reducerPath: 'api',
		baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_API_BASE_URL,
		headers: {
			'Authorization': `Bearer ${import.meta.env.VITE_API_BEARER_TOKEN}`
		}
		}),
		endpoints: (builder) => ({
		getCurrentSong: builder.query<Song, void>({
			query: () => routes.POLL,
		  transformResponse: (response: any) => mapKeysToCamelCase(response.data.data),
		}),
		getCurrentSongScrobbles: builder.query<any, void>({
			query: () => routes.USER_CURRENT_TRACK_SCROBBLES,
		  transformResponse: (response: any) => mapKeysToCamelCase(response.scrobbles),
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
		useScrobbleToggleMutation,
		useSyncWithBackendQuery
		} = apiSlice;