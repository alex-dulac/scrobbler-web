import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ScrobbleBarChartProps {
  data: { x: string, y: number }[] | null;
}

const ScrobbleBarChart: React.FC<ScrobbleBarChartProps> = ({ data }) => {
  if (!data) return (
    <div>No data...</div>
  );

  if (data.length === 0) return (
    <div>First listen!</div>
  );

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
        barCategoryGap="20%"
        barGap={2}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default ScrobbleBarChart;