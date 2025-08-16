import {Button} from "../components/ui/button";
import { Link } from "react-router-dom";
import { config } from "../config/config.js";
import {useAuth} from '../hooks/use-auth.js';
import { useNavigate } from "react-router-dom";
import { logout } from "../services/api.js";
import {  LogOut, Menu } from "lucide-react";
import logo from '../assets/logo.png';
import googleLogo from '../assets/google.png';
import { Link as ScrollLink } from "react-scroll";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

const handleGoogleLogin = () => {
    window.location.href = `${config.authServiceUrl}/google`;
}

export const Header = () => {

    const {user, loading, setUser} = useAuth();
    const navigate = useNavigate();

    return (
        <nav className="flex justify-between items-center p-4 sticky top-0 shadow-sm z-50 bg-white">

            {/* Logo and title */}
            <Link to='/' className="flex items-center justify-start lg:pl-8">
                <img src={logo} alt="OccupiX-logo" className="h-10"></img>
                <div className="text-base md:text-lg lg:text-xl font-bold ml-1 italic">OccupiX</div>
            </Link>

            {/* Desktopn Navigation links */}
            <div className="hidden md:flex gap-16 font-bold text-lg">
                {["features", "about", "contact", "FAQs"].map((section) => (
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

            {/* Login button / Logout button */}
            <div className="hidden md:block">
                {
                    !user
                    ?
                    <div className="lg:pr-8">
                        <Button className='cursor-pointer border-[#0a7a1e] border-2 bg-white hover:bg-[#0a7a1e] text-black font-bold hover:text-white rounded-2xl' 
                        onClick={handleGoogleLogin}>
                            <img src={googleLogo} alt='Google logo' className="h-5"></img>
                            Login / Signup
                        </Button>
                    </div>
                    :
                    <div className="lg:pr-8">
                        <Button className='cursor-pointer border-red-500 border-2 bg-white hover:bg-red-500 text-black font-bold hover:text-white rounded-2xl' 
                        onClick={() => logout({ setUser, navigate })}>
                            <LogOut className="mr-2"/>
                            Log out
                        </Button>
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
                            { id: "FAQs", label: "FAQs" },
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
                        <Button
                            variant="destructive"
                            className="w-full mt-4"
                            onClick={() => logout({ setUser, navigate })}
                        >
                            <LogOut className="mr-2" />
                                Logout
                        </Button>
                    )}
                </div>
                </SheetContent>
                </Sheet>
            </div>
            
        </nav>
    );
}
