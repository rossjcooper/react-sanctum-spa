import { AxiosPromise, AxiosResponse } from "axios";
import API from "./api";

export const fetchCsrfCookie = () => {
	return API.get('/sanctum/csrf-cookie');
}

interface LoginResponse {
	token: string,
}

export const attemptLogin = (email: string, password: string): AxiosPromise<AxiosResponse<LoginResponse>> => {
	return API.post('/login', {email, password});
}