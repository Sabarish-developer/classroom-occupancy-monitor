import { useContext, createContext, useState, useEffect } from "react";
import {useFetch} from './hooks/use-fetch.js';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [initialized, setInitialized] = useState(false);
    const {data, error, loading} = useFetch('http://localhost:5000/api/auth/user');

    useEffect(() => {
        if (data) setUser(data.user);
        if (!loading) setInitialized(true); // first check finished
    }, [data, loading]);

    return (
        <AuthContext.Provider value={{user, setUser, loading, initialized}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
}