import toast from "react-hot-toast";
import useAxios from "../../hooks/useAxios";


const CreateTag = () => {
    const axios = useAxios();
    const handleCreateTag = async e => {
        e.preventDefault();
        const toastId = toast.loading("Loading...")

        const tag = e.target.tag.value;
        try {
            const res = await axios.post('/create-tags', {tag} );
            if(res.data.success){
                toast.success("Create Success",{id:toastId});
                e.target.reset();
            }
        } catch (error) {
            toast.error("Error", {id:toastId})
        }
    }
    return (
        <>
            <form onSubmit={handleCreateTag} className="bg-white p-5 shadow-sm border border-gray-200">
                <div>
                    <p className="text-lg font-semibold text-gray-500 mb-3">Create Tag</p>
                </div>
                <div className="mb-5">
                    <label className="mb-3 inline-block text-gray-400" htmlFor="">Tag name</label>
                    <input type="text" name='tag' required  placeholder='Tag' className='px-3 w-full py-3  border border-gray-200 text-gray-700 rounded-md outline-none' />
                </div>
                <div className="mb-5">
                    <button className="w-full py-2 bg-purple-600 text-white rounded">Submit</button>
                </div>
            </form>
        </>
    );
};

export default CreateTag;