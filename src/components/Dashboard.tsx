import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RootState, AppDispatch, actions, getCurrentSongAction } from '../store.ts';
import UserProfile from './UserProfile.tsx';
import Scrobbler from './Scrobbler.tsx';
import Analytics from './Analytics.tsx';
import { Song } from "../models/song.model.ts";

interface DashboardProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    currentSong: Song | null;
    getCurrentSong: () => Promise<void>;
}

const Dashboard: React.FC<DashboardProps> = ({activeTab, setActiveTab, currentSong, getCurrentSong  }) => {
    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    useEffect(() => {
        const getCurrentSongInterval = setInterval(async () => {
            try {
                await getCurrentSong();
            } catch (error) {
                console.error('Error getting current song:', error);
            }
        }, 5000);

        // Clean up the interval when the component unmounts
        return () => {
            clearInterval(getCurrentSongInterval);
        };
    }, [getCurrentSong]);

    return (
            <div>
                <div>
                    <button onClick={() => handleTabClick('user')}>User</button>
                    <button onClick={() => handleTabClick('scrobbler')}>Scrobbler</button>
                    <button onClick={() => handleTabClick('analytics')}>Analytics</button>
                </div>
                {activeTab === 'user' && <UserProfile />}
                {activeTab === 'scrobbler' && <Scrobbler />}
                {activeTab === 'analytics' && <Analytics />}
                {!currentSong && (
                    <div>
                        <h2>No song playing.</h2>
                    </div>
                )}
                {currentSong && (
                    <div>
                        <h2>Current Song:</h2>
                        <p>Title: {currentSong.track}</p>
                        <p>Artist: {currentSong.artist}</p>
                        <p>Album: {currentSong.album}</p>
                    </div>
                )}
            </div>
    );
};

const mapStateToProps = (state: RootState) => ({
    activeTab: state.activeTab,
    currentSong: state.currentSong,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    setActiveTab: (tab: string) => dispatch(actions.setActiveTab(tab)),
    getCurrentSong: () => dispatch(getCurrentSongAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
