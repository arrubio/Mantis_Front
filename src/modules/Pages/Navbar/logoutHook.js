import {useState} from "react";
import { Redirect } from 'react-router-dom';

const logOut = (schema) =>
{
    //const [logged, setLogin] = useState("");

    const loggedOut = (event) =>
    {
        if(localStorage.getItem('token'))    
        {
            localStorage.removeItem('token');
            <Redirect to="/login"/> 
        }
    };

    return{loggedOut};
};

export default logOut;