import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';

const useAdmin = () => {
    const {user,loading} = useAuth();
    const axios = useAxios();

    const {data:isAdmin,isLoading} = useQuery({
        queryKey: ["isAdmin", user?.email],
        enabled : !loading,
        queryFn : async () => {
            const {data} = await axios.get(`/is-admin-check/${user?.email}`);
            return data;
        }
    })


    return {isAdmin,isLoading}
};

export default useAdmin;