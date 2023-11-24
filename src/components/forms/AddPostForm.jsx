import toast from "react-hot-toast";
import uploadImage from "../../services/uploadImage";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";


const AddPostForm = () => {
    const {register,  handleSubmit, formState: { errors }, } = useForm()
    const axios = useAxios();
    const {user} = useAuth();
    const navigate = useNavigate();


    const onSubmit = async (data) => {
        const toastId = toast.loading("Loading...");

        // Upload profile image
        const image = data.image[0];
        const imageUrl = await uploadImage(image);


     
        try {
            const post = {
                title: data.title,
                tag : data.tag,
                description: data.description,
                image : imageUrl,
                authorImage : user?.photoURL,
                authorName: user?.displayName,
                authorEmail: user?.email,
                createAt: new Date(),
            }
            await axios.post('/posts', post )
            toast.success("Post Create Successfull", {id: toastId});
            navigate('/dashboard/my-posts')
        } catch (error) {
            toast.error("Somthing wrong your crediantials", {id: toastId})
        }
    }


    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-5">
                    <div>
                        <div className="mb-5">
                            <label className="mb-2 inline-block" htmlFor="">Title</label>
                            <input type="text" name='title' {...register("title", { required: 'Title is required' })}  placeholder='Title' className='px-3 w-full py-3  border border-gray-200 text-gray-700 rounded-md outline-none' />
                            <p className="text-red-500 text-sm">{errors.title && errors.title.message }</p>
                        </div>
                        <div className="mb-5">
                            <label className="mb-2 inline-block" htmlFor="">Search Tag</label>
                            <select name="tag" {...register('tag', {required:true})} className='px-3 w-full py-3  border border-gray-200 text-gray-700 rounded-md outline-none' id="">
                                <option value="">Select Tag</option>
                                <option value="tag1">Tag 1</option>
                                <option value="tag-2">Tag 2</option>
                                <option value="tag3">Tag 3</option>
                            </select>
                            <p className="text-red-500 text-sm">{errors.tag && errors.tag.message }</p>
                        </div>
                        <div className="mb-5">
                            <label className="mb-2 inline-block" htmlFor="">Descriptoin</label>
                            <textarea name="description" placeholder="Description" {...register("description", { required: 'Description is required' })} id="" cols="30" rows="3" className='px-3 w-full py-3  border border-gray-200 text-gray-700 rounded-md outline-none'></textarea>
                            <p className="text-red-500 text-sm">{errors.description && errors.description.message }</p>
                        </div>
                        <div className="mb-5">
                            <label className="mb-2 inline-block" htmlFor="">Image</label> <br />
                            <input type="file" name="image" {...register("image", { required: 'Image is required' })} />
                            <p className="text-red-500 text-sm">{errors.image && errors.image.message }</p>
                        </div>
                    </div>
                    <div>
                        <div className="mb-5">
                            <label className="mb-2 inline-block" htmlFor="">Author Name (Not editable)</label>
                            <input type="text" readOnly value={user?.displayName}   className='px-3 w-full py-3  border border-gray-200 text-gray-700 rounded-md outline-none' />
                        </div>
                        <div className="mb-5">
                            <label className="mb-2 inline-block" htmlFor="">Author Email (Not editable)</label>
                            <input type="text" readOnly value={user?.email}   className='px-3 w-full py-3  border border-gray-200 text-gray-700 rounded-md outline-none' />
                        </div>
                    </div>
                </div>
        
                <div className="grid grid-cols-2 gap-5 mb-5 mt-6">
                    <div>
                    <button className="w-full py-2 bg-purple-600 text-white rounded">Submit</button>
                    </div>
                </div>
            </form>   
        </>
    );
};

export default AddPostForm;