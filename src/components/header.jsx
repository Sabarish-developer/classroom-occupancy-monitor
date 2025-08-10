import {Button} from "../components/ui/button";
import { Link } from "react-router-dom";
import { config } from "../config/config.js";

const handleGoogleLogin = () => {
    window.location.href = `${config.authServiceUrl}/google`;
}

export const Header = () => {
    return (
        <nav className="flex justify-between items-center p-4 sticky top-0 shadow-xs">
            <Link className="flex items-center justify-start">
                <img src='occupix.png' alt="OccupiX-logo" className="h-10"></img>
                <div className="text-sm md:text-base lg:text-xl font-bold ml-2">OccupiX</div>
            </Link>
            <div>
                <Button className='cursor-pointer' onClick={handleGoogleLogin}>
                    Login / Signup
                </Button>
            </div>
        </nav>
    );
}
