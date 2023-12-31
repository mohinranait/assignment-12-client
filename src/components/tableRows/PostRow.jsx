/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import Swal from 'sweetalert2'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxios from '../../hooks/useAxios';
import toast from 'react-hot-toast';
import { FaGlobe, FaGlobeAsia, FaLock } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import { charecterLimit } from '../../services/utilitis';

const PostRow = ({post,index, refetch}) => {
    const {image, title, tag, upVote,downVote,_id,visivility} = post ||{};
    const axios = useAxios();
    const {user} = useAuth();
    const queryClient = useQueryClient();

    const {mutate:myPostsDelete} = useMutation({
        mutationFn: async (id) => {
            const {data} = await axios.delete(`/posts/${id}?email=${user?.email}`)
            if(data.success){
                Swal.fire({
                    title: "Deleted!",
                    text: "Your posts has been deleted.",
                    icon: "success"
                });
            }
        },
        onSuccess : () => {
            queryClient.invalidateQueries(['myPosts'])
        }
    })

    const handleDeleteMyPosts = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete this post?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                myPostsDelete(id)
              
            }
        });
    }


    const handlePostVisibility = async (currentValue) => {
        let dataValue = !currentValue
        try {
            await axios.patch(`/posts/${_id}?email=${user?.email}` , {visivility:dataValue})
            refetch();
            toast.success("Updated visibility")
        } catch (error) {
            toast.error(error.message);
        }
    }
    return (
        <>
            <tr className="border-b">
                <td className="py-2 pl-2">{++index}</td>
                <td className="py-2 pl-2">
                    <div className='flex gap-2 items-center'>
                        {/* {
                            image && <img src={image} className='w-16' alt="" />
                        } */}
                        <p className='text-gray-500 text-sm'>{ charecterLimit(title, 50)}</p>
                    </div>
                </td>
                <td className="py-2 pl-2 ">
                    <div>
                        <p className='text-sm text-gray-500'>UpVotes: <span className='font-medium'>{upVote}</span></p>
                        <p className='text-sm text-gray-500'>DownVotes: <span className='font-medium'>{downVote}</span></p>
                    </div>
                </td>
                <td className="py-2 pl-2 ">
                    <Link to={`/post/${_id}`} className='px-3 text-gray-500 hover:bg-gray-200 py-1 inline-block bg-gray-100 rounded text-sm'>
                       Comments 
                    </Link>
                </td>
                <td className="py-2 pl-2 ">
                    <button onClick={() => handlePostVisibility(visivility)} className='px-3 text-gray-500 hover:bg-gray-200 py-1 inline-block bg-gray-100 rounded text-sm'>
                       {visivility ? <span className='flex gap-1 items-center'>Public <FaGlobeAsia size={10} /></span>  : <span className='flex gap-1 items-center'>Only Me <FaLock size={10} /></span> }
                    </button> 
                </td>
                <td className='pr-2'>
                    <div className='flex gap-2 justify-end items-center align-middle'>
                        <Link to={`/dashboard/posts/update/${_id}`} className='px-2   py-1 rounded bg-purple-50 border-purple-500 text-purple-500'>Edit</Link>
                        <button onClick={() => handleDeleteMyPosts(_id)} className='px-2 py-1 rounded text-purple-50 bg-purple-500'>Delete</button>
                    </div>
                </td>
            </tr>   
        </>
    );
};

PostRow.propTypes = {
    
};

export default PostRow;