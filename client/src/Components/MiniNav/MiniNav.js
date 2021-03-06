import React, { useState } from 'react'
import styles from "./MiniNav.module.scss"
import { BiMenu, BiX } from "react-icons/bi"
import { FaAngleRight } from "react-icons/fa"
import { userApi } from "../API/API"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"
import { actionTypes } from "../../state/reducers/actionTypes"
import { GoogleLogout } from "react-google-login"

export default function MiniNav({ displayTransfers, displayAccounts }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isPhoneMenuActive, setIsPhoneMenuActive] = useState(false)

    const toggleMenu = () => {
        setIsPhoneMenuActive(!isPhoneMenuActive)
    }

    const toggleTransfers = () => {
        displayTransfers(true)
        displayAccounts(false)
    }

    const toggleAccounts = () => {
        displayTransfers(false)
        displayAccounts(true)
    }

    const signout = async () => {
        await userApi.post("/signout")

        dispatch({type: actionTypes.CLEAR})
        navigate("/")
    }

    return (
        <>
            <div className={styles.mini_nav}>
                {
                    isPhoneMenuActive
                    ?
                    <BiX className={styles.hamburger_menu} onClick={toggleMenu} />
                    :
                    <BiMenu className={styles.hamburger_menu} onClick={toggleMenu}/>
                }
                <div className={styles.links}>
                    <div className={styles.link} onClick={toggleAccounts}>
                        Accounts
                    </div>
                    <div className={styles.link} onClick={toggleTransfers}>
                        Transfers
                    </div>
                    <div className={`${styles.link} ${styles.open_account}`}>
                        Profile
                        {/* <FaAngleRight className={styles.link_icon} /> */}
                    </div>
                </div>
                
                <GoogleLogout 
                    clientId={process.env.REACT_APP_CLIENT_ID}
                    onLogoutSuccess={signout}
                    render={renderProps => {
                        return (
                            <div className={styles.signout} onClick={renderProps.onClick}>
                                Sign out
                            </div>
                        )
                    }}
                />
                
            </div>

            {
                isPhoneMenuActive
                ?
                <div className={styles.phone_menu}>
                    <div className={styles.link} onClick={() => {toggleAccounts(); toggleMenu()}}>
                        Accounts
                        <FaAngleRight className={styles.link_icon} />
                    </div>
                    <div className={styles.link} onClick={() => {toggleTransfers(); toggleMenu()}}>
                        Transfers
                        <FaAngleRight className={styles.link_icon} />
                    </div>
                    <div className={styles.link}>
                        Profile
                        <FaAngleRight className={styles.link_icon} />
                    </div>
                </div>
                :
                null
            }
        </>
    )
}
