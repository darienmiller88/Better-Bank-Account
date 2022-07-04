import React from 'react'
import styles from "./GoogleLoginButton.module.scss"
import googleicon from "../../img/google_icon-nobg.png"
import { GoogleLogin } from "react-google-login"
import { userApi } from "../API/API"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"
import { actionTypes } from "../../state/reducers/actionTypes"

export default function GoogleLoginButton({ toggleGif }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onSuccess = async (res) => {        
        try {
            toggleGif()
            await userApi.post("/auth/google", {tokenId: res.tokenId, googleId: res.googleId})
            toggleGif()

            dispatch({type: actionTypes.UPDATE_GOOGLE_ID, payload: res.googleId})
            dispatch({type: actionTypes.UPDATE_USERNAME, payload: res.profileObj.name})
            navigate("/dashboard")
        } catch (error) {
            console.log("err:", error.response);
        }
    }

    const onFailure = (res) => {
        console.log("LOGIN FAILED: result", res);
    }

    const CustomButton = ({ onClick, disabled }) => {
        return(
            <button onClick={onClick} disabled={disabled} className={styles.custom_button}>
                <div className={styles.text_wrapper}>
                    <img src={googleicon} alt='icon' width="25px" height="25px"/>
                    <span>Sign in with google</span>
                </div>
            </button>
        )
    }


    return (
        <div className={styles.google_login_wrapper}>
            <GoogleLogin 
                clientId={process.env.REACT_APP_CLIENT_ID}
                render={renderProps =>{
                    return <CustomButton 
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                    />
                }}
                isSignedIn={true}
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={"single_host_origin"}
            />
        </div>
    )
}
