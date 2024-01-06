import { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Post from "../../components/items/Post";


const Profile = () => {
    const axiosPublic = useAxiosPublic();
    const user = useLoaderData();
    const [posts, setPosts] = useState([]);


    useEffect(() => {
        const getAllPosts = async () => {
            const res = await axiosPublic.get(`/userwish-posts/${user?.email}`)
            setPosts(res?.data?.data);
        };
        getAllPosts();
    },[])
    return (
        <div>
            <div className="container mt-3 min-h-screen">
                <div className="grid grid-cols-4 gap-6">
                    <div>
                        <div className="border rounded py-4">
                            <div>
                                <img className="w-[120px] mx-auto h-[120px] rounded-full border border-gray-200 p-1" src={  user?.avater ? user?.avater : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuC4jWzreRhoEnnxA9XUGbDawbk-1z2UEOhi9ZQw7p3Q&s"} alt="" />
                            </div>
                            <div className="py-2">
                                <p className="text-2xl text-center font-semibold">{user?.name}</p>
                             
                            </div>
                            <div className="flex justify-center gap-5">
                                <span className="py-1 px-3 text-sm bg-gray-100 rounded">Followrs (214) </span>
                                <span className="py-1 px-3 text-sm bg-gray-100 rounded">Folloing (10)</span>
                            </div>
                        </div>
                        <div className="mt-5">
                            <ul className="space-y-1">
                                <div className="mb-4">
                                    <p className="text-base font-semibold text-gray-600">Bio</p>
                                    <p className="text-sm font-normal text-gray-500">{user?.bio ? user?.bio : 'User bio is empty'}</p>
                                </div>
                                <li><span className="text-sm font-medium text-gray-600">Email:</span> <span className="text-sm font-normal text-gray-600">{user?.email}</span> </li>
                                <li><span className="text-sm font-medium text-gray-600">Address:</span> <span className="text-sm font-normal text-gray-600">{user?.address ? user?.address : '-/-'} </span> </li>
                                <li><span className="text-sm font-medium text-gray-600">Total posts:</span> <span className="text-sm font-normal text-gray-600">{posts?.length || 0} posts</span> </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-span-3">
                        <div>
                            <p className="text-3xl font-bold text-gray-600 mb-4">Your psots</p>                            
                         
                            <div className="space-y-4">
                                {
                                    posts?.map(post => <Post key={post?._id} post={post} /> )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;