import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import {Header} from "../components/header";

export const AppLayout = () => {
    return (
        <div>
            <Toaster position='top-center' reverseOrder={false}/>
            <main className="min-h-screen max-w-screen overflow-x-hidden">
                <Header />
                <Outlet />
            </main>
            <div className=" p-10 text-center bg-[#d1fae5]">
                Made with 🔥 by &nbsp;
                <a href="https://www.github.com/Sabarish-developer" target="_blank" className="underline font-bold">Sabarish-developer</a>
            </div>
        </div>
    )
}