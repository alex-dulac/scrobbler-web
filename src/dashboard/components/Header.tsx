import Stack from '@mui/material/Stack';
import NavbarBreadcrumbs from './NavbarBreadcrumbs';
import MenuButton from './MenuButton';
import ColorModeIconDropdown from '../../shared-theme/ColorModeIconDropdown';

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, setPolling, setScrobbling } from "../../store.ts";
import { MusicNote, MusicOff, Person, PersonOff } from "@mui/icons-material";
import { useScrobbleToggle } from "../../library/hooks.ts";
import Search from "./Search.tsx";
import CustomDatePicker from "./CustomDatePicker.tsx";

export default function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const { scrobbleToggle } = useScrobbleToggle();

  const polling = useSelector((state: RootState) => state.app.polling);
  const scrobbling = useSelector((state: RootState) => state.app.scrobbling);

  const handleScrobblingToggle = async () => {
    const result = await scrobbleToggle();
    dispatch(setScrobbling(result.data ?? false));
  };

  const handlePollingToggle = async () => {
    dispatch(setPolling(!polling));
  };

  return (
    <Stack
      direction="row"
      sx={{
        display: { xs: 'none', md: 'flex' },
        width: '100%',
        alignItems: { xs: 'flex-start', md: 'center' },
        justifyContent: 'space-between',
        maxWidth: { sm: '100%', md: '1700px' },
        pt: 1.5,
      }}
      spacing={2}
    >
      <NavbarBreadcrumbs />
      <Stack direction="row" sx={{ gap: 1 }}>

        <Search />
        <CustomDatePicker />

        <MenuButton onClick={handlePollingToggle} aria-label="Open notifications">
          {polling ? <MusicNote /> : <MusicOff />}
        </MenuButton>

        <MenuButton onClick={handleScrobblingToggle} aria-label="Open notifications">
          {scrobbling ? <Person /> : <PersonOff />}
        </MenuButton>

        {/*
        <MenuButton aria-label="Open notifications">
          <NotificationsRoundedIcon />
        </MenuButton>
        */}

        <ColorModeIconDropdown />
      </Stack>
    </Stack>
  );
}
