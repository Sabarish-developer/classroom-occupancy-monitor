import Sidebar from "../components/sidebar";
import { RoomCard } from "@/components/room-card";
import { useMemo, useState, useEffect } from "react";
import { SortButton } from "@/components/sort-button";
import { FilterButton } from "@/components/filter-button";
import { Button } from "@/components/ui/button";
import { useFetch } from "@/hooks/use-fetch";
import { config } from "@/config/config";
import { ClockLoader } from "react-spinners";
import {toast} from 'react-hot-toast';
import axios from "axios";


export const Dashboard = () => {

    const [rooms, setRooms] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const {data: cachedData, error: cachedError, loading: cachedLoading} = useFetch(`${config.occupancyServiceUrl}/data`);

    useEffect(()=>{
        setLoading(cachedLoading);
        if(!cachedLoading){
            if(cachedData) setRooms(cachedData.data);
            if(cachedError) setError(cachedError);
        }
    }, [cachedData, cachedError, cachedLoading])

    useEffect(() => {
        if(error){
            toast.error(error.message || 'Error fetching data');
        }
    }, [error]);

    const handleRefresh = async() => {
        try{
            setLoading(true);
            setError(null);
            const response = await axios.post(`${config.occupancyServiceUrl}/refresh`);
            setRooms(response.data.data);
            toast.success('Data fetched successfully')
        }
        catch(err){
            setError(err.message || 'Error fetching from Azure Digital Twins');
        }
        finally{
            setLoading(false);
        }
    }

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

    const [searchValue, setSearchValue] = useState('');
    const [sortValue, setSortValue] = useState('none');
    const [filterValue, setFilterValue] = useState('none');

    const filteredAndSortedRooms = useMemo(() => {
        let result = [...rooms];

        if(filterValue === 'favourites')
            result = result.filter(r => favourites.includes(r.name));
        else if(filterValue === 'canteen')
            result = result.filter(r => r.name.startsWith('Rec'));
        else if(filterValue === 'classroom')
            result = result.filter(r => /^[ABC]/.test(r.name) && r.name!=='Collab');
        else if(filterValue === 'staffroom')
            result = result.filter(r => !/^[A|B|C|Rec]/.test(r.name) || r.name==='Collab');

        if(sortValue === 'alphabetical')
            result = result.sort((a,b) => a.name.localeCompare(b.name))
        else if(sortValue === 'increasing')
            result = result.sort((a,b) => a.occupancy - b.occupancy);
        else if(sortValue === 'decreasing')
            result = result.sort((a,b) => b.occupancy - a.occupancy);

        if(searchValue.trim()){
            result = result.filter(r => r.name.toLowerCase().includes(searchValue.toLowerCase()));
        }

        return result;
    }, [rooms, filterValue, searchValue, sortValue, favourites])

    return (
        <div className="flex w-full">

            <Sidebar />

            <main className="flex-1">
                <div className="mx-auto w-full px-6">

                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl lg:text-4xl font-bold my-4">Occupancy Status</h1>
                        <Button className='bg-[#017a1e] cursor-pointer' onClick={handleRefresh}>Refresh</Button>
                    </div>
                
                    <div className="grid grid-cols-[1fr_auto] gap-4 mb-6">
                        <input
                        type="text"
                        placeholder="Search rooms..."
                        className="border border-gray-300 rounded-lg px-3 py-2 w-full"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        />
                        <div className="flex items-center gap-2">
                        <SortButton sortValue={sortValue} setSortValue={setSortValue}/>
                        <FilterButton filterValue={filterValue} setFilterValue={setFilterValue} />
                        </div>
                    </div>

                    {
                        loading ? 
                        (<div className="flex flex-col gap-1 items-center justify-center h-full w-full ">
                            <ClockLoader color={'#017a1e'}/>
                            <small className="pl-2 text-[#017a1e]">Loading...</small>
                        </div>) :
                        error ? 
                        (   <>
                                <div className="text-red-500">{error}, Please try again later</div>
                                <div>Kindly contact admin</div>
                            </>
                        ) : 
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-4 mx-auto h-fit w-full max-w-full justify-items-center">
                        {
                        filteredAndSortedRooms.map((room) => {
                            return (
                                <RoomCard 
                                    key = {room.name}
                                    room = {room}
                                    isFavourite = {favourites.includes(room.name)}
                                    onToggleFavourite = {() => toggleFavourite(room.name)}
                                />
                                )
                                })
                            }
                        </div>
                    }

                </div>
            </main>
            
        </div>
    )
}