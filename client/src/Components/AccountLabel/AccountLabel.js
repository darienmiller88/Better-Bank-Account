import React, { useState } from 'react'
import { FaChevronDown, FaChevronUp } from "react-icons/fa"
import Account from '../Account/Account'
import styles from "./AccountLabel.module.scss"

export default function AccountLabel({ accountType, amount, accountLabelOnClick, isLabelClicked }) {
    const [isShowingAccounts, setIsShowingAccounts] = useState(true)

    const toggleAccounts = () => {        
        setIsShowingAccounts(!isShowingAccounts)
        accountLabelOnClick()
    }

    return (
        <div className={styles.account_label_wrapper}>
            <div className={styles.account_label} onClick={toggleAccounts}>
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
            {
                isLabelClicked
                ?
                <div className={styles.accounts}>
                    <Account
                        accountName={"Checkings-4327"}
                        balance={amount}
                    />
                </div>
                :
                null
            }
            
        </div>
    )
}
