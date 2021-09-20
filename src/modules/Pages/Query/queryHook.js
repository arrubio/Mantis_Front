import {useState} from "react";
import { useHistory } from 'react-router-dom';
const api = process.env.REACT_APP_QUERY;

const useQueryForm = (schema) =>
{
    const [inputs, setInputs] = useState({});
    const [errors, setErrors] = useState("");
    const [html, setHTML] = useState("");
    const history = useHistory();

    const handleSummit = (event) =>
    {
        event.preventDefault();

        

        console.log("Form Submitted");

        var req = JSON.stringify(inputs);

        if(req.includes("date_submitted"))
        {
            var myHeaders = new Headers();
            myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem("token"));
            myHeaders.append('Content-Type', 'application/json');
            
            var myInit = { method: 'POST',
                            headers: myHeaders,
                            body: req};
            const myRequest = new Request(api, myInit);

            fetch(myRequest)
                .then(response => response.json())
                .then(data =>
                {
                    if (data.length != 0) 
                    {
                        setErrors("");
                        localStorage.setItem('query', data);
                        //console.log(data.html);
                        setHTML(data);
                        let path = '/query_display'; 
                        history.push(path);
                    } 
                    else 
                    {
                        setErrors("No hay registros asociados a esa fecha");
                        //console.log(data.message);
                        //setHTML("");  
                    }     
                }).catch(() => 
                {
                        
                });
        }
        else
        {
            setErrors("Debe incluir una fecha");
        }
        
    };

    const handleInputChange = (event) =>
    {
        setInputs({...inputs, [event.target.name]: event.target.value});
    };

    const clear = (event) =>
    {
        setHTML("");
        setErrors("");
    };

    return{handleSummit, handleInputChange, errors, html, clear};
};

export default useQueryForm;