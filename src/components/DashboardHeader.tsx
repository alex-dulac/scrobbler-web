 import React from 'react';
 import {actions, AppDispatch, RootState} from "../store.ts";
 import {connect} from "react-redux";

 interface DashboardHeaderProps {
   activeTab: string;
   setActiveTab: (tab: string) => void;
 }

 const DashboardHeader: React.FC<DashboardHeaderProps> = ({
   activeTab,
   setActiveTab,
}) => {
   const handleTabClick = (tab: string) => {
     setActiveTab(tab);
   };

   return (
     <div className="content-header">
       <button
         onClick={() => handleTabClick('recent')}
         className={activeTab === 'recent'? 'active' : ''}> Recent Tracks
       </button>
       <button
         onClick={() => handleTabClick('recent')}
         className={activeTab === 'recent' ? 'active' : ''}> Library
       </button>
       <button
         onClick={() => handleTabClick('recent')}
         className={activeTab === 'recent' ? 'active' : ''}> Library
       </button>
       <button
         onClick={() => handleTabClick('recent')}
         className={activeTab === 'recent' ? 'active' : ''}> Library
       </button>
       <button
         onClick={() => handleTabClick('recent')}
         className={activeTab === 'recent' ? 'active' : ''}> Library
       </button>
       <button
         onClick={() => handleTabClick('recent')}
         className={activeTab === 'recent' ? 'active' : ''}> Library
       </button>
     </div>
   );
 };

 const mapStateToProps = (state: RootState) => ({
   activeTab: state.activeTab,
 });

 const mapDispatchToProps = (dispatch: AppDispatch) => ({
   setActiveTab: (tab: string) => dispatch(actions.setActiveTab(tab)),
 });

 export default connect(mapStateToProps, mapDispatchToProps)(DashboardHeader);
