import React, { Suspense, lazy } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';
import * as ROUTES from './constants/routes';
import userAuthListener from './hooks/user-auth-listener';
import UserContext from './context/user';

const Login = lazy(() => import('./pages/login'));
const Signup = lazy(() => import('./pages/sign-up'));
const NotFound = lazy(() => import('./pages/not-found'));
const DashBoard = lazy(() => import('./pages/dashboard'));
const Profile = lazy(() => import('./pages/profile'));

function App() {
    const { user } = userAuthListener();
    return (
        <UserContext.Provider value={{ user }}>
            <Router>
                <Suspense fallback={<p>Loading...</p>}>
                    <Routes>
                        <Route
                            path={ROUTES.LOGIN}
                            element={
                                user ? (
                                    <Navigate to={ROUTES.DASHBOARD} />
                                ) : (
                                    <Login />
                                )
                            }
                        />
                        <Route
                            path={ROUTES.SIGN_UP}
                            element={
                                user ? (
                                    <Navigate to={ROUTES.DASHBOARD} />
                                ) : (
                                    <Signup />
                                )
                            }
                        />
                        <Route
                            path={ROUTES.DASHBOARD}
                            element={
                                user ? (
                                    <DashBoard />
                                ) : (
                                    <Navigate to={ROUTES.LOGIN} />
                                )
                            }
                        />
                        <Route path={ROUTES.PROFILE} element={<Profile />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Suspense>
            </Router>
        </UserContext.Provider>
    );
}

export default App;
