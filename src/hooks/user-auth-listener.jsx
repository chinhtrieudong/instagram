/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useEffect, useState } from 'react';
import FirebaseContext from '~/context/firebase';

const userAuthListener = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')));
    const { firebaseApp } = useContext(FirebaseContext);

    useEffect(() => {
        const listener = firebaseApp.auth().onAuthStateChanged((authUser) => {
            if (authUser) {
                // store the user in localstorage
                localStorage.setItem('authUser', JSON.stringify(authUser));
                setUser(authUser);
            } else {
                localStorage.removeItem('authUser');
                setUser(null);
            }
        });
        return () => listener();
    }, [firebaseApp]);
    return { user };
};

export default userAuthListener;
