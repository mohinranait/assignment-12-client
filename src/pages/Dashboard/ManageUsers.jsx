import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import UserRow from "../../components/tableRows/UserRow";
import { useState } from "react";


const ManageUsers = () => {
    const axiox = useAxios();
    const [search, setSearch] = useState('')
    const {data:users=[]} = useQuery({
        queryKey:['users',search],
        queryFn: async () => {
            const {data} = await axiox.get(`users?search=${search}`);
            return data;
        
        }
    })

    const handleSearchUser =  (e) => {
        setSearch(e.target.value);
    }
    return (
        <>
            <div>
                <div className="mt-5">
                    <div className="overflow-x-auto md:w-[70vw] mx-auto">
                        <div className="flex justify-between mb-5 items-center">
                            <p className="text-xl font-medium text-gray-600 mb-3">Manage Users</p>
                            <div className="flex gap-2 items-center">
                                <span>Search </span>
                                <input type="search" onChange={handleSearchUser} className="border rounded outline-none border-gray-200 py-1 px-2" placeholder="Search.." />
                            </div>
                        </div>
                        <table className="table-auto w-full border-collapse border">
                            <thead>
                                <tr className="bg-gray-200 py-2">
                                    <th className="text-left py-2 pl-2">SI</th>
                                    <th className="text-left py-2 pl-2">Name</th>
                                    <th className="text-left py-2 pl-2">User name</th>
                                    <th className="text-left py-2 pl-2">Email</th>
                                    <th className="text-left py-2 pl-2">Make role</th>
                                    <th className="text-left py-2 pl-2">Membership</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.length > 0 && users?.map((item,index) => <UserRow key={item?._id} index={index} user={item} /> )
                                }                            
                            </tbody>
                        </table>
                        <div>
                            {/* {myPosts.length == 0 && <div className="text-center bg-blue-50 text-blue-600 font-medium py-2 mt-4 rounded ">No Data found</div> } */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ManageUsers;