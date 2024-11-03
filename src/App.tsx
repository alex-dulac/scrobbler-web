import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {AppDispatch, getCurrentSongAction, RootState, scrobbleSongAction, syncWithBackendAction} from './store';
import Sidebar from "./components/Sidebar.tsx";
import Content from "./components/Content.tsx";
import {Song} from "./models/song.model.ts";
import {LastFmAlbum} from "./models/lastfm-album.model.ts";

const POLL: boolean = import.meta.env.VITE_POLL;

interface AppProps {
  currentSong: Song | null;
  getCurrentSong: () => Promise<void>;
  lastfmAlbum: LastFmAlbum | null;
  scrobbling: boolean;
  scrobbleCurrentSong: () => Promise<void>;
  syncWithBackend: () => Promise<void>;
}

const App: React.FC<AppProps> = ({
  currentSong,
  getCurrentSong,
  lastfmAlbum,
  scrobbling,
  scrobbleCurrentSong,
  syncWithBackend,
}) => {
  const [backgroundStyle, setBackgroundStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    syncWithBackend();
  }, []);

  if (POLL) {
    useEffect(() => {
      const getCurrentSongInterval = setInterval(async () => {
        await getCurrentSong();
      }, 5000); // 5 seconds

      return () => {
        clearInterval(getCurrentSongInterval);
      };
    }, [getCurrentSong]);
  }

  useEffect(() => {
    const scrobbleInterval = setInterval(async () => {
      if (scrobbling && currentSong?.scrobbled == false) {
        await scrobbleCurrentSong();
      }
    }, 30000); // 30 seconds

    return () => {
      clearInterval(scrobbleInterval);
    };
  }, [scrobbleCurrentSong, scrobbling, currentSong?.scrobbled]);

  // TODO I don't really like this. Do something else.
  // useEffect(() => {
  //   const backgroundImage: string = lastfmAlbum ? lastfmAlbum.imageUrl : '';
  //
  //   const backgroundStyle: React.CSSProperties = {
  //     backgroundImage: `
  //     linear-gradient(to top, rgba(255, 255, 255, 1) 0%,
  //     rgba(255, 255, 255, 0) 75%),
  //     url(${backgroundImage})
  //     `,
  //     backgroundPosition: 'top center',
  //   };
  //
  //   setBackgroundStyle(backgroundStyle);
  // }, [lastfmAlbum]);

  return (
    <div className={"App"}>
      <div className={"background-image"} style={backgroundStyle}>
        <div className={"main-container"}>
          <Sidebar />
          <Content />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  currentSong: state.currentSong,
  lastfmAlbum: state.lastfmAlbum,
  scrobbling: state.scrobbling,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getCurrentSong: () => dispatch(getCurrentSongAction()),
  syncWithBackend: () => dispatch(syncWithBackendAction()),
  scrobbleCurrentSong: () => dispatch(scrobbleSongAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);