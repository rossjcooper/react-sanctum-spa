import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '../../layouts/AppLayout';
import { fetchUsers, User } from '../../services/users';
import PerPageSelector from '../../components/PerPageSelector';
import SortBy, { SortByDirections, SortByValue } from '../../components/SortBy';
import Pagination from '../../components/Pagination';

export const Index = () => {
    const [keyword, setKeyword] = useState('');
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [perPage, setPerPage] = useState(25);
    const [sortBy, setSortBy] = useState<SortByValue>({ name: 'name', direction: SortByDirections.ASC });
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    const submitSearch = useCallback(() => {
        setLoading(true);
        const params = {
            keyword,
            perPage,
            sortBy: sortBy.name,
            sortDirection: sortBy.direction,
            page,
        };
        fetchUsers(params).then(({ data }) => {
            setUsers(data.data);
            setLastPage(data.last_page);
            setLoading(false);
        });
    }, [keyword, perPage, sortBy, page]);

    useEffect(() => {
        submitSearch();
    }, [perPage, sortBy, page]);

    return (
        <AppLayout header={<div>Users</div>}>
            <div className="bg-white shadow rounded-sm p-4 mb-4">
                <form className="flex" onSubmit={submitSearch}>
                    <div className="mr-2">
                        <input type="search" value={keyword} onChange={(e) => { setKeyword(e.target.value); }} className="input-control" placeholder="Search..." />
                    </div>
                    <div>
                        <button type="button" disabled={loading} className="button button-primary">Search</button>
                    </div>
                </form>
            </div>
            <div className="bg-white shadow rounded-sm p-4 mb-4">
                {!users.length && !loading ? (
                    <p>No users</p>
                ) : null}
                {!users.length && loading ? (
                    <p>Loading users...</p>
                ) : null}
                {users.length ? (
                    <>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>
                                        <SortBy name="name" label="Name" value={sortBy} onChange={setSortBy} />
                                    </th>
                                    <th>
                                        <SortBy name="email" label="Email" value={sortBy} onChange={setSortBy} />
                                    </th>
                                    <th className="text-right">
                                        <PerPageSelector perPage={perPage} onChange={setPerPage} />
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={`user_${user.id}`}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td className="text-right">
                                            <Link to={`/users/${user.id}`} className="text-primary">Edit</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Pagination page={page} lastPage={lastPage} onChange={setPage} />
                    </>
                ) : null}
            </div>
        </AppLayout>
    );
};

export default Index;
