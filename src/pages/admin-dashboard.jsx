import Sidebar from '@/components/sidebar';
import {useState, useEffect} from 'react';
import { AdminComponent } from '@/components/admin-component';
import { useFetch } from '@/hooks/use-fetch';
import { config } from '@/config/config';
import toast from 'react-hot-toast';
import { ClockLoader } from 'react-spinners';

export const AdminDashboard = () => {

    const [open, setOpen] = useState(false); // sidebar state
    const [adminData, setAdminData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const {data:analyticsData, error:analyticsError, loading:analyticsLoading} = useFetch(`${config.analyticsServiceUrl}/admin-data`);

    useEffect(()=>{
        setLoading(analyticsLoading);
        if(!analyticsLoading){
            if(analyticsData) setAdminData(analyticsData.data);
            if(analyticsError) setError(analyticsError);
        }
    }, [analyticsData, analyticsError, analyticsLoading]);

    useEffect(()=>{
        if(error){
            toast.error(error.message || 'Error fetching data');
        }
    }, [error]);


  return (
        <div className='flex w-full'>
            <Sidebar open={open} setOpen={setOpen}/>

            <main className={`flex-1 ${open ? "md:ml-[16rem]" : "md:ml-[4rem]"} transition-all duration-500 overflow-x-hidden h-screen`}>
                {
                loading ? 
                (<div className="flex flex-col gap-1 items-center justify-center h-full w-full">
                            <ClockLoader color={'#017a1e'}/>
                            <small className="pl-2 text-[#017a1e]">Loading...</small>
                </div>) : 
                error ? 
                (   <>
                        <div className="text-red-500">{typeof error==='string' ? error : error.message}</div>
                        <div>Kindly contact admin</div>
                    </>
                ) :
                    <AdminComponent data={adminData}/>
                }
            </main>
        </div>
  );
};
