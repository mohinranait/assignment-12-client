/* eslint-disable react/prop-types */
import  { useState } from 'react';
import { charecterLimit } from '../../services/utilitis';
import { FaEdit, FaTrash } from 'react-icons/fa';
import ReportEditModal from '../modal/ReportEditModal';

const ReportCommentRows = ({comment,index,adminCommentRefetch}) => {
    const {comment:commentText ,feedback, _id, userEmail, repoterEmail} = comment || {};
    const [toggle, setToggle] = useState(false);
    const [isOpen, setIsOpen] = useState(false)


    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }


    return (
        <>
            <tr  className="border-b">
                <td className="py-2 pl-2 text-gray-600">{index+1}. </td>
                <td className="py-2 pl-2">
                    <div className='flex gap-2 items-center'>
                        <p onClick={() => setToggle(!toggle)} className={`text-gray-500 text-sm max-w-[220px] ${ toggle ? 'hidden':'block' }`}>{ charecterLimit(commentText, 50) } <span className='text-blue-600 text-xs cursor-pointer'>Read more..</span> </p>
                        <p onClick={() => setToggle(!toggle)} className={`text-gray-500 text-sm max-w-[220px] ${toggle ? 'block':'hidden' }`}>{ commentText } <span className='text-blue-600 text-xs cursor-pointer'>Close</span></p>
                    </div>
                </td>
                <td className="py-2 pl-2 ">
                    <p className='text-sm text-gray-500'>{feedback}</p>
                </td>
                <td className="py-2 pl-2 ">
                    <p className='text-sm text-gray-500'>{userEmail}</p>
                </td>
                <td className="py-2 pl-2 ">
                    <p className='text-sm text-gray-500'>{repoterEmail}</p>
                </td>
                <td className='pr-2'>
                    <div className='flex gap-2 justify-end items-center align-middle'>
                        <button onClick={openModal} className='px-2   py-1 rounded bg-purple-50 border-purple-500 text-purple-500'> <FaEdit /> </button>
                        <button className='px-2 py-1 rounded text-purple-50 bg-purple-500'><FaTrash /> </button>
                    </div>
                </td>
            </tr> 
            <ReportEditModal closeModal={closeModal} adminCommentRefetch={adminCommentRefetch} commentText={commentText} _id={_id} isOpen={isOpen} />
        </>
    );
};

export default ReportCommentRows;