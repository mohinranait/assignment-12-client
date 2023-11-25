import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { useLoaderData, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import uploadImage from "../../services/uploadImage";


const UpdatePosts = () => {
    const post = useLoaderData();

    const {register,  handleSubmit, formState: { errors }, } = useForm()
    const {user} = useAuth();
    const axios = useAxios();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        
        const toastId = toast.loading("Loading...");
        console.log('press');
        // Upload profile image
        const image = data.image[0];
        let newImg = null;
        if(image){
            const imageUrl = await uploadImage(image);
            newImg = imageUrl
        }
     
        try {
            const updatePostData = {
                title: data.title,
                tag : data.tag,
                description: data.description,
                image : newImg ? newImg : post?.image,
                authorImage : user?.photoURL,
                authorName: user?.displayName,
                authorEmail: user?.email,
                updateAt: new Date(),
            }

            const result = await axios.patch(`/posts/${post?._id}`, updatePostData )
            if(result){
                toast.success("Update Successfull", {id: toastId});
                navigate('/dashboard/my-posts')
           
            }
        } catch (error) {
            console.log(error);
            toast.error("Somthing wrong your crediantials", {id: toastId})
        }
    }

    return (
        <div>
       
            <div className="md:w-[70vw]">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-2 gap-5">
                        <div>
                            <div className="mb-5">
                                <label className="mb-2 inline-block" htmlFor="">Title</label>
                                <input type="text" name='title' defaultValue={post?.title} {...register("title", { required: 'Title is required' })}  placeholder='Title' className='px-3 w-full py-3  border border-gray-200 text-gray-700 rounded-md outline-none' />
                                <p className="text-red-500 text-sm">{errors.title && errors.title.message }</p>
                            </div>
                            <div className="mb-5">
                                <label className="mb-2 inline-block" htmlFor="">Search Tag</label>
                                <select name="tag" {...register('tag', {required:true})} className='px-3 w-full py-3  border border-gray-200 text-gray-700 rounded-md outline-none' id="">
                                    <option value="">Select Tag</option>
                                    <option value="tag1"  >Tag 1</option>
                                    <option value="tag-2"  >Tag 2</option>
                                    <option value="tag3"  >Tag 3</option>
                                </select>
                                <p className="text-red-500 text-sm">{errors.tag && errors.tag.message }</p>
                            </div>
                            <div className="mb-5">
                                <label className="mb-2 inline-block" htmlFor="">Descriptoin</label>
                                <textarea name="description" defaultValue={post?.description} placeholder="Description" {...register("description", { required: 'Description is required' })} id="" cols="30" rows="3" className='px-3 w-full py-3  border border-gray-200 text-gray-700 rounded-md outline-none'></textarea>
                                <p className="text-red-500 text-sm">{errors.description && errors.description.message }</p>
                            </div>
                            <div className="mb-5">
                                <label className="mb-2 inline-block" htmlFor="">Image</label> <br />
                                <div className="flex gap-3">
                                    <input type="file" name="image" {...register("image")} />
                                    {post?.image && <img className="w-20" src={post?.image} alt="" /> }
                                </div>
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
                           <button type="submit" className="w-full py-2 bg-purple-600 text-white rounded">Update</button>
                        </div>
                    </div>
                </form>
            </div>
       
        </div>
    );
};

export default UpdatePosts;