import { useContext, useState } from 'react';
import { BiLogOut } from 'react-icons/bi';
import AuthContext from '../contexts/AuthContext';
import { attemptLogout } from '../services/auth';

export const LogoutButton = () => {
    const { setUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const handleLogout = () => {
        setLoading(true);
        attemptLogout().then(() => {
            setLoading(false);
            setUser(undefined);
        });
    };
    return (
        <button type="button" onClick={handleLogout} className="block text-red-400 p-4 w-full text-left">
            <BiLogOut className="align-text-bottom mr-2 inline-block" />
            {!loading ? 'Logout' : 'Please wait...'}
        </button>
    );
};

export default LogoutButton;
