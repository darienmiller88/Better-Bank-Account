import React from 'react'
import styles from "./Account.module.scss"

export default function Account() {
    return (
        <div className={styles.account}>                
            <div className={styles.account_name}>Checkings-4327</div>
            
            <div className={styles.options}>
                <div className={styles.option}>Transfer</div>
                <div className={styles.option}>Withdraw Funds</div>
                <div className={styles.option}>Add Funds</div>
            </div>

            <div className={styles.funds_wrapper}>
                <div className={styles.available_now_wrapper}>
                    <div className={styles.available_now}>Available Now</div>
                    <div className={styles.available_balance}>$88.82</div>
                </div>
                <div className={styles.on_deposit_wrapper}>
                    <div className={styles.on_deposit}>On Deposit</div>
                    <div className={styles.on_deposit_balance}>$88.82</div>
                </div>
            </div>
        </div>
    )
}
