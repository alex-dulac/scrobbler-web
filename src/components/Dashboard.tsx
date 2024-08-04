import React from 'react';
import RecentTracks from "./RecentTracks.tsx";
import {RootState} from "../store.ts";
import {connect} from "react-redux";

interface DashboardProps {
    activeTab: string;
}

const Dashboard: React.FC<DashboardProps> = ({activeTab}) => {
    return (
      <div className="widget">
          {activeTab === 'recent' && <RecentTracks />}
      </div>
    );
};

const mapStateToProps = (state: RootState) => ({
    activeTab: state.activeTab,
})

export default connect(mapStateToProps)(Dashboard);