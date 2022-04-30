import React, { useState } from 'react'
import styles from "./RegistrationForms.module.scss";
import SignupForm from './SignupForm'
import SigninForm from './SigninForm';

export default function FormWrapper() {
    const [isSigningIn, setIsSigningIn] = useState(true);   
    const [showSignupErrors, setShowSignupErrors] = useState(false)
    const [showSigninErrors, setShowSigninErrors] = useState(false)

    const FormInput = () => {
        return (
            <>
                <div className={styles.input}>
                    <label className={styles.form_label}>Username</label><br/>
                    <input id="username" name="username" minLength="5" maxLength="15"/>
                </div>
                <ul className={styles.signup_errors}>

                </ul>
                <div className={styles.input}>
                    <label className={styles.form_label}>Password</label><br/>
                    <input id="password" name="password" type="password"  minLength="5" maxLength="50"/>
                </div>    
            </>
        )
    }

    return (
        <>
            {
                isSigningIn
                ?
                <SigninForm changeToSignup={() => setIsSigningIn(!isSigningIn)}/>
                :
                <SignupForm changeToSignin={() => setIsSigningIn(!isSigningIn)}/>
            }
        </>
    )
}
