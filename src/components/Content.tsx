import React from 'react';
import DashboardHeader from "./DashboardHeader.tsx";
import Dashboard from "./Dashboard.tsx";
import {RootState} from "../store.ts";
import {connect} from "react-redux";
import {contentTypes} from "../constants.ts";

interface ContentProps {
  contentFocus: string;
}

const Content: React.FC<ContentProps> = ({
  contentFocus,
}) => {

  return (
    <div className="content">
      {contentFocus === contentTypes.LAST_FM && (
        <>
          <DashboardHeader />
          <Dashboard />
        </>
      )}

      {contentFocus === contentTypes.APPLE && (
        <>
          <Dashboard />
        </>
      )}

      {contentFocus === contentTypes.SPOTIFY && (
        <>
          <Dashboard />
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  contentFocus: state.contentFocus,
})

export default connect(mapStateToProps)(Content);