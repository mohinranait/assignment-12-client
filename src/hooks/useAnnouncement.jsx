
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useAnnouncement = () => {

    const axiosPublic = useAxiosPublic();
    const {data:announcements=[]} = useQuery({
        queryKey: ['announcements'],
        queryFn : async () => {
            const {data} = await axiosPublic.get('/all-announcements');
            return data;
        }
    })

    return [announcements]
};

export default useAnnouncement;