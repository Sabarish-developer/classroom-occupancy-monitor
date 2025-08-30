import axios from 'axios';
import {config} from '../config/config.js';

export const metricLogger = async(name, value) => {

    try{
        await axios.post(`${config.analyticsUrl}/log-metric`, 
            {name, value},
            {
                headers: {
                    Authorization: `Bearer ${config.serviceJwtSecret}`
                }
            }
        );
        console.log(name, ' log sent successfully to Analytics service');
    }
    catch(err){
        console.error(`Failed to send metric ${name}: `, err.message);
    }
}

