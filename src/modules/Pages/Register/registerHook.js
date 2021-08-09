import {useState} from "react";
const api = process.env.REACT_APP_REGISTER;

const useRegisterForm = (schema) =>
{
    const [inputs, setInputs] = useState({});
    const [errors, setErrors] = useState("");
    const [succ, setSuccess] = useState("");
    

    const handleSummit = (event) =>
    {
        event.preventDefault();
        const {error} = validate();
        if(!error)
        {
            console.log("Form Submitted");
            setErrors("");
            setSuccess("Account Successfully Created");
            
            var req = JSON.stringify(inputs);
                
            var myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');

            var myInit = { method: 'POST',
                            headers: myHeaders,
                            body: req};
            const myRequest = new Request(api, myInit);
            fetch(myRequest)
            .then(response => response.json())
            .then(data =>
            {
                if (data.success === true) 
                {
                    setErrors("");
                    console.log(data.message);
                    //show succ message
                    } 
                    else 
                    {
                        setErrors(data);
                    }
                    
                }).catch(() => {
                    setErrors({message:"Error while getting the response"});
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

    const validate = () => 
    {
        return schema.validate(inputs);
    }

    return{handleSummit, handleInputChange, errors, succ};
};

export default useRegisterForm;