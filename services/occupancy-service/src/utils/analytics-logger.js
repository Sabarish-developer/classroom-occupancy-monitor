import axios from 'axios';
import { config } from '../config/config.js';

export const eventLogger = async(data) => {

    try{
        const name = 'AllRoomsOccupancy';
        const properties = {};
        data.forEach(d => {
            const key = String(d.name);
            const value = String(d.occupancy);
            properties[key] = value;
        })
        await axios.post(`${config.analyticsServiceUrl}/log-event`, 
            {name, properties},
            {
                headers: {
                    Authorization: `Bearer ${config.serviceJwtSecret}`
                }
            }
        );
        console.log(name, 'log is sent to analytics service successfully');
    }
    catch(e){
        console.error(`Failed to send AllRoomsOccupancy log: `, e.message);
    }
}