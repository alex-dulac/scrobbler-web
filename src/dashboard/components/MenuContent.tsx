import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import { AppDispatch, RootState, setActiveGrid } from "../../store.ts";
import { useDispatch, useSelector } from "react-redux";

const mainListItems = [
  { name: 'home', text: 'Home', icon: <HomeRoundedIcon /> },
  { name: 'currentSong', text: 'Current Song', icon: <AnalyticsRoundedIcon /> },
];

export default function MenuContent() {
  const dispatch = useDispatch<AppDispatch>();
  const activeGrid = useSelector((state: RootState) => state.app.activeGrid);

  const handleListItemClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
    event.preventDefault();
    const grid = index === 0 ? 'home' : 'currentSong';
    dispatch(setActiveGrid(grid));
  }

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              selected={activeGrid === item.name}
              onClick={(event) => handleListItemClick(event, index)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
