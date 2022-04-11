import React from 'react'
import styles from "./BankResource.module.scss"
import { FaChevronRight } from "react-icons/fa"

export default function BankResource() {
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
                <hr style={{width: "85%"}}/>
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
