import { useCallback, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, getUserRecentTracksAction, RootState } from "../../store.ts";
import { Song } from "../../models/song.model.ts";
import { User } from "../../models/user.model.ts";

export default function RecentTracksDataTable() {
	const dispatch = useDispatch<AppDispatch>();

	const currentSong: Song | null = useSelector((state: RootState) => state.currentSong);
	const user: User | null = useSelector((state: RootState) => state.user);

	const getRecentTracks = useCallback(() => dispatch(getUserRecentTracksAction()), [dispatch]);

	useEffect(() => {
		if (!user?.recentTracks || currentSong?.scrobbled) {
			getRecentTracks();
		}
  }, [getRecentTracks, user?.recentTracks, currentSong?.scrobbled]);

	return (
		<DataGrid
			autoHeight
			rows={rows}
			columns={columns}
			getRowClassName={(params) =>
				params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
			}
			initialState={{
				pagination: { paginationModel: { pageSize: 20 } },
			}}
			pageSizeOptions={[10, 20, 50]}
			density="compact"
			slotProps={{
				filterPanel: {
					filterFormProps: {
						logicOperatorInputProps: {
							variant: 'outlined',
							size: 'small',
						},
						columnInputProps: {
							variant: 'outlined',
							size: 'small',
							sx: { mt: 'auto' },
						},
						operatorInputProps: {
							variant: 'outlined',
							size: 'small',
							sx: { mt: 'auto' },
						},
						valueInputProps: {
							InputComponentProps: {
								variant: 'outlined',
								size: 'small',
							},
						},
					},
				},
			}}
		/>
	);
}
