import API from './api';

export const fetchCsrfCookie = () => API.get('/sanctum/csrf-cookie');

export interface AuthUser {
    id: number,
    name: string,
    email: string,
}

export interface ChangePasswordData {
    currentPassword: string,
    newPassword: string,
    confirmPassword: string,
}

interface LoginResponse {
    user: AuthUser,
}

export const attemptLogin = (email: string, password: string) => API.post<LoginResponse>('/login', { email, password });

export const attemptLogout = () => API.post('/logout');

export const fetchProfile = () => API.get<LoginResponse>('/profile');

export const updateProfile = (user: AuthUser) => API.post<LoginResponse>('/profile', user);

export const changePassword = (data: ChangePasswordData) => API.post('/changePassword', data);

export const forgotPassword = (email: string) => API.post('/forgotPassword', { email });

export const resetPassword = (email: string, password: string, confirmPassword: string, token: string) => API.post('/resetPassword', {
    email, password, confirmPassword, token,
});
