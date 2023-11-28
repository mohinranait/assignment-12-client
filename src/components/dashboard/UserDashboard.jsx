import useAuth from "../../hooks/useAuth";


const UserDashboard = () => {
    const {user} = useAuth();
    return (
        <div>
            <p className="text-2xl lg:text-4xl text-gray-600 font-medium">Hello <span className="text-blue-600 font-semibold">{user?.displayName}</span></p>
        </div>
    );
};

export default UserDashboard;