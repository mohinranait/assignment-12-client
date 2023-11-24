import { Link } from "react-router-dom";
import SocilaLogin from "../../components/socilaLogin/SocilaLogin";


const Login = () => {
    return (
        <section className=''>
            <div className='' >
                <div className="container flex items-start">
                    <div className=" w-[300px] md:w-[450px] overflow-hidden  mx-auto rounded-lg">
                        
                            <div className='px-5 py-5 md:px-10 md:pb-10 rounded-b-lg bg-secondary '>
                                <div className='text-3xl pb-5 font-semibold text-gray-800'>Login </div>
                                <div>
                                    <form >
                                       
                                        <div className='mb-4'>
                                            <label htmlFor="" className='mb-1 block font-medium text-gray-800'>Email</label>
                                            <input type="email" name='email' placeholder='Email' className='px-3 w-full py-3  border border-gray-200 text-gray-700 rounded-md outline-none' />
                                        </div>
                                        <div className='mb-5'>
                                            <label htmlFor="" className='mb-1 block font-medium text-gray-800'>Password</label>
                                            <input type="password" name='password' placeholder='Password' className='px-3 w-full py-3  border border-gray-200 text-gray-700 rounded-md outline-none' />
                                        </div>
                                        <div className='mb-4 flex gap-5'>
                                            <button type='submit' className='px-5 py-3 rounded-md bg-purple-500 text-white font-medium w-full'>Sign In</button>
                                           <SocilaLogin />
                                        </div>
                                    </form>
                                </div>
                                <p className='text-center text-gray-700'>Create a new  account ? <Link to={'/register'} className='text-purple-500'>Sign Up</Link> </p>
                                
                            </div>
                    
                    </div>
                    
                </div>
            </div>
        </section>
    );
};

export default Login;