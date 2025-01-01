import * as React from 'react';
import Box from '@mui/material/Box';
import Copyright from './Copyright.tsx';
import { LinearProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store.ts";
import Home from "./Home.tsx";
import CurrentSong from "./CurrentSong.tsx";

export default function MainGrid() {
  const activeGrid = useSelector((state: RootState) => state.app.activeGrid);
  const loading = useSelector((state: RootState) => state.app.loading);

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Box sx={{ height: 4, mb: 2 }}>
        {loading && <LinearProgress />}
      </Box>

      {activeGrid === 'home' && (
        <Home />
      )}

      {activeGrid === 'currentSong' && (
        <CurrentSong />
      )}

      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}
