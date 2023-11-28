
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SocilaLogin = () => {
    const axiosPublic = useAxiosPublic();
    const {googleLogin} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleGoogleLogin = async () => {
        const toastId = toast.loading("Loding...")
        try {
            // Google login
            const response = await googleLogin()
  
            // Save user inforamtion in our database
            await axiosPublic.post("/users", {
                name: response?.user?.displayName,
                userName: response?.user?.displayName,
                email: response?.user?.email,
            })
            navigate(location?.state ? location?.state : '/')
            toast.success('Create successfull', {id: toastId})
        } catch (error) {
            toast.error(error.message, {id: toastId})
        }
    }
    
    return (
        <>   
            <button onClick={handleGoogleLogin} type='button' className='px-5 py-3 rounded-md bg-gray-100 text-white font-medium '>  
                <img src="https://static-00.iconduck.com/assets.00/google-icon-2048x2048-czn3g8x8.png" className="w-6 h-6 object-contain" alt="" />
              </button>   
        </>
    );
};

export default SocilaLogin;