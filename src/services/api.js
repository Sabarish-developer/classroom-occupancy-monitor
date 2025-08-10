import axios from 'axios';
import { config } from '../config/config';

export const logout = async({setUser, navigate}) => {
    await axios.post(`${config.authServiceUrl}/logout`, {}, {withCredentials: true});
    setUser(null);
    navigate('/');
}