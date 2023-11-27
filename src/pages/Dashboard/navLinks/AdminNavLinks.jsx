import { IoGiftOutline, IoGridOutline, IoHomeOutline } from 'react-icons/io5';


const AdminNavLinks = [
   
    {
        id : 2,
        link : 'manage-users',
        name : "Manage Users",
        icon : <IoGridOutline className='text-lg' />,
        path : 'manage-users',
    },
    {
        id : 3,
        link : "make-announcements",
        name : "Announcements",
        icon : <IoGiftOutline className='text-lg' />,
        path : 'make-announcements',
    },
    {
        id : 4,
        link : "reported-comments",
        name : "Reported comments",
        icon : <IoGiftOutline className='text-lg' />,
        path : 'reported-comments',
    },
    {
        id : 1,
        link : "admin-profile",
        name : "Admin Profile",
        icon : <IoHomeOutline className='text-lg' />,
        path : 'admin-profile',
    },
];

export default AdminNavLinks;