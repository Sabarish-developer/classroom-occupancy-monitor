import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ArrowDownUp } from "lucide-react";

export const SortButton = ({sortValue, setSortValue}) => {

      return (
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button className='bg-[#017a1e] cursor-pointer border-0'>
                <ArrowDownUp size={25} />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={sortValue} onValueChange={setSortValue}>
            <DropdownMenuRadioItem value="alphabetical" className='cursor-pointer'>Alphabetical</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="increasing" className='cursor-pointer'>Increasing occupancy</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="decreasing" className='cursor-pointer'>Decreasing occupancy</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="none" className='cursor-pointer'>None</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
        </DropdownMenuContent>
        </DropdownMenu>
  )
}