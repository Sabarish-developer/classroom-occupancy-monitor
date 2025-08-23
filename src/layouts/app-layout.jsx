import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import { Footer } from "../components/footer";

export const AppLayout = () => {
    return (
        <div className=''>
            <Toaster position='top-center' reverseOrder={false}/>
            <main className="min-h-screen max-w-screen">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}