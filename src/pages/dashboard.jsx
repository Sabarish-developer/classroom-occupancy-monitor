import { useAuth } from "../hooks/use-auth";

export const Dashboard = () => {

    const {user} = useAuth();
    return <div >
        dashboard
        <div>
            {JSON.stringify(user)}
            dasdboard cards data
        </div>
    </div>
}