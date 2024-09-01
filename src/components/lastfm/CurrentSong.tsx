import React, {useEffect} from "react";
import {
  AppDispatch, getCurrentSongScrobblesAction,
  RootState,
} from "../../store.ts";
import {connect} from "react-redux";
import {Song} from "../../models/song.model.ts";
import ScrobbleLineChart from "../data/ScrobbleLineChart.tsx";
import ScrobbleBarChart from "../data/ScrobbleBarChart.tsx";

interface CurrentSongProps {
  currentSong: Song | null;
  currentSongScrobbles: [] | null;
  getCurrentSongScrobbles: () => Promise<void>;
}

const CurrentSong: React.FC<CurrentSongProps> = ({currentSong, currentSongScrobbles, getCurrentSongScrobbles}) => {
  useEffect(() => {
    getCurrentSongScrobbles();
  }, [currentSong?.id]);

  return (
    <div className={"current-song-widget"}>
      {!!currentSong && (
        <>
          <p>{currentSong.name}</p>
          <ScrobbleLineChart data={currentSongScrobbles} />
          <ScrobbleBarChart data={currentSongScrobbles} />
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