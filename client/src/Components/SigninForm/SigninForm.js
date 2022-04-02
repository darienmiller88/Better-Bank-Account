import React, { useState } from 'react'
import styles from "./SigninForm.module.scss"

export default function SigninForm() {
    const [isSigningIn, setIsSigningIn] = useState(true);

    const signInPostRequest = () => {
        console.log("Signing in");
    }

    const signUpPostRequest = () => {
        console.log("Signing up");
    }

    return (
        <div className={styles.signin}>
            <div className={styles.title}>
                {
                    isSigningIn ? "Sign in" : "Sign up"
                }
            </div>
            <div className={styles.input}>
                <label className={styles.form_label}>Username</label><br/>
                <input id="username" name="username"/>
            </div>
            <div className={styles.input}>
                <label className={styles.form_label}>Password</label><br/>
                <input id="password" name="password" type="password"/>
            </div>
            {
                isSigningIn
                ?
                <div className={styles.checkbox}>
                    <input type="checkbox" id="remember_me" name="remember_me"/>
                    <label> Rembember me </label>
                </div>
                :
                null
            }
            
            {
                isSigningIn
                ?
                null
                :
                <div className={styles.signin_redirect}>
                    Already have an account? <b onClick={() => setIsSigningIn(!isSigningIn)}> Sign in </b>
                </div>
            }

            <div className={styles.submit}>
                {
                    isSigningIn
                    ?
                    <button onClick={signInPostRequest}>
                        Sign in
                    </button>
                    :
                    <button onClick={signUpPostRequest}>
                        Sign up
                    </button>
                }
            </div>

            {
                isSigningIn
                ?
                <>
                    <hr  style={{width: "80%", textAlign: "center"}}/>
                    <div className={styles.create_account}>
                        <button onClick={() => setIsSigningIn(!isSigningIn)}>
                            Create Account
                        </button>
                    </div>
                </>
                :
                null
            }
            
        </div>
    )
}
