
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import AddPostForm from "../../components/forms/AddPostForm";
import Loader from "../../components/Loader/Loader";

const BecomeSellerButton = () => {
    return (
        <div className="flex items-center md:h-[70vh] justify-center">
            <div className=" p-10 ">
                <p className="text-center text-4xl font-medium">Your posts limit is over</p>
                <p className="text-center text-base font-normal my-5">If you want to buy our membership, click the <span className="font-semibold">Become a member</span> button below</p>
                <div className="text-center">
                    <Link to={'/dashboard/package'} className="px-7 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">Bcome a member</Link>
                </div>
            </div>
        </div>
    )
}


const AddPost = () => {
    const [getUser,setGetUser] = useState({})
  
    const {user} = useAuth();
    const axios = useAxios();

    const {data:postCounts=0, isLoading} = useQuery({
        queryKey: ['postsCounts', user?.email],
        queryFn: async () => {
            const {data} = await axios.get(`/posts-count/${user?.email}`);
            return data?.count;
        }
    })


    useEffect(() => {
        const fetchUser = async () => {
            const {data} = await axios.get(`/user/${user?.email}`);
            setGetUser(data) ;
        }
        fetchUser();
    },[user?.email,axios])

    if(isLoading){
        return <Loader />
    }

    return (
        <div>
            {
                getUser?.badge == 'bronze' ? <>
                    {
                        postCounts < 5  ?  <AddPostForm />  : <BecomeSellerButton />
                    }
                </> : <AddPostForm />
            }
        </div>
    );
};

export default AddPost;