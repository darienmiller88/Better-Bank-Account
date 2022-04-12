import React from 'react'
import styles from "./Account.module.scss"

export default function Account({accountName, balance}) {
    return (
        <div className={styles.account}>                
            <div className={styles.account_name}>{accountName}</div>

            <div className={styles.options}>
                <div className={styles.option}>Transfer</div>
                <div className={styles.option}>Withdraw Funds</div>
                <div className={styles.option}>Add Funds</div>
                <div className={styles.option}>Delete</div>
            </div>

            <div className={styles.funds_wrapper}>
                <div className={styles.available_now_wrapper}>
                    <div className={styles.available_now}>Available Now</div>
                    <div className={styles.available_balance}>${balance}</div>
                </div>
                <div className={styles.on_deposit_wrapper}>
                    <div className={styles.on_deposit}>On Deposit</div>
                    <div className={styles.on_deposit_balance}>${balance}</div>
                </div>
            </div>
        </div>
    )
}
