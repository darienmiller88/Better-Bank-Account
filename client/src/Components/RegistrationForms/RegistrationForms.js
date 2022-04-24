import React, { useState } from 'react'
import styles from "./RegistrationForms.module.scss"
import googleicon from "../../img/google_icon-nobg.png"

export default function SigninForm() {
    const [isSigningIn, setIsSigningIn] = useState(true);

    const signInPostRequest = () => {
        console.log("Signing in");
    }

    const signUpPostRequest = () => {
        console.log("Signing up");
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
        return(
            <div className={`${styles.registration} ${styles.signup}`}>
                <div className={styles.title}>
                    Sign up
                </div>
                <FormInput />
                <div className={styles.signin_redirect}>
                    Already have an account? <b onClick={() => setIsSigningIn(!isSigningIn)}> Sign in </b>
                </div>
                <div className={styles.submit}>
                    <button className={styles.submit_form_button} onClick={signUpPostRequest}>
                        Sign up
                    </button>
                </div>
            </div>
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