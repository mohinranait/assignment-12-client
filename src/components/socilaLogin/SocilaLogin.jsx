import { FaGoogle } from "react-icons/fa";
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
                userName:'',
                email: response?.user?.email,
            })
            navigate(location?.pathname ? location?.pathname : '/')
            toast.success('Create successfull', {id: toastId})
        } catch (error) {
            toast.error(error.message, {id: toastId})
        }
    }
    
    return (
        <>   
            <button onClick={handleGoogleLogin} type='button' className='px-5 py-3 rounded-md bg-[#EE6358] text-white font-medium '>  <FaGoogle />  </button>   
        </>
    );
};

export default SocilaLogin;