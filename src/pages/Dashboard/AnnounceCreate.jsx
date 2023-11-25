
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';

const AnnounceCreate = () => {
    const {user} = useAuth();
    const axios = useAxios();

    const handleCrateAnnouncement = async (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const description = form.description.value;
        const authorImage = user?.photoURL;
        const authorName = user?.displayName;
        const annoce = {title, description,authorImage, authorName}

        try {
            const {data} = await axios.post('/announcements', annoce )
            if(data.success){
                toast.success("Create Successfull");
                form.reset();
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    return (
        <div>
            <p className='text-2xl my-5 font-medium'>Create a new announcement</p>
             <form onSubmit={handleCrateAnnouncement}>
                <div className="grid grid-cols-2 gap-5">
                    <div>
                        <div className="mb-5">
                            <label className="mb-2 inline-block" htmlFor="">Title</label>
                            <input type="text" name='title'  placeholder='Title' className='px-3 w-full py-3  border border-gray-200 text-gray-700 rounded-md outline-none' />

                        </div>
                       
                        <div className="mb-5">
                            <label className="mb-2 inline-block" htmlFor="">Descriptoin</label>
                            <textarea name="description" placeholder="Description" id="" cols="30" rows="3" className='px-3 w-full py-3  border border-gray-200 text-gray-700 rounded-md outline-none'></textarea>
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
                    <button type='submit' className="w-full py-2 bg-purple-600 text-white rounded">Submit</button>
                </div>
            </form>   
        </div>
    );
};

export default AnnounceCreate;