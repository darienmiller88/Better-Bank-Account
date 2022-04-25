import React, { useState, useRef } from 'react'
import styles from "./RegistrationForms.module.scss"
import googleicon from "../../img/google_icon-nobg.png"
import { base } from "../BaseUrl/BaseUrl"
import axios from "axios"

export default function SigninForm() {
    const [isSigningIn, setIsSigningIn] = useState(true);
    const signupFormRef = useRef(null)
    const signinFormRef = useRef(null)

    const signInPostRequest = (e) => {
        console.log("Signing in");
    }

   

    const FormInput = () => {
        return (
            <>
                <div className={styles.input}>
                    <label className={styles.form_label}>Username</label><br/>
                    <input id="username" name="username"/>
                </div>
                <div className={styles.input}>
                    <label className={styles.form_label}>Password</label><br/>
                    <input id="password" name="password" type="password"/>
                </div>    
            </>
        )
    }

    const SignupForm = () => {
        const signUpPostRequest = async (e) => {
            e.preventDefault()
    
            const formData = new FormData(signupFormRef.current)
            const username = formData.get("username")
            const password = formData.get("password")
            const data = {
                username, 
                password
            }
    
            const response = await axios.post(`${base}/api/v1/users`, data)
            console.log("response:", response.data);
            
            signupFormRef.current.reset()
        }

        return(
            <form className={`${styles.registration} ${styles.signup}`} onSubmit={signUpPostRequest} ref={signupFormRef}>
                <div className={styles.title}>
                    Sign up
                </div>
                <FormInput />
                <div className={styles.signin_redirect}>
                    Already have an account? <b onClick={() => setIsSigningIn(!isSigningIn)}> Sign in </b>
                </div>
                <div className={styles.submit}>
                    <button className={styles.submit_form_button}>
                        Sign up
                    </button>
                </div>
            </form>
        )
    }

    const SigninForm = () => {
        return(
            <div className={`${styles.registration} ${styles.signin}`}>
                <div className={styles.title}>
                    Sign in
                </div>
                <FormInput />
                <div className={styles.checkbox}>
                    <input type="checkbox" id="remember_me" name="remember_me"/>
                    <label> Rembember me </label>
                </div>
                <div className={styles.submit}>
                    <button className={styles.submit_form_button} onClick={signInPostRequest}>
                        Sign in
                    </button>
                    <a className={styles.google_button} href="/">
                        <div className={styles.google_icon_wrapper}>
                            <img src={googleicon} alt='icon' />
                        </div>
                        <div className={styles.button_text}>Sign in with google</div>
                    </a>
                </div>
                <hr  style={{width: "80%", textAlign: "center"}}/>
                <div className={styles.create_account}>
                    <button onClick={() => setIsSigningIn(!isSigningIn)}>
                        Create Account
                    </button>
                </div>
            </div>
        )
    }

    return (
        <>
            {
                isSigningIn
                ?
                <SigninForm />
                :
                <SignupForm />
            }
        </>
    )
}
