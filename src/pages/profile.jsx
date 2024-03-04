import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getUserByUsername } from '~/services/firebase';
import * as ROUTES from '~/constants/routes';
import Header from '~/components/Header';
import UserProfile from '~/components/Profile';

const Profile = () => {
    const { username } = useParams();
    const [user, setUser] = useState(null);
    const navigation = useNavigate();

    useEffect(() => {
        async function checkUserExists() {
            const user = await getUserByUsername(username);
            if (user.length > 0) {
                setUser(user[0]);
            } else {
                navigation(ROUTES.NOT_FOUND);
            }
        }

        checkUserExists();
    }, [username, navigation]);
    return user?.username ? (
        <div className="bg-gray-background">
            <Header />
            <div className="mx-auto max-w-screen-lg">
                <UserProfile user={user} />
            </div>
        </div>
    ) : null;
};

Profile.propTypes = {};

export default Profile;
