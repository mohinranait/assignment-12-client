/* eslint-disable react/prop-types */

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";


const HomeBanner = ({setSearchValue,searchValue}) => {
    const axiosPublic = useAxiosPublic();

    const {data:userSearchTAgs, refetch} = useQuery({
        queryKey: ['userSearchTags'],
        queryFn : async () => {
            const {data} = await axiosPublic.get("/get-search-tag");
            return data;
        }
    })

    const handleSearch = async e => {
        e.preventDefault();
        const search = e.target.search.value;
        setSearchValue(search)

        try {
            await axiosPublic.post('/create-search-tag', {searchTag:search})
            refetch()
        } catch (error) {
            console.log('');
        }
      
    }
    return (
        <>
            <div className="bg-cover bg-center relative" style={{backgroundImage:`url('https://aardvark.ghostpool.com/original/wp-content/uploads/sites/6/2017/11/membership-circles.png')`}}>
                <div className="bg-black bg-opacity-80 absolute w-full h-full left-0 top-0"></div>
                <div className="container z-50 relative">
                    <div className=' h-[40vh] md:h-[60vh] flex items-center justify-center'>
                        <div className="lg:w-[50vw] flex flex-col gap-12">
                            <div>
                                <h1 className="text-center text-3xl md:4xl lg:text-6xl font-bold text-white">Online  <span className="text-blue-500 py-2 px-2 rounded-md ">conversation</span>  <br /> group <span className="border-b-2 border-blue-600">people</span></h1>
                            </div>
                            <div className="flex flex-col gap-2 px-4 md:px-0"> 
                                <form onSubmit={handleSearch} className="flex rounded-3xl">
                                    <input type="search" name="search"   defaultValue={searchValue} className="w-full py-3 px-3 outline-blue-600 rounded-l-3xl" placeholder="Search" />
                                    <button className="bg-blue-600 text-white px-5 text-sm font-semibold rounded-r-3xl">Search</button>
                                </form>
                                <div className="flex gap-1">
                                    {userSearchTAgs?.map((item,index) =>  <span onClick={() => setSearchValue(item?.searchTag)} key={index} className="px-4 inline-block rounded-2xl cursor-pointer bg-blue-600 text-xs font-medium py-[6px]  text-white">{item?.searchTag}</span>  )}
                                
                                </div>
                            </div>
                        </div>
                    </div>
                </div>    
            </div>   
        </>
    );
};

export default HomeBanner;