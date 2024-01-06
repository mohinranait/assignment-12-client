import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";


const UpdateProfile = () => {
    const {user,userUpdate} = useAuth();
    const [myUser, setMyUser] = useState({});
    const navigate = useNavigate()
    const axios = useAxios();
    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        const form  = e.target;
        const name = form.name.value;
        const avater = form.avater.value;
        const bio = form.bio.value;
        const address = form.address.value;
        const userObj = { name, avater,bio,address};

        try {
            console.log(userObj);
            await userUpdate(name, avater);
            const res = await axios.patch(`/user/${user?.email}`,userObj)
            if(res.data?._id){
                navigate('/dashboard/my-profile');
                toast.success("Updated")
            }
        } catch (error) {
            console.log("upate failed");
        }
    }

    useEffect(() => {
        const getAuth = async () => {

            const {data} = await axios.get(`/single-user/${user?.email}`);
            console.log(data);
            setMyUser(data)
        };
        if(user?.email) getAuth();
    },[user])
    return (
        <div>
            <div>
                <p className="text-3xl font-bold mb-5 text-gray-500">Update profile information</p>
                <form  onSubmit={handleUpdateProfile} className="space-y-4">
                    <input type="text" name='name' defaultValue={myUser?.name || ''} required placeholder='Name' className='px-3 w-full py-3  border border-gray-200 text-gray-700 rounded-md outline-none' />
                    <input type="text" name='avater' defaultValue={myUser?.avater || ''} required placeholder='Profile URL' className='px-3 w-full py-3  border border-gray-200 text-gray-700 rounded-md outline-none' />
                    <input type="text" name='address' defaultValue={myUser?.address || '' } required placeholder='Address' className='px-3 w-full py-3  border border-gray-200 text-gray-700 rounded-md outline-none' />
                    <textarea name="bio" id="" cols="30" defaultValue={myUser?.bio || ''} className='px-3 w-full py-3  border border-gray-200 text-gray-700 rounded-md outline-none' rows="2"></textarea>
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">Update Profile</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfile;