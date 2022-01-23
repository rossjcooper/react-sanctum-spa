import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

export const ProfileButton = () => {
    const { user } = useContext(AuthContext);

    return (
        <Link to="/profile" className="rounded-md bg-white py-1 px-2 hover:bg-gray-100 flex-0 cursor-pointer inline-block">
            <div className="border border-white rounded-full bg-secondary inline-block px-4 py-2 text-white font-light text-lg mr-2">{user?.name.charAt(0)}</div>
            <span>{user?.name}</span>
        </Link>
    );
};

export default ProfileButton;
