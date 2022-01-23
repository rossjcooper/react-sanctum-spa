import React, { ReactNode, useEffect, useState } from 'react';
import './App.css';
import { AuthUser, fetchCsrfCookie, fetchProfile } from './services/auth';
import AuthContext from './contexts/AuthContext';

interface AppProps {
    children?: ReactNode,
}

function App(props: AppProps) {
    const [user, setUser] = useState<AuthUser>();
    const [ready, setReady] = useState(false);

    useEffect(() => {
        fetchCsrfCookie().then(() => {
            fetchProfile().then((res) => {
                setUser(res.data.user);
                setReady(true);
            }).catch(() => {
                setReady(true);
            });
        });
    }, []);

    if (!ready) {
        return null;
    }
    return (
        <div className="App">
            <AuthContext.Provider value={{ user, setUser }}>
                {props.children}
            </AuthContext.Provider>
        </div>
    );
}

export default App;
