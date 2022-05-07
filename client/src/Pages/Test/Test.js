import React, { useEffect, useState } from 'react'
import { userApi } from "../../Components/API/API"

export default function Test() {
    const [arr, setArr] = useState([])
    const [errorMessage, setErrorMessage] = useState("")
    const [isError, setIsError] = useState(false)

    useEffect(() => {
            userApi.get("/test")
            .then(response => setArr(response.data.test))
            .catch(err =>{
                console.log("err:", err.response.data.errTokenValidation)
                setErrorMessage(err.response.data.errTokenValidation)
                setIsError(true)
            })
    }, [])
    
    const login = () => {
        userApi.post("/signin",  {username: "darien88", password: "darien88"})
        .then(response => {            
            window.location.reload(false);
            console.log("you're in!", response.data)
        })
        .catch(err => {
            console.log("err:", err.response.data)
        })
    }

    const logout = () => {
        userApi.post("/signout", {})
        .then(response => {
            window.location.reload(false);
            console.log(response.data)
        })
        .catch(err => console.log("err:", err))
    }

    return (
        <>
            <div>
                {
                    isError
                    ?
                    <h1 style={{color: "red", textAlign: "center"}}>
                        {errorMessage}
                    </h1>
                    :
                    arr.map((elem, i) => (
                        <li key={i}>
                            { elem }
                        </li>
                    ))
                }
            </div>

            <div style={{textAlign: "center"}}>
                <button style={{margin: "auto", padding: "10px"}} onClick={login}>Login</button>
                <button style={{margin: "auto", padding: "10px"}} onClick={logout}>Logout</button>
            </div>
            
        </>
    )
}
