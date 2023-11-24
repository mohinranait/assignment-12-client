import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useState } from "react";


const Header = () => {
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
                        <div className="col-span-2">
                            <Link>
                                <span className="text-purple-600 font-bold text-3xl">P<span className="text-gray-800">MOR</span> </span>
                            </Link>
                        </div>
                        <div className="col-span-7">
                            <ul className="flex items-center justify-center gap-5">
                                <li><a href="#">Home</a></li>
                                <li><a href="#">Member Ship</a></li>
                                <li><a href="#">Notifications</a></li>
                            </ul>
                        </div>
                        <div className="col-span-3 flex justify-end items-center">
                            {
                                user?.email ? <>
                                    <div className="relative">
                                        <span className="cursor-pointer" onClick={() => setIsOpen(!isOpen) }>
                                            <img className="w-10 h-10 rounded-full object-cover" src={user?.photoURL} alt="" />
                                        </span>
                                        <ul className={`absolute right-0 top-full bg-white w-[150px] border rounded-md ${isOpen ? 'block':'hidden'} `}>
                                            <li><div className="py-4 bg-gray-200 w-full   text-center">{user?.displayName}</div></li>
                                            <li><Link className="pl-4 inline-block py-1 mt-3 hover:text-purple-500" to={'/dashboard'}>Dashboard</Link></li>
                                            <li><button onClick={handleLogut} className="pl-4 inline-block py-1 mb-3 hover:text-purple-500">Logout</button></li>
                                        </ul>
                                    </div>
                                </> : 
                                <button className="px-4 py-2 inline-block bg-purple-500 text-sm font-medium rounded text-white">Join Apply</button>
                            }
                           
                        </div>
                    </div>
                </div>
            </header>   
        </>
    );
};

export default Header;