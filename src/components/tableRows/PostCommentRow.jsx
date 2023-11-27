/* eslint-disable react/prop-types */
import { useState } from "react";
import toast from "react-hot-toast";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import { FaEnvelope } from "react-icons/fa";
import { charecterLimit } from "../../services/utilitis";
import CommentDisplay from "../modal/CommentDisplay";
import { useNavigate } from "react-router-dom";


const PostCommentRow = ({comment,commentRefetch}) => {
    const {_id,comment:commentText,userEmail} = comment || {};
    const {user} = useAuth();
    const axios = useAxios();
    const [feedbackBtn, setFeedbackBtn] = useState('');
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate();

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    // Feedback button active and disabled
    const handleFeedback = (e) => {
        setFeedbackBtn(e.target.value);
    }

    // handle Feedback form store in my Database
    const handleFeedbackForm = async (e) => {
        e.preventDefault();
     
        if(user?.email){
            const updateComment = {
                feedback : e.target.feedback.value,
                repoterEmail : user?.email,
                visibility : false,
            }

            const updComment = await axios.patch(`/update-comments/${_id}`, updateComment);
            if(updComment.data.success){
                setFeedbackBtn('')
                toast.success("Report successfull");
                commentRefetch();
            }
        }else{
           navigate('/login')
        }
    }

    return (
        <>
            <div className='border shadow-sm bg-white'>
                <form onSubmit={handleFeedbackForm} className='grid items-center grid-cols-3 gap-5 py-5 px-5'>
                    <div className="w-full col-span-3 sm:col-span-1">
                        <p className='text-[15px] leading-6 text-gray-500 font-normal'>{ charecterLimit(commentText,20) } {commentText.length > 20 && <span className="text-blue-500 cursor-pointer" onClick={openModal}>Read more...</span> } </p>
                    </div>
                    <div className="w-full col-span-2 sm:col-span-1 flex justify-center">
                        <select name="feedback" onChange={handleFeedback} className="py-2 text-gray-500 outline-gray-300 px-3 " id="">
                            <option value="">Feedback</option>
                            <option value="Destroys the environment">Destroys the environment</option>
                            <option value="I own it. I want to delete now">I own it. I want to delete now</option>
                            <option value="Others reason">Others reason</option>
                        </select>
                    </div>
                    <div className="w-full col-span-1 sm:col-span-1 flex justify-end">
                        
                        <button type="submit" disabled={ !feedbackBtn && true} className={` rounded py-[5px]   items-center ${feedbackBtn ? 'bg-[#1abc9c] text-white' : ' text-gray-400 bg-gray-200'}`}> <span className='text-sm px-3   '>Report</span></button>
                    </div>
                </form>
                <hr />
                <div className='py-1'>
                    <div className='flex px-5 gap-6'>
                        <div className='flex items-center justify-between gap-4 w-full'>
                            <div className='flex items-center gap-4'>
                                <span className='flex gap-1 items-center text-gray-400'><FaEnvelope /><span className='text-xs text-gray-500'>{userEmail}</span></span>
                            </div>
                            <div className='flex items-center gap-4'>
                                <span className='flex gap-1 items-center text-gray-400'> <span className='text-sm px-3 py-1 rounded bg-gray-100  cursor-pointer hover:bg-gray-200'>Comment</span></span>
                            </div>
                        </div>
                    </div>
                
                </div>
            </div> 
            <CommentDisplay isOpen={isOpen} closeModal={closeModal} commentText={commentText} />
        </>
    );
};

export default PostCommentRow;