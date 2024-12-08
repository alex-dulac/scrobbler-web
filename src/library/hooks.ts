import { useSelector, useDispatch } from 'react-redux';
import {
	RootState,
	AppDispatch,
	setSyncDetails,
	setLoading,
	setCurrentSong,
	setScrobbling, setCurrentSongScrobbles
} from '../store.ts';
import * as api from "../api/apiSlice.ts";
import { Song } from "../models/song.model.ts";
import { useEffect, useCallback, useRef } from 'react';

const useLoadingEffect = (isLoading: boolean, error: unknown, data: unknown, successAction: () => void) => {
	const dispatch = useDispatch<AppDispatch>();
	const activeRequestsRef = useRef(0);

	const startLoading = useCallback(() => {
		activeRequestsRef.current++;
		dispatch(setLoading(true));
	}, [dispatch]);

	const endLoading = useCallback(() => {
		activeRequestsRef.current--;
		if (activeRequestsRef.current === 0) {
			dispatch(setLoading(false));
		}
	}, [dispatch]);

	useEffect(() => {
		if (isLoading) {
			startLoading();
		} else {
			if (error) {
				console.error('Operation failed:', error);
			} else if (data) {
				successAction();
			}
			endLoading();
		}
	}, [data, error, isLoading, startLoading, endLoading, successAction]);
};

export const useSyncWithBackend = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { data, error, isLoading } = api.useSyncWithBackendQuery();

	useLoadingEffect(isLoading, error, data, useCallback(() => {
		if (data) dispatch(setSyncDetails(data));
	}, [dispatch, data]));

	return { data, error, isLoading };
};

export const useCurrentSong = () => {
	const dispatch = useDispatch<AppDispatch>();
	const polling = useSelector((state: RootState) => state.app.polling);
	const { data, error, isLoading } = api.useGetCurrentSongQuery(undefined, {
		pollingInterval: polling ? 5000 : 0,
		skip: !polling
	});

	useLoadingEffect(isLoading, error, data, useCallback(() => {
		if (data) dispatch(setCurrentSong(data));
	}, [dispatch, data]));

	return { data, error, isLoading };
};

export const useCurrentSongScrobbles = () => {
	const dispatch = useDispatch<AppDispatch>();
  const { data, error, isLoading } = api.useGetCurrentSongScrobblesQuery();

  useLoadingEffect(isLoading, error, data, useCallback(() => {
    if (data) dispatch(setCurrentSongScrobbles(data));
  }, [dispatch, data]));

  return { data, error, isLoading };
}

export const useRecentTracks = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { data, error, isLoading } = api.useGetRecentTracksQuery();

	useLoadingEffect(isLoading, error, data, useCallback(() => {
		if (data) dispatch(setSyncDetails(data));
	}, [dispatch, data]));

	return { data, error, isLoading };
};

export const useScrobble = () => {
	const [scrobble, { data, isLoading, isError, error }] = api.useScrobbleMutation();

	useLoadingEffect(isLoading, error, data, () => {
		console.log('Scrobble successful:', data);
	});

	return { scrobble, data, isLoading, isError, error };
};

export const useScrobbleToggle = () => {
	const [scrobbleToggle, { data, isLoading, isError, error }] = api.useScrobbleToggleMutation();

	const dispatch = useDispatch<AppDispatch>();

	useLoadingEffect(isLoading, isError, data, useCallback(() => {
		if (data) dispatch(setScrobbling(data));
	}, [dispatch, data]));

	return { scrobbleToggle, isLoading, isError, error };
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


