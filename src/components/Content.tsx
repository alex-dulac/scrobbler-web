import React from 'react';
import DashboardHeader from "./DashboardHeader.tsx";
import Dashboard from "./Dashboard.tsx";

const Content: React.FC = () => {
  return (
    <div className="content">
      <DashboardHeader />
      <Dashboard />
    </div>
  );
};

export default Content;