import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { getSuggestedProfiles } from '~/services/firebase';
import PropTypes from 'prop-types';
import SuggestedProfile from './Suggested-profile';

const Suggestions = ({ userId, following, loggedInUserDocId }) => {
    const [profiles, setProfiles] = useState(null);

    useEffect(() => {
        async function suggestedProfiles() {
            const response = await getSuggestedProfiles(userId, following);
            setProfiles(response);
        }

        if (userId) {
            suggestedProfiles();
        }
    }, [userId, following]);

    console.log(profiles);

    return !profiles ? (
        <Skeleton count={1} height={150} className="mt-5" />
    ) : (
        <div className="rounded flex flex-col">
            <div className="text-sm flex items-center align-items">
                <p className="font-bold text-gray-base">Suggestion for you</p>
            </div>
            <div className="mt-4 grid gap-5">
                {profiles.map((profile) => (
                    <SuggestedProfile
                        key={profile.docId}
                        profileDocId={profile.docId}
                        userDocId={profile.docId}
                        username={profile.username}
                        profileId={profile.userId}
                        userId={userId}
                        loggedInUserDocId={loggedInUserDocId}
                    />
                ))}
            </div>
        </div>
    );
};

export default Suggestions;

Suggestions.prototype = {
    userId: PropTypes.string,
    following: PropTypes.array,
    loggedInUserDocId: PropTypes.string,
};
