import React, { useState } from 'react'
import { FaChevronDown, FaChevronUp } from "react-icons/fa"
import Account from '../Account/Account'
import styles from "./AccountLabel.module.scss"
import { useSelector } from "react-redux"

export default function AccountLabel({ accountType, amount, accountLabelOnClick, isLabelClicked, openModalFunctions }) {
    const [isShowingAccounts, setIsShowingAccounts] = useState(true)
    const accounts = useSelector(state => state.accounts)

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
                
                {/* <div className={styles.total}>
                    <div className={styles.total_label}>Total on Deposit</div>
                    <div className={styles.cash}>${amount}</div>
                </div> */}
            </div>
            {
                isLabelClicked
                ?
                <div className={styles.accounts}>
                    {
                        accounts.map((account, i)=> {
                             //console.log("account:", account, "i:", i)
                              return accountType === account.account_type ?
                                <Account
                                    accountName={account.account_name}
                                    availableBalance={account.available_balance}
                                    onDepositBalance={account.ondeposit_balance}
                                    openModalFunctions={openModalFunctions}
                                    accountID={account.ID}
                                    key={account.ID}
                                />
                                :
                                null
                        })
                    }
                </div>
                :
                null
            }
        </div>
    )
}
