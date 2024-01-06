import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Post from "../../components/items/Post";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import UserCard from "../../components/userCart/UserCard";


const Profile = () => {
    const axiosPublic = useAxiosPublic();
    const [isTab, setIsTab] = useState('posts')
    const user = useLoaderData();
    const [posts, setPosts] = useState([]);
    const {user:authUser} = useAuth();
    const axios = useAxios();
    const navigate = useNavigate();
    const [authFromDb, setAuthFromDb] = useState({});
    const [folloing, setFolloing] = useState(false);
    const [followers, setFollowers] = useState([]);
    const [folloings, setFolloings] = useState([]);

    // handle tab
    const handleTabRendering = async (value) => {

        setIsTab(value)
        // if(value === 'followers'){
           
        //     console.log(data);
        // }
        console.log(value);
    } 

    const handleFollow = async (id) => {
        if(!authUser?.email){
            navigate('/login')
            return;
        }
        try {
            const prevFolloing = authFromDb?.following;
            const prevFollowers = user?.followers;
   
            const folloingObj  = {
                following: [...prevFolloing, id]
            }
            const followersObj  = {
                followers: [...prevFollowers, authFromDb?._id]
            }
            const {data} = await axios.patch(`/user/${authUser?.email}`, folloingObj);
           
            await axios.patch(`/user/${user?.email}`, followersObj);
            if(data?._id){
                setFolloing(true)
            }
        } catch (error) {
            console.log(error);
        }
        console.log(id);
    }

    useEffect(() => {
        const getAllPosts = async () => {
            const res = await axiosPublic.get(`/userwish-posts/${user?.email}`)
            setPosts(res?.data?.data);
        };
        getAllPosts();
    },[user])

    useEffect(() => {
        const getAuthUser = async () => {
            setFollowers([])
            const getUser = await axios.get(`/single-user/${authUser?.email}`);
            const find = getUser.data?.following?.find( item => item == user?._id )
            if(find){
                setFolloing(true)
            }
            setAuthFromDb(getUser.data);
        };
        if(authUser?.email) getAuthUser();
    },[authUser,user])

    useEffect(() => {
        const getFollowers = async () => {
            const {data} = await axios.get(`/my-followers/${user?._id}`)
            setFollowers(data);
        }
        if(user?._id) getFollowers()
    },[user])

    useEffect(() => {
        const getFolloings = async () => {
            const {data} = await axios.get(`/my-folloings/${user?._id}`)
            setFolloings(data);
        }
        if(user?._id) getFolloings()
    },[user])
    return (
        <div>
            <div className="container px-5 md:px-0 mt-3 min-h-screen">
                <div className="md:grid grid-cols-4 gap-6">
                    <div>
                        <div className="border rounded py-4">
                            <div>
                                <img className="w-[120px] mx-auto h-[120px] rounded-full border border-gray-200 p-1" src={  user?.avater ? user?.avater : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuC4jWzreRhoEnnxA9XUGbDawbk-1z2UEOhi9ZQw7p3Q&s"} alt="" />
                            </div>
                            <div className="py-2">
                                <p className="text-2xl text-center font-semibold">{user?.name}</p>
                             
                            </div>
                            <div className="flex justify-center gap-5">
                                <span className="py-1 px-3 text-sm bg-gray-100 rounded">Followrs ({user?.followers?.length || 0}) </span>
                                <button disabled={folloing } onClick={() => handleFollow(user?._id)} className={`cursor-pointer py-1 px-3 text-sm  rounded ${folloing ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'} `}> {folloing ? 'Following':'Follow'}  { authFromDb?._id == user?._id &&  user?.following?.length  } </button>
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
                            <div className="flex gap-2 items-center mb-3">
                                <button onClick={() => handleTabRendering('posts')} className={`px-2 py-1 rounded text-sm  ${isTab == 'posts' ? 'bg-blue-600 text-white ': 'bg-gray-100 text-gray-600'} `}>Posts</button>
                                <button onClick={() => handleTabRendering('followers')} className={`px-2 py-1 rounded text-sm  ${isTab == 'followers' ? 'bg-blue-600 text-white ': 'bg-gray-100 text-gray-600'} `}>Followers</button>
                                <button onClick={() => handleTabRendering('folloing')} className={`px-2 py-1 rounded text-sm  ${isTab == 'folloing' ? 'bg-blue-600 text-white ': 'bg-gray-100 text-gray-600'} `}>Folloing</button>
                              
                            </div>
                            <p className="text-3xl font-bold text-gray-600 mb-4 capitalize">{isTab}</p>                            
                         
                            <div className="space-y-4">
                                {
                                    isTab == 'posts' ? 
                                    posts?.map(post => <Post key={post?._id} post={post} /> ) :
                                    isTab == 'followers' ? 
                                    followers?.map(user => <UserCard key={user?._id} user={user} /> )
                                    :
                                    isTab == 'folloing' ? 
                                    folloings?.map(user => <UserCard key={user?._id} user={user} /> )
                                    : <></>
                                }
                                {
                                   
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