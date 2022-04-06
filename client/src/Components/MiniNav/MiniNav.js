import React, { useState } from 'react'
import styles from "./MiniNav.module.scss"

import { BiMenu, BiX } from "react-icons/bi"
import { BsChevronRight } from "react-icons/bs"

export default function MiniNav() {
    const [isPhoneMenuActive, setIsPhoneMenuActive] = useState(false)

    const toggleMenu = () => {
        setIsPhoneMenuActive(!isPhoneMenuActive)
    }

    return (
        <>
            <div className={styles.mini_nav}>
                {
                    isPhoneMenuActive
                    ?
                    <BiX className={styles.hamburger_menu} onClick={toggleMenu} />
                    :
                    <BiMenu className={styles.hamburger_menu} onClick={toggleMenu}/>
                }
                <div className={styles.links}>
                    <div className={styles.link}>
                        Account
                    </div>
                    <div className={styles.link}>
                        Transfers
                    </div>
                    <div className={`${styles.link} ${styles.open_account}`}>
                        Open an Account
                        <BsChevronRight className={styles.link_icon} />
                    </div>
                </div>
                
                <div className={styles.signout}>
                    Sign out
                </div>
            </div>

            {
                isPhoneMenuActive
                ?
                <div className={styles.phone_menu}>
                    <div className={styles.link}>
                        Accounts
                        <BsChevronRight className={styles.link_icon} />
                    </div>
                    <div className={styles.link}>
                        Transfers
                        <BsChevronRight className={styles.link_icon} />
                    </div>
                    <div className={styles.link}>
                        Profile
                        <BsChevronRight className={styles.link_icon} />
                    </div>
                    <div className={styles.open_account}>
                        Open an Account
                    </div>
                </div>
                :
                null
            }
        </>
    )
}
