import React from 'react'
import styles from "./Account.module.scss"
import { useDispatch } from "react-redux"
import { actionTypes } from "../../state/reducers/actionTypes"

export default function Account({accountName, accountID, availableBalance, onDepositBalance, openModalFunctions}) {
    const dispatch = useDispatch()

    const updateCurrentAccount = (openModal) => {
        dispatch({type: actionTypes.UPDATE_ACCOUNT_NAME, payload: accountName})
        openModal()
    }

    return (
        <div className={styles.account} id={accountID}>                
            <div className={styles.account_name}>{accountName}</div>

            <div className={styles.options}>
                <div className={styles.option} onClick={() => updateCurrentAccount(openModalFunctions.openTransferModal)}>Transfer</div>
                <div className={styles.option} onClick={() => updateCurrentAccount(openModalFunctions.openWithdrawModal)}>Withdraw Funds</div>
                <div className={styles.option} onClick={() => updateCurrentAccount(openModalFunctions.openDepositModal)}>Add Funds</div>
                <div className={styles.option} onClick={() => updateCurrentAccount(openModalFunctions.openDeleteModal)}>Delete</div>
            </div>

            <div className={styles.funds_wrapper}>
                <div className={styles.available_now_wrapper}>
                    <div className={styles.available_now}>Available Now</div>
                    <div className={styles.available_balance}>${availableBalance}</div>
                </div>
                <div className={styles.on_deposit_wrapper}>
                    <div className={styles.on_deposit}>On Deposit</div>
                    <div className={styles.on_deposit_balance}>${onDepositBalance}</div>
                </div>
            </div>
        </div>
    )
}
