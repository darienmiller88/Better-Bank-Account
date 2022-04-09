import React, { useState, useRef, useEffect } from 'react'
import { FaChevronDown, FaChevronUp, FaChevronRight } from "react-icons/fa"
import styles from "./Dashboard.module.scss"
import logo from "../../img/logo2-nobg.png"
import MiniNav from '../../Components/MiniNav/MiniNav'
import Footer from "../../Containers/Footer/Footer"


export default function Dashboard() {
    const [isFirstButtonActive, setIsFirstButtonActive] = useState(false)
    const [isCheckingsLabelClicked, setIsCheckingsLabelClicked] = useState(false)
    const [isSavingsLabelClicked, setIsSavingsLabelClicked] = useState(false)
   
    const AccountLabel = ({ accountType, amount, onClick, isLabelClicked }) => {
        return (
            <div className={styles.account_label} onClick={onClick}>
                <div className={styles.account_type_wrapper}>
                    {
                        isLabelClicked
                        ?
                        <FaChevronUp className={`${styles.up_icon}`}/>
                        :
                        <FaChevronDown className={`${styles.up_icon}`}/>
                    }
                    
                    <div className={styles.account_type}>{accountType}</div>
                </div>
                
                <div className={styles.total}>
                    <div className={styles.total_label}>Total on Deposit</div>
                    <div className={styles.cash}>${amount}</div>
                </div>
            </div>
        )
    }

    const BankResource = () => {
        return (
            <div className={styles.bank_resource}>
                <div className={styles.resource_name}>
                    MD Personal Loan
                </div>
                <div className={styles.resource_description_wrapper}>
                    <div className={styles.resource_subtitle}>
                        Pay off High Interest debt with MB Bank's famous no interest loans!
                    </div>
                    <div className={styles.resource_description}>
                        MD Bank loans are famous for being the first and only banks in North America
                        to offer no interest loans for borrowers with extreme debt.
                    </div>
                    <hr style={{width: "80%"}}/>
                    <div className={styles.apply_now_wrapper}>
                        <div className={styles.apply_now}>
                            Apply Now
                        </div>
                        <FaChevronRight className={styles.icon}/>
                    </div>
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
        <Footer />
        </>

    )
}
