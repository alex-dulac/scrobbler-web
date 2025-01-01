import * as React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { useSelector } from "react-redux";
import { RootState } from "../../store.ts";

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    color: (theme.vars || theme).palette.action.disabled,
    margin: 1,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: 'center',
  },
}));

export default function NavbarBreadcrumbs() {
  const activeGrid = useSelector((state: RootState) => state.app.activeGrid);

  const gridDisplayNames: Record<string, string> = {
    home: 'Home',
    currentSong: 'Current Song',
  };

  const display = gridDisplayNames[activeGrid] || 'Unknown';

  return (
    <StyledBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      <Typography variant="body1">
        Dashboard
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>
        {display}
      </Typography>
    </StyledBreadcrumbs>
  );
}
