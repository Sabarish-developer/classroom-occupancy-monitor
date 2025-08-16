import { useState } from "react";
import {Button} from "../components/ui/button";
import { Link } from "react-router-dom";
import { config } from "../config/config.js";
import {useAuth} from '../hooks/use-auth.js';
import { useNavigate } from "react-router-dom";
import { logout } from "../services/api.js";
import { CircleUserRound, LogOut, HatGlasses, Menu } from "lucide-react";
import logo from '../assets/logo.png';
import googleLogo from '../assets/google.png';
import { Link as ScrollLink } from "react-scroll";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

const handleGoogleLogin = () => {
    window.location.href = `${config.authServiceUrl}/google`;
}

export const Header = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const {user, loading, setUser} = useAuth();
    const navigate = useNavigate();

    const scrollToSection = (id) => {
     const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <nav className="flex justify-between items-center p-4 sticky top-0 shadow-xs z-50">

            {/* Logo and title */}
            <Link className="flex items-center justify-start lg:pl-8">
                <img src={logo} alt="OccupiX-logo" className="h-10"></img>
                <div className="text-base md:text-lg lg:text-xl font-bold ml-1 italic">OccupiX</div>
            </Link>

            {/* Desktopn Navigation links */}
            <div className="hidden md:flex gap-16 font-bold text-lg">
                {["features", "about", "contact", "faqs"].map((section) => (
                <ScrollLink
                    key={section}
                    to={section} // section id in landing page
                    smooth={true}
                    duration={600}
                    spy={true}
                    offset={-80} // adjust so it doesn’t hide behind navbar
                    className="cursor-pointer relative after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-[#0a7a1e] after:transition-all after:duration-300 hover:after:w-full"
                >
                {section.charAt(0).toUpperCase() + section.slice(1)}
                </ScrollLink>
                ))}
            </div>

            {/* Login button / Profile button */}
            <div className="hidden md:block">
                {
                    !user
                    ?
                    <div className="lg:pr-8">
                        <Button className='cursor-pointer border-[#11f035] border-2 bg-white hover:bg-[#4cd964] text-black font-bold hover:text-white rounded-2xl' 
                        onClick={handleGoogleLogin}>
                            <img src={googleLogo} alt='Google logo' className="h-5"></img>
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
            

           <div className="md:hidden">
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="outline" size="icon" className="border-[#11f035]">
        <Menu className="h-6 w-6" />
      </Button>
    </SheetTrigger>
    <SheetContent side="right" className="p-6 space-y-6">
      
      {/* Links */}
      <div className="flex flex-col gap-6 text-lg font-bold">
        {[
          { id: "features", label: "Features" },
          { id: "about", label: "About Us" },
          { id: "contact", label: "Contact Us" },
          { id: "faqs", label: "FAQs" },
        ].map(({ id, label }) => (
          <ScrollLink
            key={id}
            to={id}
            smooth={true}
            duration={600}
            offset={-80}
            spy={true}
            onClick={() =>
              document.querySelector("button[aria-label='Close']")?.click()
            }
            className="cursor-pointer hover:underline transition-all"
          >
            {label}
          </ScrollLink>
        ))}
      </div>

      {/* Auth (Login / Profile) */}
      <div>
        {!user ? (
          <Button
            className="w-full cursor-pointer border-[#11f035] border-2 bg-white hover:bg-[#4cd964] text-black font-bold hover:text-white rounded-2xl"
            onClick={handleGoogleLogin}
          >
            <img src={googleLogo} alt="Google logo" className="h-5 mr-2" />
            Login / Signup
          </Button>
        ) : (
          <div>
            <p className="font-bold">{user?.name}</p>
            <p className="text-sm text-gray-500">{user?.email}</p>
            <Button
              variant="destructive"
              className="mt-4 w-full"
              onClick={() => logout({ setUser, navigate })}
            >
              Log out
            </Button>
          </div>
        )}
      </div>
    </SheetContent>
  </Sheet>
</div>
            
        </nav>
    );
}
