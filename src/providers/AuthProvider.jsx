/* eslint-disable react/prop-types */
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import auth from '../services/firebase';
import useAxios from '../hooks/useAxios';
const googleProvider = new GoogleAuthProvider();

export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
    const axios = useAxios();
    const [user,setUser] = useState({})
    const [loading, setLoading] = useState(true);

    // Create user
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // login user
    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    // login user
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    // Google login
    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    const userUpdate = (name, image) => {
        setLoading(true);
        updateProfile(auth.currentUser,{
            displayName: name,
            photoURL : image
        })
        setLoading(false);
        return
    }


    useEffect(() => {
        const onSubscribe = onAuthStateChanged(auth, async currentUser=> {
            setUser(currentUser);
            setLoading(false);
            const userEmail = currentUser?.email;
            if(currentUser?.email){
                console.log(currentUser);
                await axios.post('/jwt', {email:userEmail});
            }else{
                console.log("user ni");
                await axios.post('/logout',{email:userEmail});
            }
        });
        return () => {onSubscribe()};
    },[axios])

    const userInfo = {
        userUpdate,
        logOut,
        user,
        loginUser,
        createUser,
        loading,
        googleLogin,
        
    }

    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;