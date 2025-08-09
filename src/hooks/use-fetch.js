import {useState, useEffect} from 'react';
import axios from 'axios';

export const useFetch = (url, options={}, refreshInterval=null) => {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{

        let isMounted = true; // To safely check whenever state update occurs the component is mounted

        const fetchData = async() => {

            try{
                setLoading(true);
                const res = await axios.get(url, options);
                if(isMounted){
                    setData(res.data);
                    setError(null);
                }
            }
            catch(e){
                if(isMounted){
                    setError(e);
                    setData(null);
                }
            }
            finally{
                if(isMounted){
                    setLoading(false);
                }
            }
        }
        fetchData();

        // Periodically fetching the data
        let intervalId = null;
        if(refreshInterval){
            intervalId = setInterval(fetchData, refreshInterval);
        }

        return () => {
            isMounted = false;
            if(intervalId) clearInterval(intervalId);
        }

    }, [url, options, refreshInterval])

    return {data, error, loading};
}
