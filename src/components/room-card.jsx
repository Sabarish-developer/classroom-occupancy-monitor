import { Star } from "lucide-react"

export const RoomCard = ({room, isFavourite, onToggleFavourite}) => {

    const Tag = ({capacity, occupancy}) => {

        const ratio = occupancy/capacity;

        if(ratio <= 0.3)
            return <span className="text-xs font-[500] bg-green-100 text-green-800 py-1 px-3 rounded-2xl">Available</span>
        else if(ratio <= 0.7)
            return <span className="text-xs font-[500] bg-yellow-100 text-yellow-800 py-1 px-3 rounded-2xl">Busy</span>
        else
            return <span className="text-xs font-[500] bg-red-100 text-red-800 py-1 px-3 rounded-2xl">Crowded</span>
    }


    return (
        <div className="flex flex-col gap-0.5 w-full max-w-sm p-4 rounded-xl 
                        max-h-max hover:shadow-[#0a7a1e] hover:shadow-xl border border-[#0a7a1e]">
            <div className="flex justify-between">
                <h2 className="font-bold text-xl lg:text-2xl capitalize">{room.name}</h2>
                <span title = {isFavourite ? 'Remove from favourites' : 'Add to favourites'}>
                    <Star size={15} 
                      onClick={onToggleFavourite}
                      fill={isFavourite ? 'gold' : 'none'} 
                      stroke={'gray'} 
                      className="cursor-pointer" 
                    />
                </span>
                
            </div>
            <p className="text-[10px] md:text-xs  text-gray-500">Capacity: {room.capacity}</p>
            <p className="text-[10px] md:text-xs text-gray-500">Occupancy: {room.occupancy}</p>
            <div className="mt-2">
                <Tag capacity={room.capacity} occupancy={room.occupancy} />
            </div>
        </div>
    )
}