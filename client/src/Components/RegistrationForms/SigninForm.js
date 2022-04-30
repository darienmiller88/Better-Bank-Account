import React, { useRef } from 'react'
import styles from "./RegistrationForms.module.scss"
import googleicon from "../../img/google_icon-nobg.png"
import axios from 'axios'
import { base } from "../BaseUrl/BaseUrl"

export default function SigninForm({ changeToSignup }) {
    const signinFormRef = useRef(null)

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
            const response = await axios.post(`${base}/api/v1/users/signin`, data)            
            console.log("data:", response.data);
        } catch (error) {
            const errorJSON = JSON.parse(error.request.response)

            console.log("err:", errorJSON, "status:", error.request.status)
        }

        signinFormRef.current.reset()
    }

    return(
        <form className={`${styles.registration} ${styles.signin}`} ref={signinFormRef} onSubmit={signInPostRequest}>
            <div className={styles.title}>
                Sign in
            </div>
            <div className={styles.input}>
                <label className={styles.form_label}>Username</label><br/>
                <input id="username" name="username" minLength="5" maxLength="15"/>
            </div>
            <div className={styles.input}>
                <label className={styles.form_label}>Password</label><br/>
                <input id="password" name="password" type="password"  minLength="5" maxLength="50"/>
            </div>   
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
            <hr style={{width: "80%", textAlign: "center"}}/>
            <div className={styles.create_account}>
                <button onClick={() => changeToSignup()}>
                    Create Account
                </button>
            </div>
        </form>
    )
}
