import { createContext } from "react";
import { AuthUser } from "../services/auth";

export interface AuthState {
	user?: AuthUser,
	setUser: (user: AuthUser|undefined) => any,
}
const initialState: AuthState = {user: undefined, setUser: (user) => {}};

export const AuthContext = createContext(initialState);

export default AuthContext;