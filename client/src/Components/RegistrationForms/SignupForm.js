import React, { useRef, useState } from 'react'
import { useNavigate } from "react-router-dom";
import styles from "./RegistrationForms.module.scss"
import axios from 'axios'
import { base } from "../BaseUrl/BaseUrl"
import { useDispatch } from "react-redux"
import { actionTypes } from "../../state/reducers/actionTypes"

export default function SignupForm({ changeToSignin }) {
    const signupFormRef = useRef(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isUsernameError, setIsUsernameError] = useState(false)
    const [usernameErrorMessage, setUsernameErrorMessage] = useState("")
    const [isPasswordError, setIsPasswordError] = useState(false)
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("")

    const signUpPostRequest = async (e) => {
        e.preventDefault()

        const formData = new FormData(signupFormRef.current)
        const username = formData.get("username")
        const password = formData.get("password")
        const data = {
            username, 
            password
        }

        try {
            await axios.post(`${base}/signup`, data)  
            dispatch({type: actionTypes.UPDATE_USERNAME, payload: username})  
            navigate("/dashboard")        
            signupFormRef.current.reset()
        } catch (error) {
            console.log("err:", error.response.data);

            if(error.response.data.errUsernameTaken || error.response.data.username){
                setUsernameErrorMessage(error.response.data.errUsernameTaken)
                setIsUsernameError(true)
            } 
            if(error.response.data.password){
                setPasswordErrorMessage(error.response.data.password)
                setIsPasswordError(true)
            }
        }
    }

    return(
        <form className={`${styles.registration} ${styles.signup}`} onSubmit={signUpPostRequest} ref={signupFormRef}>
            <div className={styles.title}>
                Sign up
            </div>
            <div className={styles.input}>
                <label className={styles.form_label}>Username</label><br/>
                <input id="username" name="username" minLength="6" maxLength="15" required/>
            </div>

            {
                isUsernameError
                ?
                <div className={styles.signup_error}>
                    { usernameErrorMessage }
                </div>
                :
                null
            }
            
            <div className={styles.input}>
                <label className={styles.form_label}>Password</label><br/>
                <input id="password" name="password" type="password"  minLength="6" maxLength="50" required/>
            </div>    

            {
                isPasswordError
                ?
                <div className={styles.signup_error}>
                    { passwordErrorMessage }
                </div>
                :
                null
            }

            <div className={styles.signin_redirect}>
                Already have an account? <b onClick={() => changeToSignin()}> Sign in </b>
            </div>
            <div className={styles.submit}>
                <button className={styles.submit_form_button}>
                    Sign up
                </button> 
            </div>
        </form>
    )
}
