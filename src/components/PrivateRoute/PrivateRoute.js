import React from 'react';
import { useContext } from 'react';
import { Navigate, Outlet, useLocation} from 'react-router-dom';
import { UserContext } from './../../App';

const PrivateRoute = () => {
    const [loggedInUser,setLoggedInUser]=useContext(UserContext);
    const location=useLocation();
    return (
        <div>
            {loggedInUser.email?<Outlet/>
            :<Navigate
            to= "/login" state={{from: location}} replace/>}
        </div>
    );
};

export default PrivateRoute;