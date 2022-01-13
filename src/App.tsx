import React, {ReactNode, useEffect, useState } from 'react';
import './App.css';
import { fetchCsrfCookie } from "./services/auth";
import AuthContext, { AuthState } from "./contexts/AuthContext";
interface AppProps {
    children?: ReactNode,
}

function App(props: AppProps) {
    const [authState, setAuthState] = useState<AuthState>({
        setUser: (user) => {setAuthState({...authState, user})}
    });

    useEffect(() => {
        fetchCsrfCookie().then();
    }, []);
    return (
        <div className="App">
            <AuthContext.Provider value={authState}>
                {props.children}
            </AuthContext.Provider>
        </div>
    );
}

export default App;
