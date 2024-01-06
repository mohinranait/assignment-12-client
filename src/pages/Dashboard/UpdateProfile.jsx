import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import toast from "react-hot-toast";


const UpdateProfile = () => {
    const {user,userUpdate} = useAuth();
    const navigate = useNavigate()
    const axios = useAxios();
    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        const form  = e.target;
        const name = form.name.value;
        const avater = form.avater.value;
        const bio = form.bio.value;
        const userObj = { name, avater,bio};

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
    return (
        <div>
            <div>
                <p className="text-3xl font-bold mb-5 text-gray-500">Update profile information</p>
                <form  onSubmit={handleUpdateProfile} className="space-y-4">
                    <input type="text" name='name' defaultValue={user?.displayName || ''} required placeholder='Name' className='px-3 w-full py-3  border border-gray-200 text-gray-700 rounded-md outline-none' />
                    <input type="text" name='avater' defaultValue={user?.photoURL || ''} required placeholder='Profile URL' className='px-3 w-full py-3  border border-gray-200 text-gray-700 rounded-md outline-none' />
                    <textarea name="bio" id="" cols="30" className='px-3 w-full py-3  border border-gray-200 text-gray-700 rounded-md outline-none' rows="2"></textarea>
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">Update Profile</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfile;