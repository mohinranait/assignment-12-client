import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const usePosts = () => {
    const axiosPublic = useAxiosPublic();
    const {data:getAllPosts=[]} = useQuery({
        queryKey : ['getAllPosts'],
        queryFn : async () => {
            const response = await axiosPublic.get('/posts');
            console.log(response);
            return response.data.data;
        }
    })
    return [getAllPosts]
};

export default usePosts;