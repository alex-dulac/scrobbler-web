import React from 'react';
import { connect } from 'react-redux';
import { RootState, AppDispatch, actions } from '../store.ts';
import User from './User.tsx';
import Scrobbler from './Scrobbler.tsx';
import Analytics from './Analytics.tsx';

interface DashboardProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ activeTab, setActiveTab }) => {
    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    return (
            <div>
                <div>
                    <button onClick={() => handleTabClick('user')}>User</button>
                    <button onClick={() => handleTabClick('scrobbler')}>Scrobbler</button>
                    <button onClick={() => handleTabClick('analytics')}>Analytics</button>
                </div>
                {activeTab === 'user' && <User />}
                {activeTab === 'scrobbler' && <Scrobbler />}
                {activeTab === 'analytics' && <Analytics />}
            </div>
    );
};

const mapStateToProps = (state: RootState) => ({
    activeTab: state.activeTab,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    setActiveTab: (tab: string) => dispatch(actions.setActiveTab(tab)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);