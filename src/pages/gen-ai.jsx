import Sidebar from "@/components/sidebar";
import ChatInterface from "@/components/ai-chat";
import { useState } from "react";

export const GenAi = () => {

    const [open, setOpen] = useState(false); //sidebar state

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar open={open} setOpen={setOpen}/>
            <div className={`flex-1 ${open ? "md:ml-[16rem]" : "md:ml-[4rem]"} transition-all duration-500`}>
                <ChatInterface />
            </div>
        </div>
    )
}