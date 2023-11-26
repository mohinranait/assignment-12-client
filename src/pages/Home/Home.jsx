
import HomeBanner from "../../components/sections/HomeBanner";
import Posts from "../../components/sections/Posts";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Anouncements from "../../components/anouncements/Anouncements";


const Home = () => {
    const axiosPublic = useAxiosPublic();

    const {data:getAllTags} = useQuery({
        queryKey: ['getAll-tags'],
        queryFn : async () => {
            const {data} = await axiosPublic.get('/get-all-tags');
            return data;
        }
    })

   
    return (
        <>
            <HomeBanner />  
            <section className="py-3 bg-white shadow-sm">
                <div className="container px-5 md:px-0">
                    <ul className=" flex items-center justify-center flex-wrap gap-2 ">
                        {
                            getAllTags?.map(item => <li key={item?._id} className="bg-gray-50  rounded-3xl overflow-hidden hover:bg-gray-200 cursor-pointer px-3 py-2">
                                <p className="text-gray-500 text-xs ">#{item?.tag}</p>
                            </li> )
                        }
                    </ul>
                </div>
            </section>

            <section className='my-16'>
                <div className="container px-4 md:px-0">
                    <div className='grid lg:grid-cols-3  gap-7'>
                        <div className='col-span-2 grid grid-cols-1 gap-7'>
                            <Posts /> 
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