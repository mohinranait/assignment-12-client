import axios from 'axios';

import { signOut } from 'firebase/auth';
import auth from '../services/firebase';

export const instance = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials:true
})

const useAxios = () => {
    
    instance.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
       if( error.response.status == 401 || error.response.status === 403){
            signOut(auth)
            .then(() => {
                console.log('logout'); 
            })
        }
        return Promise.reject(error);
    });
    return instance;
};

export default useAxios;