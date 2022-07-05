import React, { useRef, useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import styles from "./RegistrationForms.module.scss"
import { userApi } from "../API/API"
import { useDispatch, useSelector } from "react-redux"
import { actionTypes } from "../../state/reducers/actionTypes"
import { gapi } from "gapi-script"
import { GoogleLogout } from "react-google-login"
import GoogleLoginButton from '../GoogleLoginButton/GoogleLoginButton';
import loading from "../../img/loading.gif"

export default function SigninForm({ changeToSignup }) {
    const signinFormRef = useRef(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const username = useSelector(state => state.username)
    const googleId = useSelector(state => state.googleId)
    const [isSigninError, setIsSigninError] = useState(false)
    const [signinError, setSigninError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const start = () => {
            gapi.client.init({
                clientId: process.env.REACT_APP_CLIENT_ID,
                scope: ""
            })
        }

        gapi.load("client:auth2", start)
    })
    
    console.log("client id:", process.env.REACT_APP_CLIENT_ID);

    const signInPostRequest = async (e) => {
        e.preventDefault()

        const formData = new FormData(signinFormRef.current)
        const username = formData.get("username")
        const password = formData.get("password")
        const remember_me = formData.get("remember_me") ? true : false
        const data = {
            username, 
            password, 
            remember_me 
        }

        try {
            setIsLoading(true)
            await userApi.post("/signin", data)
            setIsLoading(false)
            
            signinFormRef.current.reset()   
            dispatch({type: actionTypes.UPDATE_USERNAME, payload: username})   
            navigate("/dashboard")     
        } catch (error) {
            console.log("response:", error.response.data);
            setIsLoading(false)
            setSigninError(error.response.data)
            setIsSigninError(true)
        }
    }

    return(
        isLoading
        ?
        <img src={loading} alt="loading"/>
        :
        <form className={`${styles.registration} ${styles.signin}`} ref={signinFormRef} onSubmit={signInPostRequest}>
            <div className={styles.title}>
                Sign in
            </div>
            <div className={styles.input}>
                <label className={styles.form_label}>Username</label><br/>
                <input id="username" name="username" maxLength="15"/>
            </div>

            {
                isSigninError
                ?
                <div className={styles.signup_error}>
                    { signinError }
                </div>
                :
                null
            }

            <div className={styles.input}>
                <label className={styles.form_label}>Password</label><br/>
                <input id="password" name="password" type="password" maxLength="50"/>
            </div>   
            <div className={styles.checkbox}>
                <input type="checkbox" id="remember_me" name="remember_me"/>
                <label> Rembember me </label>
            </div>
            <div className={styles.submit}>
                <button className={styles.submit_form_button} onClick={signInPostRequest}>
                    Sign in
                </button>
                <GoogleLoginButton toggleGif={() => setIsLoading(!isLoading)}/>
                {/* <GoogleLogout 
                    clientId={process.env.REACT_APP_CLIENT_ID}
                    buttonText="Sign out"
                    onLogoutSuccess={() => {
                        console.log("log out success!")
                        navigate("/")
                    }}
                    render={renderProps => {
                        return (
                            <button onClick={renderProps.onClick}>Sign out</button>
                        )
                    }}
                /> */}
            </div>
            <hr style={{width: "80%", textAlign: "center"}}/>
            <div className={styles.create_account}>
                <button onClick={() => changeToSignup()}>
                    Create Account
                </button>
            </div>
        </form>
    )
}
