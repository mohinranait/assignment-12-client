import { Link } from "react-router-dom";


const Header = () => {
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
                            <button className="px-4 py-2 inline-block bg-purple-500 text-sm font-medium rounded text-white">Join Apply</button>
                        </div>
                    </div>
                </div>
            </header>   
        </>
    );
};

export default Header;