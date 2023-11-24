import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import DashboardLayout from '../layout/DashboardLayout';
import AddPost from '../pages/Dashboard/AddPost';
import MyPosts from '../pages/Dashboard/MyPosts';
import MyProfile from '../pages/Dashboard/MyProfile';

const myRoutes = createBrowserRouter([
    {
        path : "/",
        element : <MainLayout />,
        children : [
            {
                path: "/",
                element : <Home />
            },
            {
                path : "/login",
                element : <Login />
            },
            {
                path : "/register",
                element : <Register />
            }
        ]
    },
    {
        path : "/dashboard",
        element : <DashboardLayout />,
        children : [
            {
                index: true,
                element : <div>dashboard</div>
            },
            {
                path : 'add-posts',
                element : <AddPost />
            },
            {
                path : 'my-posts',
                element : <MyPosts />
            },
            {
                path : 'my-profile',
                element : <MyProfile />
            },
            
        ]
    }
])


export default myRoutes