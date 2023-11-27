import { Outlet } from "react-router-dom";
import Header from "../shared/Header";
import Footer from "../shared/Footer";
import MobileHeader from "../shared/MobileHeader";
import { useState } from "react";


const MainLayout = () => {
    const [isToggle, setIsToggle] = useState(false);
    return (
        <>
            <Header isToggle={isToggle} setIsToggle={setIsToggle} />
            <Outlet />  
            <Footer />
            <MobileHeader isToggle={isToggle} setIsToggle={setIsToggle} />
        </>
    );
};

export default MainLayout;