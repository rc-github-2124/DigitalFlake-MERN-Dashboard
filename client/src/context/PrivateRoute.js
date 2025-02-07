import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './Authcontext';

const PrivateRoute = ({ element }) => {
    const { user } = useAuth();

    if (!user) {
        // Redirect to login page if not logged in
        return <Navigate to="/" />;
    }

    return element;
};

export default PrivateRoute;
