import API from './api';

interface FetchUsersParams {
    keyword?: string,
    perPage?: number,
    sortBy?: string,
    sortDirection?: string,
    page: number,
}

export interface User {
    id?: number,
    name: string,
    email: string,
    password?: string,
}

interface FetchUsersResponse {
    data: User[],
    page: number,
    last_page: number,
    total: number,
}

export const fetchUsers = (params: FetchUsersParams) => API.get<FetchUsersResponse>('/users', { params });

export const fetchUser = (id: number) => API.get<User>(`/users/${id}`);

export const saveUser = (user: User) => {
    if (user.id) {
        return API.put<User>(`/users/${user.id}`, user);
    }
    return API.post<User>('/users', user);
};
