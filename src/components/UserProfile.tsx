import React, {useEffect} from 'react';
import {connect, ConnectedProps} from "react-redux";
import {AppDispatch, getUserStatsAction, RootState} from "../store.ts";
import {LastFmTrack} from "../models/lastfm-track.model.ts";

interface UserProfileProps extends PropsFromRedux {}

const UserProfile: React.FC<UserProfileProps> = ({userProfile, getUserStats}) => {
    useEffect(() => {
        if (userProfile && !userProfile?.stats) {
            getUserStats();
        }
    }, [getUserStats]);

    return (
        <div>
            <h2>User</h2>
            {userProfile && (
                <>
                    <div>
                        <h3><a href={userProfile.lastFmUrl} target={"_blank"}>{userProfile.name}</a></h3>
                        <p><img src={userProfile.imageUrl} alt={"you"}/></p>
                    </div>
                    <div>
                        {!!userProfile.stats && (
                            <>
                                <p>Playcount: {userProfile.stats.playCount}</p>

                                {!!userProfile.stats.recentTracks && (
                                    <>
                                        <p>Recent tracks:</p>
                                        {userProfile.stats.recentTracks.map((track: LastFmTrack, i: number) => (
                                            <p key={i}>{track.name} - {track.artist} from {track.album} at {track.scrobbledAt}</p>
                                        ))}
                                    </>
                                )}
                            </>
                        )}
                    </div>
                </>
            )}
            {!userProfile && (
                <div>
                    <h2>Loading...</h2>
                </div>
            )}
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({
    userProfile: state.userProfile,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    getUserStats: () => dispatch(getUserStatsAction()),
});

// Create a connector
const connector = connect(mapStateToProps, mapDispatchToProps);

// Infer the props from the connector
type PropsFromRedux = ConnectedProps<typeof connector>;

// Export the connected component
export default connector(UserProfile);