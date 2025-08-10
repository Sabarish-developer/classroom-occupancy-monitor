import {Button} from "../components/ui/button";
import { Link } from "react-router-dom";
import { config } from "../config/config.js";
import {useAuth} from '../hooks/use-auth.js';
import { useNavigate } from "react-router-dom";
import { logout } from "../services/api.js";
import { CircleUserRound, LogOut, HatGlasses } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const handleGoogleLogin = () => {
    window.location.href = `${config.authServiceUrl}/google`;
}

export const Header = () => {

    const {user, loading, setUser} = useAuth();
    const navigate = useNavigate();

    return (
        <nav className="flex justify-between items-center p-4 sticky top-0 shadow-xs">
            <Link className="flex items-center justify-start lg:pl-8">
                <img src='occupix.png' alt="OccupiX-logo" className="h-10"></img>
                <div className="text-sm md:text-base lg:text-xl font-bold ml-2">OccupiX</div>
            </Link>
            <div>
                {
                    !user
                    ?
                    <div className="lg:pr-8">
                        <Button className='cursor-pointer' onClick={handleGoogleLogin}>
                        <img src='google.png' alt='Google logo' className="h-5"></img>
                        Login / Signup
                        </Button>
                    </div>
                    :
                    <div className="lg:pr-8 ">
                         <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className='flex gap-2 cursor-pointer'>
                                    <CircleUserRound />
                                    {user?.name.split(" ")[0]}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="start">
                                <DropdownMenuLabel>
                                <div className="flex gap-2">
                                    <HatGlasses />
                                    <span className="font-bold">My Account</span>
                                </div>
                                </DropdownMenuLabel>
                                <DropdownMenuGroup>
                                    <DropdownMenuItem className='flex flex-wrap'>
                                        <span className="font-bold">Name:</span> {user?.name}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <span className="font-bold">Role: </span>{user?.role}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className='flex flex-wrap'>
                                        <span className="font-bold">Email:</span>{user.email}
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                                <DropdownMenuItem className='cursor-pointer' onClick={()=>logout({setUser, navigate})}>
                                    <div className="flex gap-2">
                                        <LogOut color='red'/>
                                        <span className="text-red-500">Log out</span>
                                    </div>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                }
            </div>
            
        </nav>
    );
}
