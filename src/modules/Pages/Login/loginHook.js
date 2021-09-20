import {useState} from "react";
import { useHistory } from 'react-router-dom';
import { useBetween } from 'use-between';
import useLogin from "./loginBetween";
const api = process.env.REACT_APP_LOGIN;


const useLoginForm = (schema) =>
{
    const [inputs, setInputs] = useState({});
    const [errors, setErrors] = useState("");
    //const [login, setLogin] = useState(localStorage.getItem("login"));
    const history = useHistory();

    const {log, unlog} = useBetween(useLogin);

    const handleSummit = (event) =>
    {
        event.preventDefault();
        console.log("Form Submitted");
        const {error} = validate();
        if(!error)
        {         
           
           //var req = JSON.stringify(inputs);
                
            var myHeaders = new Headers();
                myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
                var myInit = { method: 'POST',
                                headers: myHeaders,
                                body: new URLSearchParams({
                                    'username':inputs.username,
                                    'password':inputs.password
                                })};
                const myRequest = new Request(api, myInit);
                fetch(myRequest)
                .then(response => response.json())
                .then(data =>
                {
                    setErrors("");
                    //console.log(data.message);
                    //save the token
                    localStorage.setItem('token', data.access_token);
                    localStorage.setItem('login', true);
                    log();
                    
                }).catch(() => {
                    setErrors({message:"Error while getting the response"});
                    //setLogin("");
                });
        }
        else
        {
            console.log(error);
            if(error.message !== undefined && error.message.includes("password"))
            {
                error.message = "The password does not match the required pattern. At least 3 characters between numbers and letters";
            }
            setErrors(error);
        }

    };

    const handleInputChange = (event) =>
    {
        setInputs({...inputs, [event.target.name]: event.target.value});
    };

    const logout = (event) =>
    {
        if(localStorage.getItem('token'))    
        {
            //setLogin("");
            localStorage.setItem('login', false);
            localStorage.removeItem('token');
            let path = '/'; 
            history.push(path); 
            unlog();
        }
    };

    const validate = () => 
    {
        return schema.validate(inputs);
    }

    return{handleSummit, handleInputChange, errors, logout};
};

export default useLoginForm;