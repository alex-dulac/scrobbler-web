import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {AppDispatch, getUserProfileAction, RootState} from "../store.ts";
import {UserProfileModel} from "../models/user-profile.model.ts";

interface UserProfileProps {
    userProfile: UserProfileModel | null;
    getUserProfile: () => Promise<void>;
}

const UserProfile: React.FC<UserProfileProps> = ({userProfile, getUserProfile}) => {
    useEffect(() => {
        if (userProfile === null) {
            getUserProfile();
        }
    }, [getUserProfile]);

    return (
        <div>
            <h2>User Profile</h2>
            {userProfile && (
                <div>
                    <p>Name: {userProfile.name}</p>
                </div>
            )}
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({
    userProfile: state.userProfile,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    getUserProfile: () => dispatch(getUserProfileAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);