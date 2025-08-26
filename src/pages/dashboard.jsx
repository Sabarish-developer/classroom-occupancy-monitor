import { useAuth } from "../hooks/use-auth";
import Sidebar from "../components/sidebar";

export const Dashboard = () => {

    const obj = useAuth();
    return (
        <div>
            <Sidebar />
        </div>
    )
}