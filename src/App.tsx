import React, { useMemo } from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import SideMenu from "./dashboard/components/SideMenu";
import AppNavbar from "./dashboard/components/AppNavbar";
import { alpha } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Header from "./dashboard/components/Header";
import MainGrid from "./dashboard/components/MainGrid";
import AppTheme from "./shared-theme/AppTheme";
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations
} from "./dashboard/theme/customizations";
import { useCurrentSong, useScrobble, useScrobbleInterval, useSyncWithBackend } from "./library/hooks.ts";

const App: React.FC = () => {
  useSyncWithBackend();
  useCurrentSong();
  const { scrobble } = useScrobble();
  useScrobbleInterval(scrobble);

  const xThemeComponents = useMemo(() => ({
    ...chartsCustomizations,
    ...dataGridCustomizations,
    ...datePickersCustomizations,
    ...treeViewCustomizations,
  }), []);

  return (
    <AppTheme themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex' }}>
        <SideMenu />
        <AppNavbar />
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: 'auto',
          })}
        >
          <Stack spacing={2} sx={{ alignItems: 'center', mx: 3, pb: 5, mt: { xs: 8, md: 0 } }}>
            <Header />
            <MainGrid />
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
};

export default App;