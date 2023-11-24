/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom';
import NavLinks from '../../pages/Dashboard/navLinks/NavLinks';

const LeftSidebar = ({toggleLeft}) => {
    return (
        <div className=''>
            <ul className='leftMenus'>
                {
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
        </div>
    );
};

export default LeftSidebar;