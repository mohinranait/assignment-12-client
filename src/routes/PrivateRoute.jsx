/* eslint-disable react/prop-types */
import useAuth from '../hooks/useAuth';
import Loader from '../components/Loader/Loader';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth();
    const location = useLocation();
    if(loading){
        return <Loader />
    }

    if(user?.email){
        return children
    }
    return <Navigate to={'/login'} state={location?.pathname} replace={true} />
};

export default PrivateRoute;