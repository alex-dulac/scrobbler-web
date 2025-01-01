import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import StatCard, {StatCardProps} from "./StatCard.tsx";
import SessionsChart from "./SessionsChart.tsx";
import PageViewsBarChart from "./dataTables/PageViewsBarChart.tsx";
import RecentTracksDataTable from "./dataTables/RecentTracksDataTable.tsx";
import * as React from "react";
import {use30DayStats} from "../../library/hooks.ts";

interface DayStats {
  trackCount: number;
  artistCount: number;
	albumCount: number;
}

interface Day {
	date: string;
	stats: DayStats;
}

export default function Home() {
	const { data, isLoading } = use30DayStats();

	const calculateTrend = (data: number[]): 'up' | 'down' | 'neutral' => {
		if (data.length < 2) return 'neutral';
		const latest = data[data.length - 1];
		const previous = data[data.length - 2];
		if (latest > previous) return 'up';
		if (latest < previous) return 'down';
		return 'neutral';
	};

	const cardData: StatCardProps[] = [
		{
			title: 'Songs',
			value: data ? Object.values(data as Day).reduce((sum: number, day: DayStats) => sum + day.trackCount, 0).toString() : '0',
			interval: 'Last 30 days',
			trend: data ? calculateTrend(Object.values(data as Day).map(day => day.trackCount)) : 'neutral',
			data: data ? Object.values(data as Day).map(day => day.trackCount) : [],
		},
		{
			title: 'Artists',
			value: data ? Object.values(data as Day).reduce((sum: number, day: DayStats) => sum + day.artistCount, 0).toString() : '0',
			interval: 'Last 30 days',
			trend: data ? calculateTrend(Object.values(data as Day).map(day => day.artistCount)) : 'neutral',
			data: data ? Object.values(data as Day).map(day => day.artistCount) : [],
		},
		{
			title: 'Albums',
			value: data ? Object.values(data as Day).reduce((sum: number, day: DayStats) => sum + day.albumCount, 0).toString() : '0',
			interval: 'Last 30 days',
			trend: data ? calculateTrend(Object.values(data as Day).map(day => day.albumCount)) : 'neutral',
			data: data ? Object.values(data as Day).map(day => day.albumCount) : [],
		},
	];

	return (
		<>
			<Typography component="h2" variant="h6" sx={{ mb: 2 }}>
				Dashboard Overview
			</Typography>
			<Grid container spacing={2} columns={12} sx={{ mb: (theme) => theme.spacing(2) }}>
				{cardData.map((card, index) => (
					<Grid key={index} size={{ xs: 12, sm: 6, lg: 4 }}>
						<StatCard {...card} isLoading={isLoading} />
					</Grid>
				))}
			</Grid>

			<Typography component="h2" variant="h6" sx={{ mb: 2 }}>
				Recent Tracks
			</Typography>
			<Grid container spacing={2} columns={12} sx={{ mb: (theme) => theme.spacing(2) }}>
				<Grid size={{ xs: 12, lg: 12 }}>
					<RecentTracksDataTable />
				</Grid>
			</Grid>

			<Typography component="h2" variant="h6" sx={{ mb: 2 }}>
				Other Stuff
			</Typography>
			<Grid container spacing={2} columns={12} sx={{ mb: (theme) => theme.spacing(2) }}>
				<Grid size={{ xs: 12, md: 6 }}>
					<SessionsChart />
				</Grid>
				<Grid size={{ xs: 12, md: 6 }}>
					<PageViewsBarChart />
				</Grid>
			</Grid>
		</>
	);
}