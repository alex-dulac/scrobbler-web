import React from 'react';
import {RootState} from "../store.ts";
import {connect} from "react-redux";

interface LastFmAccountProps {

}

const LastFmAccount: React.FC<LastFmAccountProps> = ({ }) => {
  return (
    <div>
      <h2 className={"widget-header"}>Last.fm Account</h2>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({

})

export default connect(mapStateToProps)(LastFmAccount);