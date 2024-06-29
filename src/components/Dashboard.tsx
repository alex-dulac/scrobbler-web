import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
    RootState,
    AppDispatch,
    actions,
    getCurrentSongAction,
    setScrobblingAction,
    scrobbleSongAction, syncWithBackendAction
} from '../store.ts';
import UserProfile from './UserProfile.tsx';
import Scrobbler from './Scrobbler.tsx';
import Analytics from './Analytics.tsx';
import { Song } from "../models/song.model.ts";

interface DashboardProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    currentSong: Song | null;
    getCurrentSong: () => Promise<void>;
    scrobbling: boolean;
    setScrobbling: () => void;
    scrobbleCurrentSong: () => Promise<void>;
    syncWithBackend: () => Promise<void>;
}

const Dashboard: React.FC<DashboardProps> = ({
    activeTab,
    setActiveTab,
    currentSong,
    getCurrentSong,
    scrobbling,
    setScrobbling,
    scrobbleCurrentSong,
    syncWithBackend
}) => {
    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    const handleScrobblingStatusChange = () => {
        setScrobbling();
    }

    useEffect(() => {
        syncWithBackend();
    }, []);

    useEffect(() => {
        const getCurrentSongInterval = setInterval(async () => {
            try {
                await getCurrentSong();
            } catch (error) {
                console.error('Error getting current song:', error);
            }
        }, 5000); // 5 seconds

        // Clean up the interval when the component unmounts
        return () => {
            clearInterval(getCurrentSongInterval);
        };
    }, [getCurrentSong]);

    useEffect(() => {
        const scrobbleInterval = setInterval(async () => {
            if (scrobbling) {
                try {
                    await scrobbleCurrentSong();
                } catch (error) {
                    console.error('Error scrobbling current song:', error);
                }
            }
        }, 30000); // 30 seconds

        // Clean up the interval when the component unmounts
        return () => {
            clearInterval(scrobbleInterval);
        };
    }, [scrobbling, scrobbleCurrentSong]);

    return (
        <div style={{display: 'flex', flexDirection: 'column', height: '800px', width: '1000px', border: '1px solid rgba(26, 24, 24, 0.87)'}}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                borderBottom: '1px solid rgba(26, 24, 24, 0.87)',
                padding: '20px 0'
            }}>
                <button onClick={() => handleTabClick('user')}>User</button>
                <button onClick={() => handleTabClick('scrobbler')}>Scrobbler</button>
                <button onClick={() => handleTabClick('analytics')}>Analytics</button>
                <button onClick={() => handleScrobblingStatusChange()}>
                    {scrobbling ? 'Stop Scrobbling' : 'Start Scrobbling'}
                </button>
            </div>
            <div
                style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center'
                }}>
                <div style={{
                    height: '500px'
                }}>
                    {activeTab === 'user' && <UserProfile/>}
                    {activeTab === 'scrobbler' && <Scrobbler/>}
                    {activeTab === 'analytics' && <Analytics/>}
                </div>
                <div style={{
                    width: '100%',
                    height: '250px',
                    textAlign: 'center',
                    borderTop: '1px solid rgba(26, 24, 24, 0.87)'
                }}>
                    {!currentSong ? (
                        <h2>No song playing.</h2>
                    ) : (
                        <div>
                            <h2>Current Song:</h2>
                            <p>{currentSong.name}</p>
                            <p>{currentSong.artist}</p>
                            <p>{currentSong.album}</p>
                            <p style={{visibility: currentSong.scrobbled ? 'visible' : 'hidden'}}>Scrobbled!</p>
                            <p style={{visibility: !currentSong.playing ? 'visible' : 'hidden'}}>Current song is paused</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({
    activeTab: state.activeTab,
    currentSong: state.currentSong,
    userProfile: state.userProfile,
    scrobbling: state.scrobbling,
    scrobbleSongResult: state.scrobbleSongResult,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    setActiveTab: (tab: string) => dispatch(actions.setActiveTab(tab)),
    getCurrentSong: () => dispatch(getCurrentSongAction()),
    setScrobbling: () => dispatch(setScrobblingAction()),
    scrobbleCurrentSong: () => dispatch(scrobbleSongAction()),
    syncWithBackend: () => dispatch(syncWithBackendAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
