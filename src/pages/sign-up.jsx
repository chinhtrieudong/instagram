import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FirebaseContext from '~/context/firebase';
import * as ROUTERS from '~/constants/routes';
import { doesUsernameExist } from '~/services/firebase';

const Signup = () => {
    const navigation = useNavigate();

    const { firebaseApp } = useContext(FirebaseContext);

    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');

    const [emailAddress, setEmailAdress] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const isInvalid = password === '' || emailAddress === '';

    var handleSignup = async (event) => {
        event.preventDefault();

        const usernameExists = await doesUsernameExist(username);

        if (!usernameExists.length) {
            try {
                const createdUserResult = await firebaseApp
                    .auth()
                    .createUserWithEmailAndPassword(emailAddress, password);

                // authentication
                await createdUserResult.user.updateProfile({
                    displayName: username,
                });

                //firebase user collection
                await firebaseApp.firestore().collection('users').add({
                    userId: createdUserResult.user.uid,
                    username: username.toLowerCase(),
                    fullName,
                    emailAddress: emailAddress.toLowerCase(),
                    followers: [],
                    following: [],
                    dateCreated: Date.now(),
                });

                navigation(ROUTERS.DASHBOARD);
            } catch (error) {
                setFullName('');
                setUsername('');
                setEmailAdress('');
                setPassword('');
                setError(error.message);
            }
        } else {
            setError('That username is already taken, please try another.');
        }
    };

    useEffect(() => {
        document.title = 'Sign Up - Instagram';
    }, []);

    return (
        <div className="container flex mx-auto max-w-screen-md items-center h-screen ">
            <div className="flex w-3/5">
                <img
                    src="./instagram/images/iphone-with-profile.jpg"
                    alt="iphone with instagram"
                />
            </div>
            <div className="flex flex-col w-2/5">
                <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
                    <h1 className="flex justify-center w-full">
                        <img
                            src="./instagram/images/Instagram_logo.svg.png"
                            alt="Instagram"
                            className="mt-2 w-6/12 mb-4"
                        />
                    </h1>
                    {error && (
                        <p className="mb-4 text-xs text-red-primary">{error}</p>
                    )}
                    <form onSubmit={handleSignup} method="POST">
                        <input
                            aria-label="Enter your userName"
                            type="text"
                            placeholder="Username"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 outline-none border border-gray-primary rounded mb-2"
                            onChange={({ target }) => setUsername(target.value)}
                            value={username}
                        />
                        <input
                            aria-label="Enter your full name"
                            type="text"
                            placeholder="Full name"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 outline-none border border-gray-primary rounded mb-2"
                            onChange={({ target }) => setFullName(target.value)}
                            value={fullName}
                        />
                        <input
                            aria-label="Enter your email address"
                            type="text"
                            placeholder="Email address"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 outline-none border border-gray-primary rounded mb-2"
                            onChange={({ target }) =>
                                setEmailAdress(target.value)
                            }
                            value={emailAddress}
                        />
                        <input
                            aria-label="Enter your password "
                            type="password"
                            placeholder="Password"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 outline-none border border-gray-primary rounded mb-2"
                            onChange={({ target }) => setPassword(target.value)}
                            value={password}
                        />
                        <button
                            disabled={isInvalid}
                            type="submit"
                            className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${isInvalid && 'opacity-50'}`}
                        >
                            Sign Up
                        </button>
                    </form>
                </div>
                <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary rounded">
                    <p className="text-sm">
                        Have an account?{` `}
                        <Link
                            to={ROUTERS.LOGIN}
                            className="font-bold text-blue-medium"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

Signup.propTypes = {};

export default Signup;
