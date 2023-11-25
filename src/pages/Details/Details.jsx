import { useParams } from "react-router-dom";
import { FaClock, FaCommentAlt,  FaShare,  FaThumbsDown, FaThumbsUp } from 'react-icons/fa';

import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";



const Details = () => {
    const axios = useAxios();
    const {user} = useAuth();
    const queryClient = useQueryClient();
    const {id:paramsId} = useParams();

    const {data:getPost} = useQuery({
        queryKey: ['singlePosts'],
        queryFn: async () => {
            const {data} = await axios.get(`/posts/${paramsId}`);
            return data;
        }
    })
    const {title, authorImage,description, tag,createAt,upVote,authorName, downVote,_id} = getPost || {};
    let options = {  day: 'numeric', month: 'long', year: 'numeric' };


    const {mutate:updateVoteCounter} = useMutation({
        mutationFn: async ( postData) => {
            const id = postData?._id;
            const data = postData?.data;
            await axios.post(`/post-votes/${id}`, data )
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['singlePosts'])
        }
    })
   

    // handle vote increment for unique user and post
    const handleVote = async (value) => {
        const data = {value, upVote, downVote, userEmail:user?.email}
        updateVoteCounter( {_id, data})
    }
 
    return (
        <section className='my-16'>
            <div className="container px-4 md:px-0">
                <div className='grid lg:grid-cols-3  gap-5'>
                    <div className='col-span-2 grid grid-cols-1 gap-7'>
                        <div className='border shadow-sm bg-white'>
                            <div className='flex gap-5 py-5 px-5'>
                                <div className=''>
                                    <span className='w-20 h-20 inline-block'>
                                        <img className='w-16 h-16 rounded-full mx-auto' src={ authorImage ? authorImage : "https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_640.png"} alt="" />
                                        <p className="text-center mt-2 text-gray-500">{authorName}</p>
                                    </span>
                                </div>
                                <div className="w-full">
                                    <p className='text-lg text-gray-600 font-medium'> {title} </p>
                                    <p className='text-sm text-[#3c78cd] mb-3'># {tag}</p>
                                    <hr className='pb-3'/>
                                    <p className='text-[15px] leading-6 text-gray-500 font-normal'>{description}</p>
                                </div>
                            </div>
                            <hr />
                            <div className='py-1'>
                                <div className='flex px-5 gap-6'>
                                    <div className=''>
                                        <span className='w-10 h-10 inline-block'></span>
                                    </div>
                                    <div className='flex items-center justify-between gap-4 w-full'>
                                        <div className='flex items-center gap-4'>
                                            <span onClick={() => handleVote('upvote')} className='flex gap-1 items-center text-[#1abc9c] cursor-pointer'> <FaThumbsUp /><span className='text-sm'>{upVote}</span></span>
                                            <span onClick={() => handleVote('downvote')} className='flex gap-1 items-center text-[#db7a7a] cursor-pointer'><FaThumbsDown /><span className='text-sm'>{downVote}</span></span>
                                            <span className='flex gap-1 items-center text-gray-400'><FaCommentAlt /><span className='text-sm'>10</span></span>
                                            <span className='flex gap-1 items-center text-gray-400'><FaClock /><span className='text-xs text-gray-500'>Posted on : {new Date(createAt).toLocaleDateString('en-US', options )} </span></span>
                                        
                                        </div>
                                        <div className='flex items-center gap-4'>
                                            <span className='flex gap-1 items-center text-gray-400'><FaShare />  <span className='text-sm'>Share</span></span>
                                        
                                        </div>
                                    </div>
                                </div>
                            
                            </div>
                        </div>
                    </div>
                    <div>

                    </div>
                </div> 
            </div>
        </section>  
    );
};

export default Details;