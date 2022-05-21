import React, { useState } from 'react'
import styles from "./PhoneView.module.scss"
import AccountLabel from '../AccountLabel/AccountLabel'
import BankResource from '../BankResource/BankResource'
import { getTotalDeposit, checkings, savings } from "../GetTotalDeposit/GetTotalDeposit"

export default function PhoneView({openDepositModal, openWithdrawModal, openTransferModal, openDeleteModal}) {
    const [isFirstButtonActive, setIsFirstButtonActive] = useState(true)
    const [isCheckingsLabelClicked, setIsCheckingsLabelClicked] = useState(false)
    const [isSavingsLabelClicked, setIsSavingsLabelClicked] = useState(false)

    return (
        <div className={styles.phone_view}>
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
                        accountType={checkings} 
                        // amount={getTotalDeposit(accounts, checkings).toLocaleString("en-US")} 
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
                        // amount={getTotalDeposit(accounts, savings).toLocaleString("en-US")} 
                        accountLabelOnClick={() => setIsSavingsLabelClicked(!isSavingsLabelClicked)}
                        isLabelClicked={isSavingsLabelClicked}
                        openModalFunctions={{
                            openDeleteModal,
                            openDepositModal,
                            openWithdrawModal,
                            openTransferModal
                        }}
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
