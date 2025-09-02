import Sidebar from "@/components/sidebar"
import { LoginRadialCharts } from "@/components/radial-chart"
import RoomOccupancyChart from "@/components/room-occupancy-chart"

export const AdminDashboard = () => {

    const data = {
                    login: { attempts: 4, success: 4, failure: 0 },
                    prompts: {
                        dailyPrompts: { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 1, Sun: 0 },
                        totalPrompts: 1,
                        avgPerUser: 1
                    },
                    rooms: {
                        A101: { avgOccupancy: 0, peakOccupancy: 0 },
                        A102: { avgOccupancy: 70, peakOccupancy: 70 },
                        Collab: { avgOccupancy: 60, peakOccupancy: 60 },
                        Auditorium: { avgOccupancy: 1009, peakOccupancy: 1009 },
                        'Rec Cafe': { avgOccupancy: 150, peakOccupancy: 150 }
                    }
                }

    return (
        <div className="flex w-full">
            
            <Sidebar />
            <main className="flex-1 p-4">
                <div>
                    <h1 className="font-bold text-2xl lg:text-4xl mb-3 text-center pb-2 border-b border-gray-200">
                        Admin Dashboard
                    </h1>
                </div>
                <div className="my-4  text-center md:text-start ">
                    <span className="font-[500] text-xl lg:text-3xl pl-2">Auth Service Analytics</span>
                </div>
                <LoginRadialCharts />
            </main>

        </div>
    )
}