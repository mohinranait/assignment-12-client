import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import { FaBell } from "react-icons/fa";
import useAnnouncement from "../hooks/useAnnouncement";
import Logo from "./Logo";


const Header = () => {
    const [announcements] = useAnnouncement();
    const [isOpen , setIsOpen] = useState(false);
    const {user,logOut} = useAuth();

    const handleLogut = async () => {
        await logOut()
    }
    return (
        <>
            <header className="py-3 shadow">
                <div className="container ">
                    <div className="grid grid-cols-12 items-center ">
                        <div className="col-span-3">
                           <Logo />
                        </div>
                        <div className="col-span-9 flex gap-4 justify-end items-center">
                        <ul className="flex items-center justify-center gap-5">
                                <li><Link to={'/'}>Home</Link></li>
                                <li><Link to={'/dashboard/package'} >Membership</Link></li>
                            </ul>
                            <span className="relative">
                                <span className="text-gray-500"> <FaBell size={23} /> </span>
                                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">{announcements?.length}</span>
                            </span>
                            {
                                user?.email ? <>
                                    <div className="relative">
                                        <span className="cursor-pointer" onClick={() => setIsOpen(!isOpen) }>
                                            <img className="w-10 h-10 rounded-full object-cover" src={user?.photoURL} alt="" />
                                        </span>
                                        <ul className={`absolute z-[80] right-0 top-full bg-white w-[150px] border rounded-md ${isOpen ? 'block':'hidden'} `}>
                                            <li><div className="py-4 bg-gray-200 w-full   text-center">{user?.displayName}</div></li>
                                            <li><Link className="pl-4 inline-block py-1 mt-3 hover:text-purple-500" to={'/dashboard'}>Dashboard</Link></li>
                                            <li><button onClick={handleLogut} className="pl-4 inline-block py-1 mb-3 hover:text-purple-500">Logout</button></li>
                                        </ul>
                                    </div>
                                </> : 
                                <Link to={'/login'} className="px-4 py-2 inline-block bg-purple-500 text-sm font-medium rounded text-white">Join Apply</Link>
                            }
                           
                        </div>
                    </div>
                </div>
            </header>   
        </>
    );
};

export default Header;