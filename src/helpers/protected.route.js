import React from 'react';
import PropTypes from 'prop-types';
import { Navigate, Route } from 'react-router-dom';
import * as ROUTES from '~/constants/routes';

const ProtectedRoute = ({ user, children, ...rest }) => {
    return (
        <Route
            {...rest}
            element={
                user ? (
                    children
                ) : (
                    <Navigate
                        to={{
                            pathname: ROUTES.LOGIN,
                            state: { from: rest.location },
                        }}
                    />
                )
            }
        />
    );
};

ProtectedRoute.propTypes = {
    user: PropTypes.object,
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
