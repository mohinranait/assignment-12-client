/* eslint-disable react/prop-types */

import { Link } from 'react-router-dom';
import Logo from './Logo';
import { IoClose } from "react-icons/io5";
import useAuth from '../hooks/useAuth';

const MobileHeader = ({isToggle, setIsToggle}) => {
    const {user} = useAuth();

    return (
        <div className={`fixed w-[90vw] sm:hidden h-screen z-50 bg-white top-0 left-0 transition-all ${isToggle ? 'translate-x-0':'-translate-x-full'} `}>
            <ul className=''>
                <li className='flex justify-between px-4 items-center py-3 border-b border-gray-300'>
                    <Logo />
                    <span onClick={() => setIsToggle(!isToggle)} className='text-gray-600 w-10 h-10 rounded-full flex items-center cursor-pointer justify-center bg-gray-50 hover:bg-gray-100'>
                        <IoClose size={20} />
                    </span>
                </li>
                <li><Link to="/" className='py-2 w-full text-gray-600 hover:bg-gray-100  inline-block px-3'>Home</Link></li>
                <li><Link to={'/dashboard/package'} className='py-2 w-full text-gray-600  hover:bg-gray-100 inline-block px-3'>Membersipe</Link></li>
                {
                    !user?.email &&  <li><Link to={'/login'} className='py-2 w-full text-gray-600  hover:bg-gray-100 inline-block px-3'>Join</Link></li>
                }
               
            </ul>
        </div>
    );
};

export default MobileHeader;