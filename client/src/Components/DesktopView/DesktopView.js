import React, { useState, useEffect } from 'react'
import styles from "./DesktopView.module.scss"
import AccountLabel from '../AccountLabel/AccountLabel'
import BankResource from '../BankResource/BankResource'
import { useSelector } from "react-redux"
import { getTotalDeposit, checkings, savings } from "../GetTotalDeposit/GetTotalDeposit"

export default function DesktopView() {
    const [isCheckingsLabelClicked, setIsCheckingsLabelClicked] = useState(false)
    const [isSavingsLabelClicked, setIsSavingsLabelClicked] = useState(false)
    const [totalSavingAmount, setTotalSavingAmount] = useState(0.0)
    const [totalCheckingAmount, setTotalCheckingAmount] = useState(0.0)
    const accounts = useSelector(state => state.accounts)

    useEffect(() => {
        if(accounts.length > 0 && accounts[accounts.length - 1].accountType === checkings){
            setTotalCheckingAmount(getTotalDeposit(accounts, checkings))
        }else if(accounts.length > 0 && accounts[accounts.length - 1].accountType === savings){
            setTotalSavingAmount(getTotalDeposit(accounts, savings))
        }
    }, [accounts.length])
 
    console.log("len:", accounts.length);

    return (
        <div className={styles.desktop_view}>
            <div className={styles.account_labels}>
                <AccountLabel 
                    accountType={checkings} 
                    // amount={totalCheckingAmount.toLocaleString("en-US")} 
                    accountLabelOnClick={() => setIsCheckingsLabelClicked(!isCheckingsLabelClicked)}
                    isLabelClicked={isCheckingsLabelClicked}
                />
                <AccountLabel 
                    accountType={savings}   
                    // amount={totalSavingAmount.toLocaleString("en-US")} 
                    accountLabelOnClick={() => setIsSavingsLabelClicked(!isSavingsLabelClicked)}
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
