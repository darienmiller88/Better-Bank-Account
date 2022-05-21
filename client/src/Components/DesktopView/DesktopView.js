import React, { useState } from 'react'
import styles from "./DesktopView.module.scss"
import AccountLabel from '../AccountLabel/AccountLabel'
import BankResource from '../BankResource/BankResource'
import { checkings, savings } from "../GetTotalDeposit/GetTotalDeposit"

export default function DesktopView({openWithdrawModal, openDepositModal, openTransferModal, openDeleteModal}) {
    const [isCheckingsLabelClicked, setIsCheckingsLabelClicked] = useState(false)
    const [isSavingsLabelClicked, setIsSavingsLabelClicked] = useState(false)

    return (
        <div className={styles.desktop_view}>
            <div className={styles.account_labels}>
                <AccountLabel 
                    accountType={checkings} 
                    // amount={totalCheckingAmount.toLocaleString("en-US")} 
                    accountLabelOnClick={() => setIsCheckingsLabelClicked(!isCheckingsLabelClicked)}
                    isLabelClicked={isCheckingsLabelClicked}
                    openModalFunctions={{
                        openDeleteModal,
                        openDepositModal,
                        openWithdrawModal,
                        openTransferModal
                    }}
                />
                <AccountLabel 
                    accountType={savings}   
                    // amount={totalSavingAmount.toLocaleString("en-US")} 
                    accountLabelOnClick={() => setIsSavingsLabelClicked(!isSavingsLabelClicked)}
                    isLabelClicked={isSavingsLabelClicked}
                    openModalFunctions={{
                        openDeleteModal,
                        openDepositModal,
                        openWithdrawModal, 
                        openTransferModal
                    }}
                />
            </div>
            <div className={styles.resources}>
                <BankResource />
                <BankResource />
            </div>
        </div>
    )
}
