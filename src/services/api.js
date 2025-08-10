import axios from 'axios';
import { config } from '../config/config';
import {toast} from 'react-hot-toast';

export const logout = async({setUser, navigate}) => {
    try{
        await axios.post(`${config.authServiceUrl}/logout`, {}, {withCredentials: true});
        setUser(null);
        navigate('/');
        toast.success("Logged out successfully!");
    }
    catch(e){
        console.error(e);
        toast.error('Log out failed');
    }
    
}