import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import PostRow from "../../components/tableRows/PostRow";
import useAuth from "../../hooks/useAuth";


const MyPosts = () => {
    const {user} = useAuth();
    const axios = useAxios();
    const {data:myPosts=[]} = useQuery({
        queryKey: ['myPosts', user?.email],
        queryFn: async () => {
            const {data} = await axios.get(`/owner-posts/${user?.email}`);
            return data?.data;
        }
    })
    return (
        <div>
            <div className="mt-5">
                <div className="overflow-x-auto md:w-[70vw] mx-auto">
                <p className="text-xl font-medium text-gray-600 mb-3">My posts</p>
                    <table className="table-auto w-full border-collapse border">
                        <thead>
                            <tr className="bg-gray-200 py-2">
                                <th className="text-left py-2 pl-2">SI</th>
                                <th className="text-left py-2 pl-2">Posts</th>
                                <th className="text-left py-2 pl-2">Votes</th>
                                <th className="text-left py-2 pl-2">Comments</th>
                                <th className="text-left py-2 pl-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                myPosts.length > 0 && myPosts?.map((item,index) => <PostRow key={item?._id} index={index} post={item} /> )
                            }                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyPosts;