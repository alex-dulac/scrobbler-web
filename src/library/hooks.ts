import { useSelector, useDispatch } from 'react-redux';
import {
	RootState,
	AppDispatch,
	setSyncDetails,
	setLoading,
	setCurrentSong,
	setScrobbling,
	setCurrentSongScrobbles,
	setUserRecentTracks
} from '../store.ts';
import * as api from "../api/apiSlice.ts";
import { Song } from "../models/song.model.ts";
import { useEffect } from 'react';

export const useGlobalLoading = () => {
	const dispatch = useDispatch<AppDispatch>();
	const isFetchingSync = useSelector(api.endpoints.syncWithBackend.select(undefined)).isLoading;
	const isFetchingCurrentSong = useSelector(api.endpoints.getCurrentSong.select(undefined)).isLoading;
	const isFetchingCurrentSongScrobbles = useSelector(api.endpoints.getCurrentSongScrobbles.select(undefined)).isLoading;
	const isFetchingRecentTracks = useSelector(api.endpoints.getRecentTracks.select(undefined)).isLoading;

	useEffect(() => {
		const isLoading = isFetchingSync || isFetchingCurrentSong || isFetchingCurrentSongScrobbles || isFetchingRecentTracks;
		dispatch(setLoading(isLoading));

		return () => {
			dispatch(setLoading(false));
		};
	}, [dispatch, isFetchingSync, isFetchingCurrentSong, isFetchingCurrentSongScrobbles, isFetchingRecentTracks]);
};

export const useSyncWithBackend = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { data, error, isFetching } = api.useSyncWithBackendQuery();

	useEffect(() => {
		if (data) dispatch(setSyncDetails(data));
	}, [dispatch, data]);

	return { data, error, isLoading: isFetching };
};

export const useCurrentSong = () => {
	const dispatch = useDispatch<AppDispatch>();
	const polling = useSelector((state: RootState) => state.app.polling);

	const { data, error, isFetching } = api.useGetCurrentSongQuery(undefined, {
		pollingInterval: polling ? 5000 : 0,
		skip: !polling
	});

	useEffect(() => {
		if (data) dispatch(setCurrentSong(data.currentSong));
	}, [dispatch, data]);

	return { data, error, isLoading: isFetching };
};

export const useCurrentSongScrobbles = () => {
	const dispatch = useDispatch<AppDispatch>();
	const currentSong: Song | null = useSelector((state: RootState) => state.app.currentSong);
	const { data, error, isFetching, refetch } = api.useGetCurrentSongScrobblesQuery(undefined, {
		skip: !currentSong,
	});

	useEffect(() => {
		if (currentSong) {
			refetch();
		}
	}, [currentSong, refetch]);

	useEffect(() => {
		if (data) dispatch(setCurrentSongScrobbles(data));
	}, [dispatch, data]);

	return { data, error, isLoading: isFetching };
}

export const useRecentTracks = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { data, error, isLoading } = api.useGetRecentTracksQuery();

	useEffect(() => {
		if (data) dispatch(setUserRecentTracks(data));
	}, [dispatch, data]);

	return { data, error, isLoading };
};

export const useScrobble = () => {
	const [scrobble, { data, isLoading, isError, error }] = api.useScrobbleMutation();

	useEffect(() => {
		if (data) {
			console.log('Scrobble successful:', data);
		}
	}, [data]);

	return { scrobble, data, isLoading, isError, error };
};

export const useScrobbleToggle = () => {
	const dispatch = useDispatch<AppDispatch>();
	const [scrobbleToggle, { data, isLoading, isError, error }] = api.useScrobbleToggleMutation();

	useEffect(() => {
		if (data) dispatch(setScrobbling(data));
	}, [dispatch, data]);

	return { scrobbleToggle, isLoading, isError, error };
};

export const useScrobbleInterval = (scrobble: () => void) => {
	const polling = useSelector((state: RootState) => state.app.polling);
	const scrobbling: boolean | undefined = useSelector((state: RootState) => state.app.scrobbling);
	const currentSong: Song | null = useSelector((state: RootState) => state.app.currentSong);

	useEffect(() => {
		const scrobbleInterval = setInterval(() => {
			if (polling && scrobbling && currentSong?.scrobbled === false) {
				scrobble();
			}
		}, 30000); // 30 seconds

		return () => clearInterval(scrobbleInterval);
	}, [scrobbling, polling, currentSong, scrobble]);
};


