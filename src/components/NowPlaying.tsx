import React from "react";
import {User} from "../models/user.model.ts";
import {
  AppDispatch,
  RootState,
} from "../store.ts";
import {connect} from "react-redux";
import {Song} from "../models/song.model.ts";

interface NowPlayingProps {
  currentSong: Song | null;
  getUserRecentTracks: () => Promise<void>;
  user: User | null;
}

const NowPlayingWidget: React.FC<NowPlayingProps> = ({currentSong}) => {
  return (
    <div className={"now-playing-widget"}>
      {!!currentSong && (
        <p>{currentSong.name}</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(NowPlayingWidget);