import { createContext, PropsWithChildren, ReactNode } from "react";

interface AuthUser {

}

export interface AuthState {
	user?: AuthUser,
	setUser?: (user: AuthUser) => any,
}
const initialState: AuthState = {};

const AuthContext = createContext(initialState);

export default AuthContext;