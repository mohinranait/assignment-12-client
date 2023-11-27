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
                <div className="bg-black bg-opacity-50 absolute w-full h-full left-0 top-0"></div>
                <div className="container z-50 relative">
                    <div className=' h-[40vh] md:h-[60vh] flex items-center justify-center'>
                        <div className="lg:w-[50vw] flex flex-col gap-12">
                            <div>
                                <h1 className="text-center text-3xl md:4xl lg:text-6xl font-bold text-white">Online  convercation  <br /> group people</h1>
                            </div>
                            <div className="flex flex-col gap-2 px-4 md:px-0"> 
                                <form onSubmit={handleSearch} className="flex rounded">
                                    <input type="search" name="search"   defaultValue={searchValue} className="w-full py-3 px-3 rounded-l" placeholder="Search" />
                                    <button className="bg-purple-500 text-white px-5 text-sm font-semibold rounded-r">Search</button>
                                </form>
                                <div className="flex gap-1">
                                    {userSearchTAgs?.map((item,index) =>  <span onClick={() => setSearchValue(item?.searchTag)} key={index} className="px-3 inline-block rounded-xl bg-purple-500 text-xs font-medium py-1  text-white">{item?.searchTag}</span>  )}
                                
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