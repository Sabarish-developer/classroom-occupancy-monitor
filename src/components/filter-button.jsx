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
import { Funnel } from "lucide-react";

export const FilterButton = ({filterValue, setFilterValue}) => {

      return (
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button className='bg-[#017a1e] cursor-pointer border-0'>
                <Funnel size={25}/>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Filter by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={filterValue} onValueChange={setFilterValue}>
            <DropdownMenuRadioItem value="favourites" className='cursor-pointer'>Favourites</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="canteen" className='cursor-pointer'>Canteen</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="classroom" className='cursor-pointer'>Classroom</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="staffroom" className='cursor-pointer'>Staffroom</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="none" className='cursor-pointer'>None</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
        </DropdownMenuContent>
        </DropdownMenu>
  )
}