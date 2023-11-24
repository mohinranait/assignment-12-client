/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PostRow = ({post,index}) => {
    const {image, title, tag, description,_id} = post ||{};
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
                <td className="py-2 pl-2 text-purple-500">#{tag}</td>
                <td className='pr-2'>
                    <div className='flex gap-2 justify-end items-center align-middle'>
                        <Link to={`/dashboard/posts/update/${_id}`} className='px-2 py-1 rounded bg-purple-50 border-purple-500 text-purple-500'>Edit</Link>
                        <button className='px-2 py-1 rounded text-purple-50 bg-purple-500'>Delete</button>
                    </div>
                </td>
            </tr>   
        </>
    );
};

PostRow.propTypes = {
    
};

export default PostRow;