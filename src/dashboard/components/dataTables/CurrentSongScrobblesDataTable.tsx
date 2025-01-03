import { DataGrid } from '@mui/x-data-grid';
import { useCurrentSongScrobbles } from "../../../library/hooks.ts";
import { useMemo } from "react";
import { LastFmTrack } from "../../../models/lastfm-track.model.ts";

export default function CurrentSongScrobblesDataTable() {
	const { data, isLoading } = useCurrentSongScrobbles();

	const rows = useMemo(() => {
		return data?.map((track: LastFmTrack, i: number) => ({
			id: i,
			title: track.name,
			artist: track.artist,
			album: track.album,
			scrobbledAt: track.scrobbledAt
		})) || [];
	}, [data]);

	const columns = [
		{ field: 'title', headerName: 'Title', flex: 1 },
		{ field: 'artist', headerName: 'Artist', flex: 1 },
		{ field: 'album', headerName: 'Album', flex: 1 },
		{ field: 'scrobbledAt', headerName: 'Scrobbled At', flex: 1 },
	];

	return (
		<DataGrid
			autoHeight
			loading={isLoading}
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
