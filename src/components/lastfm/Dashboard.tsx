import React from 'react';
import RecentTracks from "./RecentTracks.tsx";
import {RootState} from "../../store.ts";
import {connect} from "react-redux";
import {dashboardTypes} from "../../constants.ts";
import LastFmAccount from "../accounts/LastFmAccount.tsx";
import CurrentSong from "./CurrentSong.tsx";

interface DashboardProps {
  activeLastFmTab: string;
}

const Dashboard: React.FC<DashboardProps> = ({activeLastFmTab}) => {
  return (
    <div className="widget">
      {activeLastFmTab === dashboardTypes.RECENT_TRACKS && <RecentTracks />}
      {activeLastFmTab === dashboardTypes.CURRENT_SONG && <CurrentSong />}
      {activeLastFmTab === dashboardTypes.ACCOUNT && <LastFmAccount />}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  activeLastFmTab: state.activeLastFmTab,
})

export default connect(mapStateToProps)(Dashboard);