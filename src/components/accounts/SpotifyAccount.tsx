import React from 'react';
import {RootState} from "../store.ts";
import {connect} from "react-redux";

interface SpotifyAccountProps {

}

const SpotifyAccount: React.FC<SpotifyAccountProps> = ({ }) => {
  return (
    <div className={"widget"}>
      <h2 className={"widget-header"}>Spotify Account</h2>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({

})

export default connect(mapStateToProps)(SpotifyAccount);