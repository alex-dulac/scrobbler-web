import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import * as React from "react";
import CurrentSongScrobblesDataTable from "./dataTables/CurrentSongScrobblesDataTable.tsx";

export default function CurrentSong() {
	return (
		<>
			<Typography component="h2" variant="h6" sx={{ mb: 2 }}>
				Current Song Scrobble History
			</Typography>
			<Grid container spacing={2} columns={12}>
				<Grid size={{ xs: 12, lg: 12 }}>
					<CurrentSongScrobblesDataTable />
				</Grid>
			</Grid>
		</>
	);
}