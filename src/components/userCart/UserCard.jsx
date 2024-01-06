/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";


const UserCard = ({user}) => {
    const {avater,name,_id,email} = user || {};
    return (
        <div className="border py-3 px-4 rounded-sm">
            <div className="flex gap-3">
                <Link to={`/profile/${email}`} >
                    <img className="w-[40px] h-[40px] rounded-full" src={avater || ''} alt="" />
                </Link>
                <div>
                    <Link to={`/profile/${email}`} className="text-gray-500">{name}</Link>
                </div>
            </div>
        </div>
    );
};

export default UserCard;