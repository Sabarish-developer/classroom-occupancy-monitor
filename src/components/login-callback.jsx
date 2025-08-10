import { useNavigate } from "react-router";
import { useAuth } from "../hooks/use-auth";
import { useEffect } from "react";
import {toast} from 'react-hot-toast';
import { BarLoader } from "react-spinners";

export const LoginCallback = () => {

    const navigate = useNavigate();
    const {initialized, user} = useAuth();

    useEffect(()=>{
        if(initialized && user){
            toast.success("Logged in successfully!");
            navigate('/dashboard');
        }
    }, [initialized, user]);

    return <BarLoader width={'100%'} color='#22c55e' />
}