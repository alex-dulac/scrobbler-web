import { DataGrid } from '@mui/x-data-grid';
import { useRecentTracks } from "../../library/hooks.ts";
import {useMemo} from "react";
import {LastFmTrack} from "../../models/lastfm-track.model.ts";
import {LastFmAlbum} from "../../models/lastfm-album.model.ts";

export default function RecentTracksDataTable() {
	const { data, error, isLoading } = useRecentTracks();

	const rows = useMemo(() => {
		return data?.map(([track, album]: [LastFmTrack, LastFmAlbum], i: number) => ({
			id: i,
			title: track.name,
			artist: track.artist,
			album: album.title,
			scrobbledAt: track.scrobbledAt
		})) || [];
	}, [data]);

	const columns = [
		{ field: 'title', headerName: 'Title', flex: 1 },
		{ field: 'artist', headerName: 'Artist', flex: 1 },
		{ field: 'album', headerName: 'Album', flex: 1 },
		{ field: 'scrobbledAt', headerName: 'Scrobbled At', flex: 1 },
	];

	console.log(rows);

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
