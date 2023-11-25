/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import Swal from 'sweetalert2'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxios from '../../hooks/useAxios';

const PostRow = ({post,index}) => {
    const {image, title, tag, upVote,downVote,_id} = post ||{};
    const axios = useAxios();
    const queryClient = useQueryClient();

    const {mutate:myPostsDelete} = useMutation({
        mutationFn: async (id) => {
            const {data} = await axios.delete(`/posts/${id}`)
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
    return (
        <>
            <tr className="border-b">
                <td className="py-2 pl-2">{++index}</td>
                <td className="py-2 pl-2">
                    <div className='flex gap-2 items-center'>
                        {
                            image && <img src={image} className='w-16' alt="" />
                        }
                        <p>{title}</p>
                    </div>
                </td>
                <td className="py-2 pl-2 ">
                    <div>
                        <p className='text-sm'>UpVotes: <span className='font-medium'>{upVote}</span></p>
                        <p className='text-sm'>DownVotes: <span className='font-medium'>{upVote}</span></p>
                    </div>
                </td>
                <td className="py-2 pl-2 ">
                    <button className='px-3 py-1 inline-block bg-gray-100 rounded text-sm'>
                       Comments (0)
                    </button>
                </td>
                <td className='pr-2'>
                    <div className='flex gap-2 justify-end items-center align-middle'>
                        <Link to={`/dashboard/posts/update/${_id}`} className='px-2 py-1 rounded bg-purple-50 border-purple-500 text-purple-500'>Edit</Link>
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