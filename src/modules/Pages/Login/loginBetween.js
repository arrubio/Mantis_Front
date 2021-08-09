import { useState, useCallback } from 'react';

const useLogin = () =>
{
    const [login, setLogin] = useState(localStorage.getItem("login"));

    const log = useCallback(() =>{
        setLogin("true")
        localStorage.setItem("login", "true");
    } , []);

    const unlog = useCallback(() => {
        setLogin("false")
        localStorage.setItem("login", "false");
    }, []);

    return{login, log, unlog};
};

export default useLogin;