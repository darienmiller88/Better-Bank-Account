import React, { useState } from 'react'
import styles from "./Dashboard.module.scss"
import logo from "../../img/logo2-nobg.png"
import MiniNav from '../../Components/MiniNav/MiniNav'


export default function Dashboard() {

    return (
        <div className={styles.dashboard}>
            <div className={styles.logo_nav}>
                <div className={styles.logo_wrapper}>
                    <img alt='logo' src={logo} />
                </div>
            </div>
            <MiniNav />
            <div className={styles.welcome}>Welcome, DARIEN</div>
            <div className={styles.last_sign_in}>Last sign on: Apr. 06, 2022 (5:14 AM ET) from computer.</div>
        </div>
    )
}
