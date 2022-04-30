import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { base } from "../../Components/BaseUrl/BaseUrl"

export default function Test() {
    const [arr, setArr] = useState([])
    const [errorMessage, setErrorMessage] = useState("")
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        axios.get(`${base}/api/v1/users/test`, { withCredentials: true })
            .then(response => setArr(response.data.test))
            .catch(err =>{
                console.log("err:", err.response.data.errTokenValidation)
                setErrorMessage(err.response.data.errTokenValidation)
                setIsError(true)
            })
    }, [])
    
    const login = () => {
        axios.post(`${base}/api/v1/users/signin`, {username: "darien88", password: "darien88"}, { withCredentials: true })
        .then(response => {            
            window.location.reload(false);
            console.log("you're in!", response.data)
        })
        .catch(err => {
            console.log("err:", err.response.data)
        })
    }

    const logout = () => {
        axios.post(`${base}/api/v1/users/signout`, {}, { withCredentials: true })
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
