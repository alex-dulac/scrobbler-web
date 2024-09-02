import React, {useEffect} from "react";
import {
  AppDispatch, getCurrentSongScrobblesAction,
  RootState,
} from "../../store.ts";
import {connect} from "react-redux";
import {Song} from "../../models/song.model.ts";
import ScrobbleBarChart from "../data/ScrobbleBarChart.tsx";

export interface Scrobble {
  timestamp: string;
  count: number;
}

interface CurrentSongProps {
  currentSong: Song | null;
  currentSongScrobbles: Scrobble[] | null;
  getCurrentSongScrobbles: () => Promise<void>;
}

const CurrentSong: React.FC<CurrentSongProps> = ({currentSong, currentSongScrobbles, getCurrentSongScrobbles}) => {
  useEffect(() => {
    getCurrentSongScrobbles();
  }, [currentSong?.id]);

  const sortedScrobbles =
    currentSongScrobbles?.slice().sort((a, b) =>
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
    ?? [];

  return (
    <div className={"current-song-widget"}>
      {!!currentSong && (
        <>
          <h2 className={"widget-header"}>
            {currentSong.name}
          </h2>
          <ScrobbleBarChart data={sortedScrobbles}/>
        </>
      )}
      {!currentSong && (
        <div>
        <h2>No Current Song...</h2>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  currentSong: state.currentSong,
  currentSongScrobbles: state.currentSongScrobbles,
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getCurrentSongScrobbles: () => dispatch(getCurrentSongScrobblesAction()),
})

export default connect(mapStateToProps, mapDispatchToProps)(CurrentSong);