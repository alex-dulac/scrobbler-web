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
import "../style/Dashboard.css"

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
        <div className={"dashboard-container"}>
            <div className={"sidebar"}>
                <ul>
                    <li>
                        <button onClick={() => handleTabClick('user')}>User</button>
                    </li>
                    <li>
                        <button onClick={() => handleTabClick('scrobbler')}>Scrobbler</button>
                    </li>
                    <li>
                        <button onClick={() => handleTabClick('analytics')}>Analytics</button>
                    </li>
                    <li>
                        <button onClick={() => handleScrobblingStatusChange()}>
                            {scrobbling ? 'Stop Scrobbling' : 'Start Scrobbling'}
                        </button>
                    </li>
                </ul>
            </div>
            <div className={"main-content"}>
                <h1>Apple Music Scrobbler</h1>
                <div className={"card"}>
                    {!currentSong ? (
                        <h2>No song playing.</h2>
                    ) : (
                        <div className="song-card">
                            <img
                                src={"https://upload.wikimedia.org/wikipedia/en/thumb/4/4b/Green_Day_-_Dookie_cover.jpg/220px-Green_Day_-_Dookie_cover.jpg"}
                                alt={`album cover`} className="album-image"/>
                            <div className="song-info">
                                <h2>{currentSong.artist}</h2>
                                <p>{currentSong.name} - {currentSong.album} ({currentSong.year})</p>
                                <p style={{visibility: currentSong.scrobbled ? 'visible' : 'hidden'}}>Scrobbled!</p>
                                <p style={{visibility: !currentSong.playing ? 'visible' : 'hidden'}}>Current song is paused</p>
                            </div>
                        </div>
                    )}
                </div>
                <div className={"card"}>
                    {activeTab === 'user' && <UserProfile/>}
                    {activeTab === 'scrobbler' && <Scrobbler/>}
                    {activeTab === 'analytics' && <Analytics/>}
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
