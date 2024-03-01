import { useContext, useEffect, useState } from 'react';
import UserContext from './user';
import { getUserByUserId } from '~/services/firebase';

export default function useUser() {
    const [activeUser, setActiveUser] = useState({});
    const { user } = useContext(UserContext);

    useEffect(() => {
        async function getUserOjbByUserId() {
            const [response] = await getUserByUserId(user.uid);
            setActiveUser(response);
        }
        if (user?.uid) {
            getUserOjbByUserId();
        }
    }, [user]);

    return { user: activeUser };
}