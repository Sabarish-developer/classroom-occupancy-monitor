import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import {Header} from "../components/header";

export const AppLayout = () => {
    return (
        <div className=''>
            <Toaster position='top-center' reverseOrder={false}/>
            <main className="min-h-screen max-w-screen">
                <Header />
                <Outlet />
            </main>
            <div className=" px-10 py-6 text-center bg-[#0a7a1e] text-white">
                Made with 🤍 by &nbsp;
                <a href="https://www.github.com/Sabarish-developer" target="_blank" className="underline font-bold italic">Sabarish</a>
            </div>
        </div>
    )
}