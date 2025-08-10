import { BarLoader } from "react-spinners";
import { useAuth } from "../hooks/use-auth";
import { config } from "../config/config";

export const RequireAuth = ({children}) => {
    const {user, initialized} = useAuth();

    if (!initialized) {
        return <BarLoader width={"100%"} color='#22c55e'/>;
    }

    if (!user) {
        if(location.pathname !== '/'){
            window.location.href = `${config.authServiceUrl}/google`;
            return null;
        }
    }

    return children;
};