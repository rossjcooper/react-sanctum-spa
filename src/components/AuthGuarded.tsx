import { ReactNode, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

interface AuthGuardedProps {
	children: ReactNode,
}

export const AuthGuarded = (props: AuthGuardedProps) => {
	const { user } = useContext(AuthContext)
	const navigate = useNavigate();


	useEffect(() => {
		if (!user) {
			navigate('/login');
		}
	}, []);

	if (!user) {
		return null;
	}

	return (<>{props.children}</>);
}

export default AuthGuarded;