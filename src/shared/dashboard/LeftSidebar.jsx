/* eslint-disable react/prop-types */
import { Link, NavLink } from 'react-router-dom';
import NavLinks from '../../pages/Dashboard/navLinks/NavLinks';
import useAdmin from '../../hooks/useAdmin';
import AdminNavLinks from '../../pages/Dashboard/navLinks/AdminNavLinks';
import { FaHome, FaSignOutAlt } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';


const LeftSidebar = ({toggleLeft}) => {
    const {isAdmin} = useAdmin();
    const {logOut,user} = useAuth();

    const handleLogout = async () => {
        await logOut()
    }
    
    return (
        <div className='flex flex-col h-full'>
            <ul className='leftMenus flex-grow '>
                <li className='mx-4 py-3 border-b border-gray-200'>
                    <div className='bg-purple-500  rounded-md px-2 py-2 flex justify-between items-center'>
                        <div>
                            <span className='text-white'>Is {isAdmin? "Admin":'User'} </span>
                        </div>
                        <img src={user?.photoURL} className='w-10 h-10 rounded-full' alt="" />
                    </div>
                </li>
                {
                    isAdmin ?
                    AdminNavLinks?.map(link =>   
                        <li key={link.id}>
                            <NavLink to={`${link?.link}`} className={({ isActive, isPending }) =>
                            isActive
                                ? "  font-medium text-sm flex pl-4 py-3 gap-2 items-center bg-gray-200 "
                                : isPending
                                ? " hover:bg-slate-100 text-red-700 "
                                : "py-3 font-medium text-sm flex items-center gap-2 pl-4 hover:bg-slate-100 "
                            } > {link?.icon} <span className={`  group-hover:block ${toggleLeft ? "block" : "lg:hidden"}`}>{link?.name}</span> </NavLink>
                        </li> )
                     : 
                    NavLinks?.map(link =>   
                    <li key={link.id}>
                        <NavLink to={`${link?.link}`} className={({ isActive, isPending }) =>
                        isActive
                            ? "  font-medium text-sm flex pl-4 py-3 gap-2 items-center bg-gray-200 "
                            : isPending
                            ? " hover:bg-slate-100 text-red-700 "
                            : "py-3 font-medium text-sm flex items-center gap-2 pl-4 hover:bg-slate-100 "
                        } > {link?.icon} <span className={`  group-hover:block ${toggleLeft ? "block" : "lg:hidden"}`}>{link?.name}</span> </NavLink>
                    </li> )
                }
                
            </ul>
            <ul className='leftMenus mt-auto mb-5 '>
                <li >
                    <Link to={'/'} className={`items-center bg-gray-200 text-gray-700 w-full py-3 font-medium text-sm flex  gap-2 pl-4 hover:bg-slate-100 `} > 
                        <FaHome /> <span className={`  group-hover:block ${toggleLeft ? "block" : "lg:hidden"}`}>Frontend</span> 
                    </Link>
                </li>
                <li >
                    <button onClick={handleLogout} className={`items-center bg-gray-200 text-gray-700 w-full py-3 font-medium text-sm flex  gap-2 pl-4 hover:bg-slate-100 `} > 
                        <FaSignOutAlt /> <span className={`  group-hover:block ${toggleLeft ? "block" : "lg:hidden"}`}>Logout</span> 
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default LeftSidebar;