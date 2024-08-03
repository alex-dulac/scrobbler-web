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
          <h2>Latest played tracks</h2>
          {!!user.recentTracks && user.recentTracks.length > 0 ? (
            <>
              <p>Recent tracks:</p>
              {user.recentTracks.map((track: LastFmTrack, i: number) => (
                <p key={i}>{track.name} - {track.artist} from {track.album} at {track.scrobbledAt}</p>
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