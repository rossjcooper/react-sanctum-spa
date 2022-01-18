import { useContext, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import { attemptLogout } from "../services/auth";

export const LogoutButton = () => {
    const { setUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const handleLogout = () => {
        setLoading(true);
        attemptLogout().then(() => {
            setLoading(false);
            setUser(undefined);
        });
    }
    return (
        <button type="button" onClick={handleLogout} className="block text-red-400 p-4 w-full text-left">{!loading ? 'Logout' : 'Please wait...'}</button>
    );
}

export default LogoutButton;