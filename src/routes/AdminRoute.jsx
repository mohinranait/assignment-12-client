/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";


const AdminRoute = ({children}) => {
    const {user,loading} = useAuth();
    const {isAdmin,isLoading} = useAdmin();

    if(loading || isLoading ){
        return <Loader />
    }

    if( user?.email && isAdmin){
        return children;
    }


    return <Navigate to={'/'} replace={true} />
};

export default AdminRoute;