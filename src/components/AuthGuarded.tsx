import {
    ReactNode, useContext, useEffect, Children,
} from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

interface AuthGuardedProps {
    children: ReactNode,
}

export const AuthGuarded = (props: AuthGuardedProps) => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user]);

    if (!user) {
        return null;
    }

    const { children } = props;

    return (<div>{ children }</div>);
};

export default AuthGuarded;
