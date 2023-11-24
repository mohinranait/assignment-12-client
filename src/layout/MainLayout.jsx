import { Outlet } from "react-router-dom";
import Header from "../shared/Header";


const MainLayout = () => {
    return (
        <>
            <Header />
            <Outlet />  
        </>
    );
};

export default MainLayout;