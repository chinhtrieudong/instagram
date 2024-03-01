import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import FirebaseContext from '~/context/firebase';
import UserContext from '~/hooks/user';
import * as ROUTES from '~/constants/routes';

const Header = () => {
    const { firebaseApp } = useContext(FirebaseContext);
    const { user } = useContext(UserContext);

    return (
        <header className="h-16 bg-white border-b border-gray-primary mb-8">
            <div className="container mx-auto max-w-screen-lg h-full">
                <div className="flex justify-between h-full">
                    <div className="text-gray-700 text-center flex items-center cursor-pointer">
                        <h1 className="flex justify-center w-full">
                            <Link to={ROUTES.DASHBOARD} aria-label="Instagram logo">
                                <img src="/images/Instagram_logo.svg.png" alt="Instagram" className="mt-2 w-2/12" />
                            </Link>
                        </h1>
                    </div>
                    <div className="text-gray-700 text-center flex items-center align-items">
                        {user ? (
                            <>
                                <>
                                    <Link to={ROUTES.DASHBOARD} aria-label="Dashboard">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="w-8 mr-6 text-black-light cursor-pointer"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                                            />
                                        </svg>
                                    </Link>
                                    <button
                                        type="button"
                                        title="Sign out"
                                        onClick={() => firebaseApp.auth().signOut()}
                                        onKeyDown={(event) => {
                                            if (event.key === 'Enter') {
                                                firebaseApp.auth().signOut();
                                            }
                                        }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="w-8 mr-6 text-black-light cursor-pointer"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                                            />
                                        </svg>
                                    </button>
                                    <div className="flex items-center w-8 h-8 cursor-pointer">
                                        <Link to={`/p/${user.displayName}`}>
                                            <img
                                                className="rounded-full h-8 w-8 flex"
                                                src={`/images/avatars/${user.displayName}.png`}
                                                alt={`${user.displayName} profile`}
                                            />
                                        </Link>
                                    </div>
                                </>
                            </>
                        ) : (
                            <>
                                <Link to={ROUTES.LOGIN}>
                                    <button
                                        type="button"
                                        className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
                                    >
                                        Log In
                                    </button>
                                </Link>
                                <Link to={ROUTES.SIGN_UP}>
                                    <button
                                        type="button"
                                        className="font-bold text-sm rounded text-blue-medium w-20 h-8"
                                    >
                                        Sign Up
                                    </button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
