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
import PrivateRoute from './PrivateRoute';
import ManageUsers from '../pages/Dashboard/ManageUsers';
import AnnounceCreate from '../pages/Dashboard/AnnounceCreate';
import Details from '../pages/Details/Details';
import AdminProfile from '../pages/Dashboard/AdminProfile';
import Dashboard from '../components/dashboard/Dashboard';

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
            },  
            {
                path : 'post/:id',
                element : <PrivateRoute><Details /></PrivateRoute> ,
                loader : async ({params}) => await fetch(`http://localhost:5000/posts/${params?.id}`)
            },
        ]
    },
    {
        path : "/dashboard",
        element : <PrivateRoute><DashboardLayout /></PrivateRoute> ,
        children : [
            {
                index: true,
                element : <Dashboard />
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
          

            // Admin Routes
            {
                path :'manage-users',
                element : <ManageUsers />
            },
            {
                path :'make-announcements',
                element : <AnnounceCreate />
            },
            {
                path :'admin-profile',
                element : <AdminProfile />
            },
            
        ]
    }
])


export default myRoutes