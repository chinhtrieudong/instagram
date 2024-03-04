import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import { getUserPhotoByUserName } from '~/services/firebase';
import Photos from './Photos';

const UserProfile = ({ user }) => {
    const reducer = (state, newState) => ({ ...state, ...newState });
    const initialState = {
        profile: {},
        photosCollection: [],
        followerCout: 0,
    };
    const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
        reducer,
        initialState,
    );

    useEffect(() => {
        async function getProfileInfoAndPhotos() {
            const photos = await getUserPhotoByUserName(user.username);
            console.log(photos);
            dispatch({
                profile: user,
                photosCollection: photos,
                followerCount: user.followers.length,
            });
        }

        if (user.username) {
            getProfileInfoAndPhotos();
        }
    }, [user]);
    return (
        <div>
            <Header
                photosCount={photosCollection ? photosCollection.length : 0}
                profile={profile}
                followerCount={followerCount}
                setFollowerCount={dispatch}
            />
            <Photos photos={photosCollection} />
        </div>
    );
};

UserProfile.propTypes = {
    user: PropTypes.shape({
        dateCreated: PropTypes.number.isRequired,
        emailAddress: PropTypes.string.isRequired,
        followers: PropTypes.array.isRequired,
        following: PropTypes.array.isRequired,
        fullName: PropTypes.string.isRequired,
        userId: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
    }).isRequired,
};

export default UserProfile;
