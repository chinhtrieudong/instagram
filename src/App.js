import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import userAuthListener from './hooks/user-auth-listener';
import UserContext from './hooks/user';

const Login = lazy(() => import('./pages/login'));
const Signup = lazy(() => import('./pages/sign-up'));
const NotFound = lazy(() => import('./pages/not-found'));
const DashBoard = lazy(() => import('./pages/dashboard'));

function App() {
    const { user } = userAuthListener();
    return (
        <UserContext.Provider value={{ user }}>
            <Router>
                <Suspense fallback={<p>Loading...</p>}>
                    <Routes>
                        <Route path={ROUTES.LOGIN} element={<Login />} />
                        <Route path={ROUTES.SIGN_UP} element={<Signup />} />
                        <Route path={ROUTES.DASHBOARD} element={<DashBoard />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Suspense>
            </Router>
        </UserContext.Provider>
    );
}

export default App;
