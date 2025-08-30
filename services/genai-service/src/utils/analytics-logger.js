import axios from 'axios';
import { config } from '../config/config.js';

export const eventLogger = async(userId) => {

    try{
        const name = 'Prompts';
        const properties = {userId: userId};
        await axios.post(`${config.analyticsServiceUrl}/log-event`,
            {name, properties},
            {headers: {
                Authorization: `Bearer ${config.serviceJwtSecret}`
            }}
        );
        console.log('Prompts log sent successfully');
    }
    catch(e){
        console.error(`Failed to send Prompts log`);
    }
}