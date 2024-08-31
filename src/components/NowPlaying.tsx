import React from "react";
import {
  AppDispatch,
  RootState,
} from "../store.ts";
import {connect} from "react-redux";
import {Song} from "../models/song.model.ts";
import {LastFmAlbum} from "../models/lastfm-album.model.ts";

interface NowPlayingProps {
  currentSong: Song | null;
  lastfmAlbum: LastFmAlbum | null;
}

const NowPlayingWidget: React.FC<NowPlayingProps> = ({currentSong, lastfmAlbum}) => {
  return (
    <div className="now-playing-widget">
      <img src={lastfmAlbum ? lastfmAlbum.imageUrl : 'placeholder-image-url.jpg'} alt={'profile'} className="sidebar-profile-image"/>
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  currentSong: state.currentSong,
  lastfmAlbum: state.lastfmAlbum,
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(NowPlayingWidget);