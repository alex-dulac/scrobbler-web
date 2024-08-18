import React from 'react';
import DashboardHeader from "./lastfm/DashboardHeader.tsx";
import Dashboard from "./lastfm/Dashboard.tsx";
import {RootState} from "../store.ts";
import {connect} from "react-redux";
import {contentTypes} from "../constants.ts";
import AppleAccount from "./accounts/AppleAccount.tsx";
import SpotifyAccount from "./accounts/SpotifyAccount.tsx";

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
        <AppleAccount />
      )}

      {contentFocus === contentTypes.SPOTIFY && (
        <SpotifyAccount />
      )}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  contentFocus: state.contentFocus,
})

export default connect(mapStateToProps)(Content);