import React, {useEffect} from 'react';

import {connect} from "react-redux";
import {RootState} from "../../store.ts";

interface AppleAccountProps {

}

const AppleAccount: React.FC<AppleAccountProps> = ({ }) => {
  useEffect(() => {

  }, []);

  return (
    <div className={"widget"}>
      <h2 className={"widget-header"}>Apple Account</h2>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({

})

export default connect(mapStateToProps)(AppleAccount);