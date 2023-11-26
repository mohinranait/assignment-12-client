
import Post from '../items/Post';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useState } from 'react';

const Posts = () => {
    const axiosPublic = useAxiosPublic();
    const [page,setPage] = useState(1)
    const {data:getAllPosts=[]} = useQuery({
        queryKey : ['getAllPosts',page],
        queryFn : async () => {
            const response = await axiosPublic.get(`/posts?page=${page}`);
            return response.data;
        }
    })

    // pagination calculation
    let totalPosts = getAllPosts.total || 0;
    const actualPage = Math.ceil(totalPosts / 5) 
    const totalPages = [...Array(actualPage).keys()];


    const handleCurrentPage = currentPage => {
        setPage(currentPage);
    }

    const handlePrev = () => {
        setPage((page) => page-1)
    }

    const handleNext = () => {
        setPage((page) => page+1)
    }


    return (
        <>
          
                            {
                                 getAllPosts?.data?.map(post => <Post key={post?._id} post={post} />)
                            }
                            <div>
                                <ul className='flex  mt-5 items-center justify-center gap-1'>
                                    
                                    <li><button onClick={handlePrev} className={`px-3 py-1 rounded border inline-block  text-sm font-medium ${ page == 1 ? 'bg-gray-100 text-gray-300':'bg-gray-100 text-gray-600' } `} disabled={ page == 1  }> Prev </button></li>
                                    
                                   
                                    {
                                        totalPages?.map((item) => <li key={item} ><button onClick={() => handleCurrentPage(item)} className={`px-3 py-1 rounded border inline-block  text-sm font-medium ${page-1 == item ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'} `}>{++item}</button></li> )
                                    }
                                    
                                    <li><button onClick={handleNext} className={`px-3 py-1 rounded border inline-block text-sm font-medium ${page == totalPages.length ? 'bg-gray-100 text-gray-300' : 'bg-gray-100 text-gray-600' }`} disabled={page == totalPages.length}> Next </button></li>
                                    
                                  
                                </ul>
                            </div>
            
        </>
    );
};

export default Posts;