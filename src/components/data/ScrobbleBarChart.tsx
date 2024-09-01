import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format, parseISO } from 'date-fns';
import {Scrobble} from "../lastfm/CurrentSong.tsx";

interface ScrobbleBarChartProps {
  data: Scrobble[] | null;
}

const groupDataByYearMonth = (data: { timestamp: string, count: number }[]) => {
  const groupedData: { [key: string]: number } = {};

  data.forEach(item => {
    const date = parseISO(item.timestamp);
    const yearMonth = format(date, 'yyyy-MM');

    if (!groupedData[yearMonth]) {
      groupedData[yearMonth] = 0;
    }

    groupedData[yearMonth] += item.count;
  });

  return Object.keys(groupedData).map(key => ({
    yearMonth: key,
    count: groupedData[key],
  }));
};

const ScrobbleBarChart: React.FC<ScrobbleBarChartProps> = ({ data }) => {
  if (!data) return (
    <div>No data...</div>
  );

  if (data.length === 0) return (
    <div>First listen!</div>
  );

  const groupedData = groupDataByYearMonth(data);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={groupedData}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
        barCategoryGap="20%"
        barGap={2}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="yearMonth" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default ScrobbleBarChart;