
import { IoGiftOutline, IoGridOutline, IoHomeOutline } from 'react-icons/io5';

const NavLinks = [
    // {
    //     id : 1,
    //     link : "/",
    //     name : "Dashboard",
    //     icon : <IoHomeOutline className='text-lg' />,
    //     path : '/',
    // },
    {
        id : 2,
        link : 'add-posts',
        name : "Add Posts",
        icon : <IoGridOutline className='text-lg' />,
        path : 'add-posts',
    },
    {
        id : 3,
        link : "my-posts",
        name : "My Posts",
        icon : <IoGiftOutline className='text-lg' />,
        path : 'my-posts',
    },
    {
        id : 3,
        link : "my-profile",
        name : "My Profile",
        icon : <IoGiftOutline className='text-lg' />,
        path : 'my-profile',
    }
];

export default NavLinks;

