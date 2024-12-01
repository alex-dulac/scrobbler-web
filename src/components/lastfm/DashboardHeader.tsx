 import React from 'react';
 import {actions, AppDispatch, RootState} from "../../store.ts";
 import {connect} from "react-redux";
 import {dashboardTypes} from "../../library/constants.ts";

 interface DashboardHeaderProps {
   activeLastFmTab: string;
   setActiveLastFmTab: (tab: string) => void;
 }

 const DashboardHeader: React.FC<DashboardHeaderProps> = ({
   activeLastFmTab,
   setActiveLastFmTab,
}) => {
   const handleTabClick = (tab: string) => {
     setActiveLastFmTab(tab);
   };

   return (
     <div className="content-header">
       <button
         onClick={() => handleTabClick(dashboardTypes.RECENT_TRACKS)}
         className={activeLastFmTab === dashboardTypes.RECENT_TRACKS ? 'active' : ''}> Recent Tracks
       </button>
       <button
         onClick={() => handleTabClick(dashboardTypes.CURRENT_SONG)}
         className={activeLastFmTab === dashboardTypes.CURRENT_SONG ? 'active' : ''}> Current Song
       </button>
       <button
         onClick={() => handleTabClick(dashboardTypes.ACCOUNT)}
         className={activeLastFmTab === dashboardTypes.ACCOUNT ? 'active' : ''}> LastFM Account
       </button>
     </div>
   );
 };

 const mapStateToProps = (state: RootState) => ({
   activeLastFmTab: state.activeLastFmTab,
 });

 const mapDispatchToProps = (dispatch: AppDispatch) => ({
   setActiveLastFmTab: (tab: string) => dispatch(actions.setActiveLastFmTab(tab)),
 });

 export default connect(mapStateToProps, mapDispatchToProps)(DashboardHeader);
