import React from 'react'
import styles from "./About.module.scss"
import creditCard from "../../img/creditcard_nobg.png"

export default function About() {
    return (
        <div className={styles.about_section}>
            <div className={styles.wrapper}>
                <div className={styles.title}>
                    Welcome to Miller Banking, the best rated bank in North America!
                </div>

                <div className={styles.bonus}>
                    Earn 20,000 bonus points after qualifying purchases plus our low intro APR for over one year.
                </div>

                <div className={styles.credit_card}>
                    <img src={creditCard} alt="credit card" />
                </div>
            </div>
        </div>
    )
}
