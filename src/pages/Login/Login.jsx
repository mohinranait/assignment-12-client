import { Link, useLocation, useNavigate } from "react-router-dom";
import SocilaLogin from "../../components/socilaLogin/SocilaLogin";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";


const Login = () => {
    const {loginUser} = useAuth();
    const {register,  handleSubmit, formState: { errors }, } = useForm()
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);

    const onSubmit = async (data) => {
        const {email, password} = data || {};
        const toastId = toast.loading("Loading");
        try {
            await loginUser(email, password)
            toast.success("Login Success", {id: toastId});
            navigate(location?.state ? location?.state : '/')
        } catch (error) {
            toast.error("Somthing wrong your crediantials", {id: toastId})
        }
    }

    const emailValidation = {
        required : "Email fild is Required",
        minLength: {
            value: 5,
            message: "Email charecter length must bee 5 charecter"
        },
        maxLength: {
            value : 20,
            message : "Email charecter limit is 20"
        },
        pattern: {
            value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            message : "Invalid email address"
        }
    }

    return (
        <section className=''>
            <div className='' >
                <div className="container flex items-start my-10">
                    <div className=" w-[300px] bg-white  md:w-[450px] overflow-hidden  mx-auto rounded-lg">
                        
                            <div className='px-5 py-5 md:px-10 md:pb-10 rounded-b-lg bg-secondary '>
                                <div>
                                    <img src="https://cdn-icons-png.flaticon.com/512/6681/6681204.png" className="w-32 h-32 object-cover mx-auto" alt="" />
                                </div>
                                <div className='text-xl pb-5 font-semibold text-gray-600'>Login </div>
                                <div>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className='mb-4'>
                                            <label htmlFor="" className='mb-1 block font-medium text-gray-600'>Email</label>
                                            <input type="email" name='email' {...register("email", emailValidation)} placeholder='Email' className='px-3 w-full py-3  border border-gray-200 text-gray-700 rounded-md outline-none' />
                                            <p className="text-red-500 text-sm">{errors.email && errors.email.message }</p>
                                        </div>
                                        <div className='mb-5'>
                                            <label htmlFor="" className='mb-1 block font-medium text-gray-600'>Password</label>
                                            <input type="password" name='password' {...register("password", { required: 'Password is required' })} placeholder='Password' className='px-3 w-full py-3  border border-gray-200 text-gray-700 rounded-md outline-none' />
                                            <p className="text-red-500 text-sm">{errors.password && errors.password.message }</p>
                                        </div>
                                        <div className='mb-4 flex gap-5'>
                                            <button type='submit' className='px-5 py-3 rounded-md bg-blue-600 text-white font-medium w-full'>Sign In</button>
                                           <SocilaLogin />
                                        </div>
                                    </form>
                                </div>
                                <p className='text-center text-gray-700'>Create a new  account ? <Link to={'/register'} className='text-blue-600'>Sign Up</Link> </p>
                                
                            </div>
                    
                    </div>
                    
                </div>
            </div>
        </section>
    );
};

export default Login;