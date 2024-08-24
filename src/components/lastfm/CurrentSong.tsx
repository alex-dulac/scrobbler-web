import React from "react";
import {User} from "../models/user.model.ts";
import {
  AppDispatch,
  RootState,
} from "../store.ts";
import {connect} from "react-redux";
import {Song} from "../models/song.model.ts";

interface CurrentSongProps {
  currentSong: Song | null;
}

const CurrentSong: React.FC<CurrentSongProps> = ({currentSong}) => {
  return (
    <div className={"current-song-widget"}>
      {!!currentSong && (
        <>
          <p>{currentSong.name}</p>
          <ScrobbleLineChart data={graphData} />
        </>
      )}
      {!currentSong && (
        <div>
          <h2>Loading...</h2>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  currentSong: state.currentSong,
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(CurrentSong);