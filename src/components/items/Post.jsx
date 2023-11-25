
import { FaClock, FaComment, FaCommentAlt, FaHandPointDown, FaHandPointUp, FaShare, FaShareAlt, FaThumbsDown, FaThumbsUp } from 'react-icons/fa';

import { Link } from 'react-router-dom';

const Post = ({post}) => {
    const {title, authorImage,description, tag,createAt,upVote, downVote,_id} = post || {};
    let options = {  day: 'numeric', month: 'long', year: 'numeric' };

   

    return (
        <>
            <div className='border shadow-sm bg-white'>
                <div className='flex gap-5 py-5 px-5'>
                    <div className=''>
                        <span className='w-10 h-10 inline-block'>
                            <img className='w-10 h-10 rounded-full' src={ authorImage ? authorImage : "https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_640.png"} alt="" />
                        </span>
                        <div className='flex flex-col items-center gap-3 mt-3'>
                            <span className='flex gap-1 items-center text-[#1abc9c] cursor-pointer'> <FaThumbsUp /><span className='text-sm'>{upVote}</span></span>
                            <span className='flex gap-1 items-center text-[#db7a7a] cursor-pointer'><FaThumbsDown /><span className='text-sm'>{downVote}</span></span>
                        </div>
                    </div>
                    <div className='w-full'>
                        <p className='text-lg text-gray-600 font-medium'> <Link to={`/post/${_id}`}>{title}</Link> </p>
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
                                <span className='flex gap-1 items-center text-gray-400'><FaClock /><span className='text-xs text-gray-500'>Posted on : {new Date(createAt).toLocaleDateString('en-US', options )} </span></span>
                            
                            </div>
                            <div className='flex items-center gap-4'>
                            <span className='flex gap-1 items-center text-gray-400'> <span className='text-sm'>Comments: 10</span></span>
                             
                            </div>
                        </div>
                    </div>
                   
                </div>
            </div>
        </>
    )
};

export default Post;