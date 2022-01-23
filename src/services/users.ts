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
}

interface FetchUsersResponse {
    data: User[],
    page: number,
    last_page: number,
    total: number,
}

export const fetchUsers = (params: FetchUsersParams) => API.get<FetchUsersResponse>('/users', { params });
