import { ReactNode, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

interface UnguardedProps {
    children: ReactNode,
}

export const Unguarded = (props: UnguardedProps) => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    if (user) {
        return null;
    }

    return (<div>{props.children}</div>);
};

export default Unguarded;
