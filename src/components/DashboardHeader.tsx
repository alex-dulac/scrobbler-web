 import React from 'react';
 import {actions, AppDispatch, RootState} from "../store.ts";
 import {connect} from "react-redux";
 import {dashboardTypes} from "../constants.ts";

 interface DashboardHeaderProps {
   activeLastFmTab: string;
   setActiveLastFmTab: (tab: string) => void;
 }

 const DashboardHeader: React.FC<DashboardHeaderProps> = ({
   activeLastFmTab,
   setActiveLastFmTab,
}) => {
   const handleTabClick = (tab: string) => {
     console.log('Setting active tab to:', tab);
     setActiveLastFmTab(tab);
   };

   return (
     <div className="content-header">
       <button
         onClick={() => handleTabClick(dashboardTypes.RECENT_TRACKS)}
         className={activeLastFmTab === dashboardTypes.RECENT_TRACKS ? 'active' : ''}> Recent Tracks
       </button>
       <button
         onClick={() => handleTabClick(dashboardTypes.RECENT_TRACKS)}
         className={activeLastFmTab === dashboardTypes.RECENT_TRACKS ? 'active' : ''}> Tab 2
       </button>
       <button
         onClick={() => handleTabClick(dashboardTypes.RECENT_TRACKS)}
         className={activeLastFmTab === dashboardTypes.RECENT_TRACKS ? 'active' : ''}> Tab 3
       </button>
       <button
         onClick={() => handleTabClick(dashboardTypes.RECENT_TRACKS)}
         className={activeLastFmTab === dashboardTypes.RECENT_TRACKS ? 'active' : ''}> Tab 3
       </button>
       <button
         onClick={() => handleTabClick(dashboardTypes.RECENT_TRACKS)}
         className={activeLastFmTab === dashboardTypes.RECENT_TRACKS ? 'active' : ''}> Tab 4
       </button>
       <button
         onClick={() => handleTabClick(dashboardTypes.RECENT_TRACKS)}
         className={activeLastFmTab === dashboardTypes.RECENT_TRACKS ? 'active' : ''}> Tab 5
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
