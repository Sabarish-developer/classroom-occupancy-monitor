import Sidebar from "@/components/sidebar"

export const AdminDashboard = () => {
    return (
        <div className="flex w-full">
            
            <Sidebar />
            <main className="flex-1">
                Admin Dashboard
            </main>

        </div>
    )
}