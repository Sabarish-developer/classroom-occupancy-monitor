import Sidebar from "../components/sidebar";
import { RoomCard } from "@/components/room-card";
import { useState } from "react";
import { SortButton } from "@/components/sort-button";
import { FilterButton } from "@/components/filter-button";


export const Dashboard = () => {

    const rooms = [
    { name: "A101", capacity: 100, occupancy: 80 },
    { name: "A102", capacity: 100, occupancy: 50 },
    { name: "A103", capacity: 100, occupancy: 0 },
    { name: "Rec Cafe", capacity: 100, occupancy: 100 },
    { name: "Rec Hut", capacity: 100, occupancy: 80 },
    { name: "Collab", capacity: 100, occupancy: 80 },
  ];

    const [favourites, setFavourites] = useState(() => {
        const saved = localStorage.getItem('favourites');
        return saved ? JSON.parse(saved) : [];
    })

    const toggleFavourite = (roomName) => {
        let updatedFavourites;
        setFavourites((prev) => {
            if(prev.includes(roomName))
                updatedFavourites = prev.filter((r) => r!==roomName)
            else
                updatedFavourites = [...prev, roomName];
            localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
            return updatedFavourites;
        })
    }

    const [sortValue, setSortValue] = useState('none');
    const [filterValue, setFilterValue] = useState('none');

    return (
        <div className="flex w-full">

            <Sidebar />

            <main className="flex-1">
                <div className="mx-auto w-full px-6">

                    <h1>
                        <h1 className="text-2xl lg:text-4xl font-bold my-4">Occupancy Status</h1>
                    </h1>

                    <div className="grid grid-cols-[1fr_auto] gap-4 mb-6">
                        <input
                        type="text"
                        placeholder="Search rooms..."
                        className="border border-gray-300 rounded-lg px-3 py-2 w-full"
                        />
                        <div className="flex items-center gap-2">
                        <SortButton sortValue={sortValue} setSortValue={setSortValue}/>
                        <FilterButton filterValue={filterValue} setFilterValue={setFilterValue} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-4 mx-auto h-fit w-full max-w-full justify-items-center">
                        {
                        rooms.map((room) => {
                            return (
                                <RoomCard 
                                    key = {rooms.name}
                                    room = {room}
                                    isFavourite = {favourites.includes(room.name)}
                                    onToggleFavourite = {() => toggleFavourite(room.name)}
                                />
                            )
                        })
                        }
                    </div>

                </div>
            </main>
            
        </div>
    )
}