import React from 'react';
import {
  ActionProcessingState,
  RootState,
  SET_CURRENT_SONG,
  SET_CURRENT_SONG_SCROBBLES,
  SET_SYNC_DETAILS,
  SET_USER_RECENT_TRACKS
} from "../store.ts";
import {connect} from "react-redux";

interface ActionNotificationProps {
  actionProcessing: ActionProcessingState
}

const ActionNotification: React.FC<ActionNotificationProps> = ({ actionProcessing }) => {
  const isSyncDetailsProcessing = actionProcessing.processing && actionProcessing.actionName == SET_SYNC_DETAILS;
  const isUserRecentTracksProcessing = actionProcessing.processing && actionProcessing.actionName == SET_USER_RECENT_TRACKS;
  const isGetCurrentSongProcessing = actionProcessing.processing && actionProcessing.actionName == SET_CURRENT_SONG;
  const isGetCurrentSongScrobblesProcessing = actionProcessing.processing && actionProcessing.actionName == SET_CURRENT_SONG_SCROBBLES;


  return (
    <div className="action-notification">
      <p>
        {isSyncDetailsProcessing && 'Syncing details...'}
        {isUserRecentTracksProcessing && 'Fetching recent tracks...'}
        {isGetCurrentSongProcessing && 'Fetching current song...'}
        {isGetCurrentSongScrobblesProcessing && 'Fetching current song scrobbles...'}
      </p>
    </div>
  );
};


const mapStateToProps = (state: RootState) => ({
  actionProcessing: state.actionProcessing,
})

export default connect(mapStateToProps)(ActionNotification);