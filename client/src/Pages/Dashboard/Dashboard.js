import React, { useState } from 'react'
import styles from "./Dashboard.module.scss"
import Footer from "../../Containers/Footer/Footer"
import logo from "../../img/mdlogo.png"
import MiniNav from '../../Components/MiniNav/MiniNav'
import DisplayAccounts from '../../Containers/DisplayAccounts/DisplayAccounts'
import Transfers from '../../Containers/Transfers/Transfers'

export default function Dashboard() {
    const [displayAccounts, setDisplayAccounts] = useState(true)
    const [displayTransfers, setDisplayTransfers] = useState(false)
    
    return (
        <>
            <div className={styles.dashboard}>
                <div className={styles.logo_nav}>
                    <div className={styles.logo_wrapper}>
                        <img alt='logo' src={logo} />
                    </div>
                </div>
                <MiniNav displayAccounts={setDisplayAccounts} displayTransfers={setDisplayTransfers}/>

                {
                    displayAccounts
                    ?
                    <DisplayAccounts />
                    :
                    displayTransfers
                    ?
                    <Transfers />
                    :
                    null
                }

            </div>
            <Footer />
        </>
    )
}
