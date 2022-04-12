import React, { useState } from 'react'
import styles from "./MiniNav.module.scss"

import { BiMenu, BiX } from "react-icons/bi"
import { BsChevronBarRight } from "react-icons/bs"
import { FaAngleRight } from "react-icons/fa"

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
                        Accounts
                    </div>
                    <div className={styles.link}>
                        Transfers
                    </div>
                    <div className={`${styles.link} ${styles.open_account}`}>
                        Open an Account
                        <FaAngleRight className={styles.link_icon} />
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
                        <FaAngleRight className={styles.link_icon} />
                    </div>
                    <div className={styles.link}>
                        Transfers
                        <FaAngleRight className={styles.link_icon} />
                    </div>
                    <div className={styles.link}>
                        Profile
                        <FaAngleRight className={styles.link_icon} />
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
