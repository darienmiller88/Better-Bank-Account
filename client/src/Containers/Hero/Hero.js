import React, { useState } from 'react'
import styles from "./Hero.module.scss"
import Form from '../../Components/RegistrationForms/RegistrationForms'
import loading from "../../img/loading.gif"

export default function Hero() {
    return (
        <div className={styles.hero}>
            <div className={styles.wrapper}>
                <div className={styles.slogan}>
                    <div className={styles.title}>
                        Banking has never been easier!
                    </div>
                    
                    <div className={styles.description}>
                        Open a new Checking account and set up direct deposit to receive a $225 coupon.
                    </div>

                    <button>
                        Learn More
                    </button>
                </div>

                <div className={styles.form_wrapper}>
                    <Form />
                </div>
            </div>
        </div>
    )
}
