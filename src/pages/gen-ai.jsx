import Sidebar from "@/components/sidebar";
import ChatInterface from "@/components/ai-chat";

export const GenAi = () => {
    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 h-full ">
                <ChatInterface />
            </div>
        </div>
    )
}