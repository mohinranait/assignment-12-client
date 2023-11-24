import { axiosPublic } from "../hooks/useAxiosPublic";


const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append('image', image);
    const response = await axiosPublic.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KYE}`,formData)
    return response?.data?.data?.display_url;
}

export default uploadImage