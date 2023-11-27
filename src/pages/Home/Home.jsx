
import HomeBanner from "../../components/sections/HomeBanner";
import Posts from "../../components/sections/Posts";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Anouncements from "../../components/anouncements/Anouncements";
import { useState } from "react";
import useAnnouncement from "../../hooks/useAnnouncement";


const Home = () => {
    const axiosPublic = useAxiosPublic();
    const [page,setPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [announcements] = useAnnouncement();


    const {data:getAllTags} = useQuery({
        queryKey: ['getAll-tags'],
        queryFn : async () => {
            const {data} = await axiosPublic.get('/get-all-tags');
            return data;
        }
    })

    
    const {data:getAllPosts=[]} = useQuery({
        queryKey : ['getAllPosts',page,searchValue],
        queryFn : async () => {
            const response = await axiosPublic.get(`/posts?page=${page}&search=${searchValue}`);
            return response.data;
        }
    })

   
    return (
        <>
            <HomeBanner searchValue={searchValue} setSearchValue={setSearchValue} />  
            <section className="py-3 bg-white shadow-sm">
                <div className="container px-5 md:px-0">
                    <ul className=" flex items-center justify-center flex-wrap gap-2 ">
                        {
                            getAllTags?.map(item => <li key={item?._id} className="bg-gray-50  rounded-3xl overflow-hidden hover:bg-gray-200 cursor-pointer px-3 py-2">
                                <p onClick={() => setSearchValue(item?.tag)} className="text-gray-500 text-xs ">#{item?.tag}</p>
                            </li> )
                        }
                    </ul>
                </div>
            </section>

            {
                announcements.length > 0 &&  <section className="mt-10">
                <div className="container px-5 md:px-0">
                    <div className="flex justify-center flex-wrap gap-4">
                        {
                            announcements?.map(item =>  <div key={item?._id} className="p-3 flex gap-1 bg-white rounded-3xl">
                            <img className="h-8 rounded-full w-8" src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                            <div>
                                <p className="text-sm text-gray-500">{item?.title}</p>
                                <p className="text-[13px] text-gray-400">{item?.description}</p>
                            </div>
                        </div> )
                        }
                       
                    </div>
                </div>
            </section>
            }
           

            <section className='my-10'>
                <div className="container px-4 md:px-0">
                    <div className='grid lg:grid-cols-3  gap-7'>
                        <div className='col-span-2 grid grid-cols-1 gap-7'>
                            <Posts getAllPosts={getAllPosts} page={page} setPage={setPage} /> 
                        </div>
                        <div>
                            <div className="grid gap-7">
                                <Anouncements />
                                <div className="bg-white py-5 px-4 shadow-sm border border-gray-100">
                                    <p className="text-xl font-medium text-gray-500 mb-4">Search tag</p>
                                    <ul className=" flex gap-2 ">
                                        {
                                            getAllTags?.map(item => <li key={item?._id} className="bg-gray-50  rounded-3xl overflow-hidden hover:bg-gray-200 cursor-pointer px-3 py-2">
                                                <p className="text-gray-500 text-xs ">#{item?.tag}</p>
                                            </li> )
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
            </section>  
            
         
        </>
    );
};

export default Home;