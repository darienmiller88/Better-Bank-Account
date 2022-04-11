import React, { useState, useRef, useEffect } from 'react'
import styles from "./Dashboard.module.scss"
import logo from "../../img/logo2-nobg.png"
import MiniNav from '../../Components/MiniNav/MiniNav'
import Footer from "../../Containers/Footer/Footer"
import AccountLabel from '../../Components/AccountLabel/AccountLabel'
import BankResource from '../../Components/BankResource/BankResource'

export default function Dashboard() {
    const [isFirstButtonActive, setIsFirstButtonActive] = useState(false)
    const [isCheckingsLabelClicked, setIsCheckingsLabelClicked] = useState(false)
    const [isSavingsLabelClicked, setIsSavingsLabelClicked] = useState(false)
    
    const PhoneView = () => {
        return (
            <div className={styles.phone_menu}>
                <div className={styles.button_group}>
                    <button className={isFirstButtonActive ? styles.active_button : ""} onClick={() => setIsFirstButtonActive(true)}>
                        Accounts Overview
                    </button>
                    <button className={!isFirstButtonActive ? styles.active_button : ""} onClick={() => setIsFirstButtonActive(false)}>
                        Rewards & Resources
                    </button>
                </div>

                {
                    isFirstButtonActive
                    ?
                    <>
                        <AccountLabel 
                            accountType={"Checkings"} 
                            amount={136.12.toLocaleString("en-US")} 
                            onClick={() => setIsCheckingsLabelClicked(!isCheckingsLabelClicked)}
                            isLabelClicked={isCheckingsLabelClicked}
                        />
                        <AccountLabel 
                            accountType={"Savings"}   
                            amount={19651.14.toLocaleString("en-US")} 
                            onClick={() => setIsSavingsLabelClicked(!isSavingsLabelClicked)}
                            isLabelClicked={isSavingsLabelClicked}
                        />
                    </>
                    :
                    <>
                        <BankResource />
                        <BankResource />
                    </>
                }
            </div>
        )
    }

    const DesktopView = () => {
        return (
            <div className={styles.desktop_view}>
                <div className={styles.account_labels}>
                    <AccountLabel 
                        accountType={"Checkings"} 
                        amount={136.12.toLocaleString("en-US")} 
                        onClick={() => setIsCheckingsLabelClicked(!isCheckingsLabelClicked)}
                        isLabelClicked={isCheckingsLabelClicked}
                    />
                    <AccountLabel 
                        accountType={"Savings"}   
                        amount={19651.14.toLocaleString("en-US")} 
                        onClick={() => setIsSavingsLabelClicked(!isSavingsLabelClicked)}
                        isLabelClicked={isSavingsLabelClicked}
                    />
                </div>
                <div className={styles.resources}>
                    <BankResource />
                    <BankResource />
                </div>
            </div>
        )
    }

    return (
        <>
            <div className={styles.dashboard}>
                <div className={styles.logo_nav}>
                    <div className={styles.logo_wrapper}>
                        <img alt='logo' src={logo} />
                    </div>
                </div>
                <MiniNav />
                <div className={styles.welcome}>Welcome, DARIEN</div>
                <div className={styles.last_sign_in}>Last sign on: Apr. 06, 2022 (5:14 AM ET) from computer.</div>

                {/* For phone and tablet only */}
                <PhoneView />

                {/* For laptops and desktops */}
                <DesktopView />
            </div>
            <Footer />
        </>
    )
}
