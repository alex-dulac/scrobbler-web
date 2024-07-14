import React, {useEffect} from 'react';
import {connect, ConnectedProps} from "react-redux";
import {AppDispatch, getUserAction, getUserPlaycountAction, RootState} from "../store.ts";
import {LastFmTrack} from "../models/lastfm-track.model.ts";

interface UserProfileProps extends PropsFromRedux {}

const UserProfile: React.FC<UserProfileProps> = ({userProfile, getUser, getUserPlaycount}) => {
    useEffect(() => {
        getUser();
        getUserPlaycount();
    }, [getUser]);

    return (
        <div>
            {userProfile && (
                <div>
                    <p>Playcount: {userProfile.playcount}</p>
                    {!!userProfile.recentTracks && (
                        <>
                            <p>Recent tracks:</p>
                            {userProfile.recentTracks.map((track: LastFmTrack, i: number) => (
                                <p key={i}>{track.name} - {track.artist} from {track.album} at {track.scrobbledAt}</p>
                            ))}
                        </>
                    )}
                </div>
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
    getUser: () => dispatch(getUserAction()),
    getUserPlaycount: () => dispatch(getUserPlaycountAction()),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(UserProfile);