import { useAuth } from "../context"

export const Dashboard = () => {

    const {user} = useAuth();
    return <div>
        dashboard
        <div>
            {JSON.stringify(user)}
        </div>
    </div>
}