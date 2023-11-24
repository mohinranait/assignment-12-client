import { Link, useNavigate } from "react-router-dom";
import SocilaLogin from "../../components/socilaLogin/SocilaLogin";
import { useForm } from "react-hook-form"
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import uploadImage from "../../services/uploadImage";




const Register = () => {
    const {createUser,userUpdate} = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const {register,  handleSubmit, formState: { errors }, } = useForm()

    
    const onSubmit = async (data) => {
     
        // Upload profile image
        const image = data.image[0];
        const imageUrl = await uploadImage(image);

        // User form data
        const {name, email,password} = data;

        try {
            await createUser(email, password);
            await userUpdate(name, imageUrl);
            // Save user info my database
            await axiosPublic.post("/users", {
                name,
                userName:'',
                email,
                profile: imageUrl,
            })
            toast.success("Register success")
            navigate("/")
        } catch (error) {
            toast.error(error.message)
            console.log(error);
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
                <div className="container flex items-start">
                    <div className=" w-[300px] md:w-[450px] overflow-hidden  mx-auto rounded-lg">
                        
                            <div className='px-5 py-5 md:px-10 md:pb-10 rounded-b-lg bg-secondary '>
                                <div className='text-3xl pb-5 font-semibold text-gray-800'>Register Form</div>
                                <div>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className='mb-4'>
                                            <label htmlFor="" className='mb-1 block font-medium text-gray-800'>Full Name</label>
                                            <input type="text" name='name' {...register("name", { required: 'Name fild is required' })} placeholder='Full Name' className='px-3 w-full py-3  border border-gray-200 text-gray-700 rounded-md outline-none' />
                                            <p className="text-red-500 text-sm">{errors.name && errors.name.message }</p>
                                        </div>
                                        <div className='mb-4'>
                                            <label htmlFor="" className='mb-1 block font-medium text-gray-800'>Profile</label>
                                            <input type="file" name='image' {...register("image")} placeholder='Image URL' className='px-3 w-full py-3  border border-gray-200 text-gray-700 rounded-md outline-none' />
                                        </div>
                                        <div className='mb-4'>
                                            <label htmlFor="" className='mb-1 block font-medium text-gray-800'>Email</label>
                                            <input type="email" name='email' {...register("email", emailValidation)} placeholder='Email' className='px-3 w-full py-3  border border-gray-200 text-gray-700 rounded-md outline-none' />
                                            <p className="text-red-500 text-sm">{errors.email && errors.email.message }</p>
                                        </div>
                                        <div className='mb-5'>
                                            <label htmlFor="" className='mb-1 block font-medium text-gray-800'>Password</label>
                                            <input type="password" name='password' {...register("password", passwordValidation)} placeholder='Password' className='px-3 w-full py-3  border border-gray-200 text-gray-700 rounded-md outline-none' />
                                            <p className="text-red-500 text-sm">{errors.password && errors.password.message }</p>
                                        </div>
                                        <div className='mb-4 flex gap-5'>
                                            <button type='submit' className='px-5 py-3 rounded-md bg-purple-500 text-white font-medium w-full'>Sign Up</button>
                                           <SocilaLogin />
                                        </div>
                                    </form>
                                </div>
                                <p className='text-center text-gray-700'>Already have a  account ? <Link to={'/login'} className='text-purple-500'>Sign In</Link> </p>
                                
                            </div>
                    
                    </div>
                    
                </div>
            </div>
        </section>
    );
};

export default Register;