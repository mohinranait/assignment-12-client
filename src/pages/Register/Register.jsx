import { Link, useNavigate } from "react-router-dom";
import SocilaLogin from "../../components/socilaLogin/SocilaLogin";
import { useForm } from "react-hook-form"
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import uploadImage from "../../services/uploadImage";
import { useState } from "react";



const Register = () => {
    const {createUser,userUpdate} = useAuth();
    const axiosPublic = useAxiosPublic();
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const {register,  handleSubmit, formState: { errors }, } = useForm()

    
    const onSubmit = async (data) => {

        let toastId = toast.loading('Loading...')
        try {
            // Check duplicate user name
            const userNameCheck = await axiosPublic.post('/check-user-name', {userName: data?.userName})
            if(userNameCheck.data.success === 'exists'){
                setError("This user name already exists")
                toast.error("This user name already exists",{id:toastId})
                return;
            }else{
                setError('')
            }


            // Upload profile image
            const image = data.image[0];
            const imageUrl = await uploadImage(image);

            // // User form data
            const {name, email,password,userName} = data;


            await createUser(email, password);
            await userUpdate(name, imageUrl);
            // Save user info my database
            await axiosPublic.post("/users", {
                name,
                userName: userName ? userName :name,
                email,
                avater: imageUrl,
            })
            toast.success("Register success", {id: toastId})
            navigate("/")
        } catch (error) {
            if(error.message === 'Firebase: Error (auth/email-already-in-use).'){
                setError("Your email already exists")
                toast.error("Your email already exists",{id: toastId})
            }else{

                toast.error(error.message ,{id: toastId})
            }
        }
    }

    const emailValidation = {
        required : "Email fild is Required",
        minLength: {
            value: 5,
            message: "Email charecter length must bee 5 charecter"
        },
        maxLength: {
            value : 50,
            message : "Email charecter limit is 50"
        },
        pattern: {
            value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            message : "Invalid email address"
        }
    }

    const passwordValidation = {
        required:"Password is required", 
        maxLength: {
            value: 10,
            message: "Maximum charecter 10"
        },
        minLength: {
            value: 6,
            message: "Minimum charecter is 6"
        }
    }




    return (
        <section className=''>
            <div className='' >
                <div className="container flex py-7 items-start">
                    <div className=" w-[300px] bg-white md:w-[450px] overflow-hidden  mx-auto rounded-lg">
                            
                            <div className='px-5 py-5 md:px-10 md:pb-10 rounded-b-lg bg-secondary '>
                            <div>
                                    <img src="https://cdn-icons-png.flaticon.com/512/6681/6681204.png" className="w-28 h-28 object-cover mx-auto" alt="" />
                                </div>
                                <div className='text-xl pb-5 font-semibold text-gray-600'>Register </div>
                                {
                                    error &&   <div>
                                    <p className="py-2 bg-red-50 shadow text-red-500 text-center rounded">{error}</p>
                                </div>
                                }
                              
                                <div>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className='mb-4'>
                                            <label htmlFor="" className='mb-1 block font-medium text-gray-600'>User name</label>
                                            <input type="text"  name='userName' {...register("userName", { required: 'User naem is required' })} placeholder='User name' className='px-3 w-full py-3  border border-gray-200 text-gray-700 rounded-md outline-none' />
                                            <p className="text-red-500 text-sm">{errors.userName && errors.userName.message }  </p>
                                        </div>
                                        <div className='mb-4'>
                                            <label htmlFor="" className='mb-1 block font-medium text-gray-600'>Full Name</label>
                                            <input type="text" name='name' {...register("name", { required: 'Name fild is required' })} placeholder='Full Name' className='px-3 w-full py-3  border border-gray-200 text-gray-700 rounded-md outline-none' />
                                            <p className="text-red-500 text-sm">{errors.name && errors.name.message }</p>
                                        </div>
                                        <div className='mb-4'>
                                            <label htmlFor="" className='mb-1 block font-medium text-gray-600'>Profile</label>
                                            <input type="file" name='image' {...register("image")} placeholder='Image URL' className='px-3 w-full py-3  border border-gray-200 text-gray-700 rounded-md outline-none' />
                                        </div>
                                        <div className='mb-4'>
                                            <label htmlFor="" className='mb-1 block font-medium text-gray-600'>Email</label>
                                            <input type="email" name='email' {...register("email", emailValidation)} placeholder='Email' className='px-3 w-full py-3  border border-gray-200 text-gray-700 rounded-md outline-none' />
                                            <p className="text-red-500 text-sm">{errors.email && errors.email.message }</p>
                                        </div>
                                        <div className='mb-5'>
                                            <label htmlFor="" className='mb-1 block font-medium text-gray-600'>Password</label>
                                            <input type="password" name='password' {...register("password", passwordValidation)} placeholder='Password' className='px-3 w-full py-3  border border-gray-200 text-gray-700 rounded-md outline-none' />
                                            <p className="text-red-500 text-sm">{errors.password && errors.password.message }</p>
                                        </div>
                                        <div className='mb-4 flex gap-5'>
                                            <button type='submit' className='px-5 py-3 rounded-md bg-blue-600 text-white font-medium w-full'>Sign Up</button>
                                           <SocilaLogin />
                                        </div>
                                    </form>
                                </div>
                                <p className='text-center text-gray-700'>Already have a  account ? <Link to={'/login'} className='text-blue-600'>Sign In</Link> </p>
                                
                            </div>
                    
                    </div>
                    
                </div>
            </div>
        </section>
    );
};

export default Register;