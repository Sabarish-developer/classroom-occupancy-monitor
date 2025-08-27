import Sidebar from "../components/sidebar";
import { RoomCard } from "@/components/room-card";


const room = {
    name: 'A101',
    capacity: 100,
    occupancy: 80,
    status: 'available',
    favourite: true
}

export const Dashboard = () => {

    return (
        <div className="flex">
            <Sidebar />
            <div>
                <RoomCard room={room}/>
            </div>
        </div>
    )
}