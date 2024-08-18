import React from 'react';
import {RootState} from "../store.ts";
import {connect} from "react-redux";

interface AppleAccountProps {

}

const AppleAccount: React.FC<AppleAccountProps> = ({ }) => {
  return (
    <div className={"widget"}>
      <h2 className={"widget-header"}>Apple Account</h2>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({

})

export default connect(mapStateToProps)(AppleAccount);