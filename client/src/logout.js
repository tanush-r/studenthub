import axios from "axios";
import { useNavigate} from 'react-router-dom';
import { useEffect } from "react";

export default function LogOut() {
        const navigate = useNavigate()
        useEffect( () => {
                axios.get('/session_logout_api')
                navigate('/')
        },[])
        
}