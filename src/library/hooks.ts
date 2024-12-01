import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch, setSyncDetails, setLoading, setCurrentSong } from '../store.ts';
import { useGetCurrentSongQuery, useScrobbleMutation, useSyncWithBackendQuery } from "../api/apiSlice.ts";
import { Song } from "../models/song.model.ts";
import { useEffect, useCallback } from 'react';

const useLoadingEffect = (isLoading: boolean, error: unknown, data: unknown, successAction: () => void) => {
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		if (isLoading) {
			dispatch(setLoading(true));
		} else if (error) {
			console.error('Operation failed:', error);
			dispatch(setLoading(false));
		} else if (data) {
			successAction();
			dispatch(setLoading(false));
		}
	}, [data, error, isLoading, dispatch, successAction]);
};

export const useSyncWithBackend = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { data: syncData, error: syncError, isLoading: isSyncing } = useSyncWithBackendQuery();

	useLoadingEffect(isSyncing, syncError, syncData, useCallback(() => {
		if (syncData) dispatch(setSyncDetails(syncData));
	}, [dispatch, syncData]));

	return { syncData, syncError, isSyncing };
};

export const useCurrentSong = () => {
	const dispatch = useDispatch<AppDispatch>();
	const polling = useSelector((state: RootState) => state.app.polling);
	const { data: currentSongData, error: currentSongError, isLoading: isGettingCurrentSong } = useGetCurrentSongQuery(undefined, {
		pollingInterval: polling ? 5000 : 0,
		skip: !polling
	});

	useLoadingEffect(isGettingCurrentSong, currentSongError, currentSongData, useCallback(() => {
		if (currentSongData) dispatch(setCurrentSong(currentSongData));
	}, [dispatch, currentSongData]));

	return { currentSongData, currentSongError, isGettingCurrentSong };
};

export const useScrobble = () => {
	const [scrobble, { data: scrobbleData, isLoading: isScrobbling, isError: isScrobbleError, error: scrobbleError }] = useScrobbleMutation();

	useLoadingEffect(isScrobbling, scrobbleError, scrobbleData, () => {
		console.log('Scrobble successful:', scrobbleData);
	});

	return { scrobble, isScrobbling, isScrobbleError, scrobbleError };
};

export const useScrobbleInterval = (scrobble: () => void) => {
	const polling = useSelector((state: RootState) => state.app.polling);
	const scrobbling = useSelector((state: RootState) => state.app.scrobbling);
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


