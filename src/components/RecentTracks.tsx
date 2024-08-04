import React, {useEffect} from "react";
import {LastFmTrack} from "../models/lastfm-track.model.ts";
import {User} from "../models/user.model.ts";
import {
  AppDispatch,
  getUserRecentTracksAction,
  RootState,
} from "../store.ts";
import {connect} from "react-redux";
import {Song} from "../models/song.model.ts";
import {LastFmAlbum} from "../models/lastfm-album.model.ts";

interface RecentTracksProps {
  currentSong: Song | null;
  getUserRecentTracks: () => Promise<void>;
  user: User | null;
}

const RecentTracks: React.FC<RecentTracksProps> = ({currentSong, getUserRecentTracks, user}) => {
  useEffect(() => {
    getUserRecentTracks();
  }, [currentSong?.scrobbled == true]);

  return (
    <div className="latest-tracks">
      {!!user && (
        <>
          <h2 className={"widget-header"}>Recent tracks</h2>
          {!!user.recentTracks && user.recentTracks.length > 0 ? (
            <>
              {user.recentTracks.map(([track, album]: [LastFmTrack, LastFmAlbum], i: number) => (
                <div className="track border-bottom" key={i}>
                  <img src={album.imageUrl} alt="Album Cover" className="track-cover"></img>
                  <div className="track-info">
                    <div className="track-title-details">
                      <div className="track-title">{track.name}</div>
                      <div className="track-details">
                        <span className="track-artist">{track.artist}</span>
                        <span className="track-album">{album.title}</span>
                      </div>
                    </div>
                    <div className="track-time">{track.scrobbledAt}</div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <p>No recent tracks available.</p>
          )}
        </>
      )}
      {!user && (
        <div>
          <h2>Loading...</h2>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  currentSong: state.currentSong,
  user: state.user,
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getUserRecentTracks: () => dispatch(getUserRecentTracksAction()),
})

export default connect(mapStateToProps, mapDispatchToProps)(RecentTracks);