import { useNavigate, useParams } from "react-router-dom";
import { FaClock, FaCommentAlt, FaShare,  FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
import toast from 'react-hot-toast'
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Anouncements from "../../components/anouncements/Anouncements";
import PostCommentRow from "../../components/tableRows/PostCommentRow";



const Details = () => {
   

    const axios = useAxios();
    const axiosPublic = useAxiosPublic();
    const {user} = useAuth();
    const queryClient = useQueryClient();
    const {id:paramsId} = useParams();
    const navigate = useNavigate();


    const {data:getPost, refetch} = useQuery({
        queryKey: ['singlePosts'],
        queryFn: async () => {
            const {data} = await axios.get(`/posts/${paramsId}`);
            return data;
        }
    })
    const {title, authorImage,description, tag,createAt,upVote,authorName, downVote,_id} = getPost || {};
    // get totla Comments for this posts
    const {data:comments=[], refetch:commentRefetch } = useQuery({
        queryKey: ['comments'],
        queryFn: async () => {
            const {data} = await axiosPublic.get(`/comments/${paramsId}`)
            return data;
        }
    })
  
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
        if(user?.email){
            const data = {value, upVote, downVote, userEmail:user?.email}
            updateVoteCounter( {_id, data})
        }else{
            navigate('/login')
        }
       
    }

    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        if(user?.email){
            const comment = e.target.comment.value;
            const userEmail = user?.email;
            const postId = _id;

            const newComment ={ comment, userEmail, postId}
            const toastId = toast.loading('Loding...')
            try {
                const result = await axios.post('/comments', newComment);
                if(result.data.success){
                    commentRefetch();
                    e.target.reset()
                    toast.success("Commented", {id:toastId})
                }else{
                    toast.error("Already Commented", {id:toastId})
                }
            } catch (error) {
                toast.error(error.message, {id:toastId})
            }
        }else{
            navigate("/login")
        }
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
                                            <span className='flex gap-1 items-center text-gray-400'><FaCommentAlt /><span className='text-sm'>{comments?.length}</span></span>
                                            <span className='flex gap-1 items-center text-gray-400'><FaClock /><span className='text-xs text-gray-500'>Posted on : {new Date(createAt).toLocaleDateString('en-US', options )} </span></span>
                                        
                                        </div>
                                        <div className='flex items-center gap-4'>
                                            <span className='flex gap-1 items-center text-gray-400'> <span className='text-sm px-3 py-1 rounded bg-gray-100  cursor-pointer hover:bg-gray-200'>Comment</span></span>
                                            <span className='flex gap-1 items-center text-gray-400'><FaShare />  <span className='text-sm'>Share</span></span>
                                        
                                        </div>
                                    </div>
                                </div>
                            
                            </div>
                        </div>

                        
                        <div className="bg-white  border shadow-sm">
                            <form onSubmit={handleCommentSubmit}>
                                <div  className="flex gap-5 p-5">
                                    {
                                        user?.email && <div className=''>
                                        <span className='w-20 h-20 inline-block'>
                                            <img className='w-14 h-14 rounded-full mx-auto' src={ user?.photoURL ? user?.photoURL : "https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_640.png"} alt="" />
                                            <p className="text-center text-xs mt-2 text-gray-500">{user?.displayName}</p>
                                        </span>
                                    </div>
                                    }
                                    <div className="w-full bg-gray-100 p-3">
                                        <p className="text-xs text-gray-500">Post Reply </p>
                                        <textarea name="comment" required className="w-full block outline-none text-gray-600 mt-1 bg-gray-100 " id="" cols="30" rows="3"></textarea>
                                    </div>
                                </div>
                                <hr />
                                <div className="py-2 px-5 flex items-center justify-between">
                                    <p className="lg:ml-20 text-xs text-gray-500">First login, then comment</p>
                                    <button type="submit" className="px-4 py-2 text-sm rounded bg-[#1abc9c] text-white">Post Reply</button>
                                </div>
                            </form>
                            <div></div>
                        </div>

                        {
                            comments.length > 0 &&  <p className="text-lg font-medium mt-8">Comments</p>
                        }
                       

                        { comments &&
                            comments?.map(comment => <PostCommentRow key={comment?._id} comment={comment} commentRefetch={commentRefetch} /> )
                        }
                     

                    </div>
                    <div>
                        <div>
                            <Anouncements />
                        </div>
                    </div>
                </div> 
            </div>
        </section>  
    );
};

export default Details;