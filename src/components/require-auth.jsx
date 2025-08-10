import { useEffect } from "react";
import { BarLoader } from "react-spinners";
import { useAuth } from "../context";

export const RequireAuth = ({children}) => {
    const {user, initialized} = useAuth();

    if (!initialized) {
        return <BarLoader width={"100%"} color='#22c55e'/>;
    }

    if (!user) {
        window.location.href = "http://localhost:5000/api/auth/google";
        return null;
    }

    return children;
};