/* eslint-disable react/prop-types */
import { ImSpinner9 } from "react-icons/im";

export const LoadIcon = ({size}) => {
    return <ImSpinner9 className="text-blue-600 animate-spin" size={size} />
}

const Loader = () => {
    return (
        <div className="flex items-center justify-center fixed left-0 top-0 bottom-0 w-screen h-screen bg-white">
            <div>
                <LoadIcon size={50} />
            </div>
        </div>
    );
};

export default Loader;