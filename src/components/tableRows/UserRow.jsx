/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const UserRow = ({user,index}) => {
    const {name,email,role,_id,userName,badge} = user;
    const axios = useAxios();
    const queryClinet= useQueryClient();

    const {mutate:udpateRole} = useMutation({
        mutationFn: async (username) => {
            const {data} = await axios.get(`/make-admin/${username}`);
        },
        onSuccess : () => {
            queryClinet.invalidateQueries(['users'])
        }
    })


    const handleAdmin = async () => {
        udpateRole(userName)

    }
    return (
        <>
            <tr className="border-b">
                <td className="py-2 pl-2">{++index}</td>
                <td className="py-2 pl-2">{name}</td>
                <td className="py-2 pl-2">{userName}</td>
                <td className="py-2 pl-2">{email}</td>
               
                <td className="py-2 pl-2 ">
                    {
                        role == 'admin' ?  <button onClick={handleAdmin} className='px-3 relative py-1 inline-block bg-green-100 text-green-700 rounded text-sm'>
                        Admin
                     </button> :  <button onClick={handleAdmin} className='px-3 relative py-1 inline-block bg-gray-100 rounded text-sm'>
                        Make Admin
                     </button>
                    }
                   
                   
                </td>
                <td className="py-2 pl-2 pr-2">
                    {
                        badge == 'bronze' ? 
                          <button className=" items-center px-4 py-2  font-medium text-center text-gray-900 bg-gray-100 border flex gap-1 rounded-lg text-xs ms-3"> <img src="https://static.vecteezy.com/system/resources/thumbnails/015/730/440/small/luxury-silver-medal-png.png" className="w-4" alt="" /> Bronze</button>
                          :
                          <div className="inline-flex px-5 py-2 rounded items-center bg-green-50 text-gray-600  font-medium text-center text-xs "> <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ77MLSpVDEx2-IRw-_2a1ja0UXdz33FcYKNG4HNwy2ntSW-YZnUT_2C9jqb8mFx2Vmqh0&usqp=CAU" className="w-4 " alt="" /> Gold</div>
                    }
                </td>
               
            </tr>   
        </>
    );
};

UserRow.propTypes = {
    
};

export default UserRow;