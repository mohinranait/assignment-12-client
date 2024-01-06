import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import { IoCartOutline,   IoTrendingDownOutline, IoTrendingUp } from 'react-icons/io5';
import CreateTag from "../../components/forms/CreateTag";
import { FaInbox,  FaUser } from "react-icons/fa";
import PichartsJs from "../../components/Chart/PichartsJs";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";

const AdminProfile = () => {

    const axios = useAxios();
    const {user} = useAuth();
    const [getUser,setGetUser] = useState({})
    const [analitics, setAnalitics] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            const {data} = await axios.get(`/user/${user?.email}`);
            setGetUser(data) ;
            const res = await axios.get('/admin-analitics');
            setAnalitics(res.data);
        }
        fetchUser();
    },[user?.email,axios])


  

    return (
        <div className="mb-10">
              <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                <div className='p-5 border group relative border-gray-200 overflow-hidden bg-gradient-to-br to-[#863ee2] from-[#571f9e] flex gap-4 rounded'>
                    <div className=''>
                        <div>
                            <span className='bg-purple-50  rounded'>
                                <div className='bg-gradient-to-br  to-[#863ee2] from-[#571f9e]  flex items-center justify-center rounded text-white'>
                                    <IoCartOutline className='text-5xl'></IoCartOutline>
                                </div>
                            </span>
                        </div>
                    </div>
                    <div className=''>
                        <p className='text-sm text-white font-normal'>Total Posts</p>
                        <p className='text-2xl text-white font-semibold'>{analitics?.posts}</p>
                        <p className='text-xs text-gray-100'>Increased by <span className='text-green-500'>+12.2%</span> </p>
                    </div>
                    <span className='absolute right-0 bottom-0 z-10 inline-block'>
                        <IoTrendingUp className='text-8xl scale-50 group-hover:scale-90 transition-all text-[#571f9e] duration-300'></IoTrendingUp>
                    </span>
                    <span className='absolute -right-8 -bottom-8 inline-block  bg-opacity-50 w-[160px] rounded-full  h-[160px]'></span>
                </div>
                <div className='p-5 border group relative border-gray-200 overflow-hidden bg-gradient-to-br to-[#ff9cc3] from-[#fd3484] flex gap-4 rounded'>
                    <div className=''>
                        <div>
                            <span className='bg-purple-50  rounded'>
                                <div className=' bg-gradient-to-br to-[#ff9cc3] from-[#fd3484]  flex items-center justify-center rounded text-white'>
                                    <FaInbox className='text-5xl'></FaInbox>
                                </div>
                            </span>
                        </div>
                    </div>
                    <div className=''>
                        <p className='text-sm text-white font-normal'>Total Comments</p>
                        <p className='text-2xl text-white font-semibold'>{analitics?.comments}</p>
                        <p className='text-xs text-gray-100'>Decreased by <span className='text-green-500'>+12.2%</span> </p>
                    </div>
                    <span className='absolute right-0 bottom-0 z-10 inline-block'>
                        <IoTrendingDownOutline className='text-8xl scale-50 group-hover:scale-90 transition-all text-[#fd3484] duration-300'></IoTrendingDownOutline>
                    </span>
                    <span className='absolute -right-8 -bottom-8 inline-block  bg-opacity-50 w-[160px] rounded-full  h-[160px]'></span>
                </div>
                <div className='p-5 border group relative border-gray-200 overflow-hidden bg-gradient-to-br to-[#00d2d7] from-[#07b2dd] flex gap-4 rounded'>
                    <div className=''>
                        <div>
                            <span className='bg-purple-50  rounded'>
                                <div className='bg-gradient-to-br to-[#00d2d7] from-[#07b2dd]  flex items-center justify-center rounded text-white'>
                                    <FaUser className='text-5xl'></FaUser>
                                </div>
                            </span>
                        </div>
                    </div>
                    <div className=''>
                        <p className='text-sm text-white font-normal'>Total users</p>
                        <p className='text-2xl text-white font-semibold'>{analitics?.users}</p>
                        <p className='text-xs text-gray-100'>Increased by <span className='text-gray-800'>+12.2%</span> </p>
                    </div>
                    <span className='absolute right-0 bottom-2 z-10 inline-block'>
                        <IoTrendingUp className='text-8xl scale-50 group-hover:scale-90 transition-all text-[#07b2dd] duration-300'></IoTrendingUp>
                    </span>
                    <span className='absolute -right-8 -bottom-8 inline-block  bg-opacity-50 w-[160px] rounded-full  h-[160px]'></span>
                </div>
            </div>
            {/* seciotn */}
            <div className="grid grid-cols-3 gap-5 mt-5">
                <div className="w-full col-span-3 md:col-span-2  mb-5  bg-white border border-gray-50 rounded-lg shadow-sm ">
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
                        <h5 className="mb-1 text-xl font-medium text-gray-900 flex gap-2 ">{getUser?.name}  <Link to={`/dashboard/update-profile/${user?.email}`} ><CiEdit /></Link> </h5>
                        <span className="text-sm text-gray-500 ">{getUser?.email} <span className="text-[10px] px-2 bg-green-100 text-green-500 py-[2px] rounded">Admin</span> </span>
                        
                    </div>
                </div>
                <div className="col-span-3 md:col-span-1 ">
                   <CreateTag />
                </div>

            </div>
            <div className="lg:w-[40vw] mt-7 mx-auto flex items-center justify-center">
                <PichartsJs analitics={analitics} />
            </div>
   </div>
    );
};

export default AdminProfile;