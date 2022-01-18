import { AxiosPromise, AxiosResponse } from "axios";
import API from "./api";

export const fetchCsrfCookie = () => {
	return API.get('/sanctum/csrf-cookie');
}

export interface AuthUser {
	id: number,
	name: string,
	email: string,
}

interface LoginResponse {
	user: AuthUser,
}

export const attemptLogin = (email: string, password: string) => {
	return API.post<LoginResponse>('/login', {email, password});
}

export const attemptLogout = () => {
	return API.post('/logout');
}

export const fetchProfile = () => {
	return API.get<LoginResponse>('/profile');
}