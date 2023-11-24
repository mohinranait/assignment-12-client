import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import DashboardLayout from '../layout/DashboardLayout';
import AddPost from '../pages/Dashboard/AddPost';
import MyPosts from '../pages/Dashboard/MyPosts';
import MyProfile from '../pages/Dashboard/MyProfile';
import UpdatePosts from '../pages/Dashboard/UpdatePosts';
import MemberShip from '../pages/Dashboard/MemberShip';

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
                path : 'posts/update/:id',
                element : <UpdatePosts />,
                loader : async ({params}) => await fetch(`http://localhost:5000/posts/${params.id}`)
            },
            {
                path : 'my-posts',
                element : <MyPosts />
            },
            {
                path : 'my-profile',
                element : <MyProfile />,
               
            },
            {
                path : 'package',
                element : <MemberShip />
            },
            
        ]
    }
])


export default myRoutes