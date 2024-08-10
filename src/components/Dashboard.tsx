import React from 'react';
import RecentTracks from "./RecentTracks.tsx";
import {RootState} from "../store.ts";
import {connect} from "react-redux";
import {dashboardTypes} from "../constants.ts";

interface DashboardProps {
  activeLastFmTab: string;
}

const Dashboard: React.FC<DashboardProps> = ({activeLastFmTab}) => {
  return (
    <div className="widget">
        {activeLastFmTab === dashboardTypes.RECENT_TRACKS && <RecentTracks />}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  activeLastFmTab: state.activeLastFmTab,
})

export default connect(mapStateToProps)(Dashboard);