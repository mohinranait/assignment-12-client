

import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import PostRow from "../../components/tableRows/PostRow";
import Loader from "../../components/Loader/Loader";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";



const MyProfile = () => {
    const axios = useAxios();
    const {user} = useAuth();
    const [getUser,setGetUser] = useState({})


    const {data:lastDatas=[], isLoading} = useQuery({
        queryKey: ['lastDatas'],
        queryFn: async () => {
            const {data} = await axios.get(`/owner-posts-desc/${user?.email}`);
            return data?.data;
        }
    })

    useEffect(() => {
        const fetchUser = async () => {
            const {data} = await axios.get(`/user/${user?.email}`);
            setGetUser(data) ;
        }
        fetchUser();
    },[user?.email,axios])

    if(isLoading){
        return <Loader />
    }
    return (
       <div className="mb-10">
            <div className="">
                <div className="w-full md:max-w-lg mb-5 mx-auto bg-white border border-gray-50 rounded-lg shadow-sm ">
                    <div className="flex relative justify-end px-4 pt-4">
                        <button id="dropdownButton" data-dropdown-toggle="dropdown" className="inline-block text-gray-500  hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
                            <span className="sr-only">Open dropdown</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                                <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                            </svg>
                        </button>
                        {/* <!-- Dropdown menu --> */}
                        <div id="dropdown" className="z-10 hidden top-full right-0 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 ">
                            <ul className="py-2" aria-labelledby="dropdownButton">
                            <li>
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ">Edit</a>
                            </li>
                            <li>
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ">Export Data</a>
                            </li>
                            <li>
                                <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 ">Delete</a>
                            </li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex flex-col items-center pb-10">
                        <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={user?.photoURL} alt="Bonnie image"/>
                        <h5 className="mb-1 text-xl font-medium text-gray-900 flex gap-2 items-center ">{user?.displayName}   <Link to={`/dashboard/update-profile/${user?.email}`} ><CiEdit /></Link> </h5>
                        <span className="text-sm text-gray-500 ">{user?.email}</span>
                        <div className="flex mt-2 md:mt-6">
                            {
                                getUser?.badge == 'bronze' ?   
                                <button className=" items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-gray-100 border flex gap-1 rounded-lg  ms-3"> <img src="https://static.vecteezy.com/system/resources/thumbnails/015/730/440/small/luxury-silver-medal-png.png" className="w-5" alt="" /> Bronze</button>
                                :
                                <div className="inline-flex px-5 py-2 rounded items-center bg-green-50 text-gray-600 text-sm font-medium text-center  "> <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ77MLSpVDEx2-IRw-_2a1ja0UXdz33FcYKNG4HNwy2ntSW-YZnUT_2C9jqb8mFx2Vmqh0&usqp=CAU" className="w-5 " alt="" /> Gold</div>
                            }
                          
                          
                          
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto min-w-[700px] md:w-[70vw] mx-auto">
                    <p className="text-xl font-medium text-gray-600 mb-3">Recent posts</p>
                    <table className="table-auto w-full border-collapse border">
                        <thead>
                            <tr className="bg-gray-200 py-2">
                                <th className="text-left py-2 pl-2">SI</th>
                                <th className="text-left py-2 pl-2">Posts</th>
                                <th className="text-left py-2 pl-2">Votes</th>
                                <th className="text-left py-2 pl-2">Comments</th>
                                <th className="text-left py-2 pl-2">Visibility</th>
                                <th className="text-left py-2 pl-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                lastDatas.length > 0 && lastDatas?.slice(0,3)?.map((item,index) => <PostRow key={item?._id} index={index} post={item} /> ) 
                            }                            
                        </tbody>

                    </table>
                    <div>
                        {lastDatas.length == 0 && <div className="text-center bg-blue-50 text-blue-600 font-medium py-2 mt-4 rounded ">No Data</div> }
                    </div>
                </div>
            </div>
       </div>
    );
};

export default MyProfile;