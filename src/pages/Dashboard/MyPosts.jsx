import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import PostRow from "../../components/tableRows/PostRow";


const MyPosts = () => {
    const axios = useAxios();
    const {data:myPosts=[]} = useQuery({
        queryKey: ['myPosts'],
        queryFn: async () => {
            const {data} = await axios.get("/posts");
            return data?.data;
        }
    })
    return (
        <div>
            <div>
                <div>
                    <table className="table-auto w-full border-collapse border">
                        <thead>
                            <tr className="bg-gray-200 py-2">
                                <th className="text-left py-2 pl-2">SI</th>
                                <th className="text-left py-2 pl-2">Posts</th>
                                <th className="text-left py-2 pl-2">Tag</th>
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