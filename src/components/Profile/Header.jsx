import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useUser from '~/hooks/use-user';
import { isUserFollowingProfile, toggleFollow } from '~/services/firebase';
import Skeleton from 'react-loading-skeleton';

const Header = ({
    photosCount,
    followerCount,
    setFollowerCount,
    profile: {
        docId: profileDocId,
        userId: profileUserId,
        fullName,
        followers = [],
        following = [],
        username: profileUsername,
    },
}) => {
    const { user } = useUser();
    const [isFollowingProfile, setIsFollowingProfile] = useState(false);
    const activeBtnFollow = user.username && user.username !== profileUsername;

    const handleToggleFollow = async () => {
        setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
        setFollowerCount({
            followerCount: isFollowingProfile
                ? followers.length - 1
                : followers.length + 1,
        });

        await toggleFollow(
            isFollowingProfile,
            user.docId,
            profileDocId,
            profileUserId,
            user.userId,
        );
    };

    useEffect(() => {
        const isLoggedInUserFollowingProfile = async () => {
            const isFollowing = await isUserFollowingProfile(
                user.username,
                profileUserId,
            );
            setIsFollowingProfile(!!isFollowing);
        };

        if (user.username && profileUserId) {
            isLoggedInUserFollowingProfile();
        }
    }, [user.username, profileUserId]);
    return (
        <div className="grid grid-cols-4 gap-4 justify-between mx-auto max-w-screen-lg">
            <div className="container flex justify-center">
                {user.username && (
                    <img
                        className="rounded-full h-40 w-40 flex"
                        alt={`${user.userId} profile`}
                        src={`/instagram/images/avatars/${profileUsername}.jpg`}
                    />
                )}
            </div>
            <div className="flex items-center justify-center flex-col col-span-2">
                <div className="container flex items-center">
                    <p className="text-2xl mr-4">{profileUsername}</p>
                    {activeBtnFollow && (
                        <button
                            className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
                            type="button"
                            onClick={handleToggleFollow}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    handleToggleFollow();
                                }
                            }}
                        >
                            {isFollowingProfile ? 'Unfollow' : 'Follow'}
                        </button>
                    )}
                </div>
                <div className="container flex mt-4">
                    {followers === undefined || following === undefined ? (
                        <Skeleton count={1} height={24} width={677} />
                    ) : (
                        <>
                            <p className="mr-10">
                                <span className="font-bold">{photosCount}</span>{' '}
                                photos
                            </p>
                            <p className="mr-10">
                                <span className="font-bold">
                                    {followerCount}
                                </span>
                                {` `}
                                {followerCount < 2 ? `follower` : `followers`}
                            </p>
                            <p className="mr-10">
                                <span className="font-bold">
                                    {following.length}
                                </span>
                                {` `}
                                {followers.length === 1
                                    ? `following`
                                    : `followings`}
                            </p>
                        </>
                    )}
                </div>
                <div className="container mt-4">
                    <p className="font-medium">
                        {!fullName ? (
                            <Skeleton count={1} height={24} />
                        ) : (
                            fullName
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Header;

Header.propTypes = {
    photosCount: PropTypes.number.isRequired,
    followerCount: PropTypes.number,
    setFollowerCount: PropTypes.func.isRequired,
    profile: PropTypes.shape({
        docId: PropTypes.string,
        userId: PropTypes.string,
        fullName: PropTypes.string,
        username: PropTypes.string,
        followers: PropTypes.array,
        following: PropTypes.array,
    }).isRequired,
};
