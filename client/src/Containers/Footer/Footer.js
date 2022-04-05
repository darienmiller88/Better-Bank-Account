import React from 'react'
import { BsLinkedin, BsGithub, BsEnvelope } from 'react-icons/bs';
import styles from "./Footer.module.scss"

export default function Footer() {
    return (
        <div className={styles.footer}>
             <div className={styles.socials}>
                <a href="https://www.linkedin.com/in/darien-miller" className={styles.social_icon_wrapper}>
                    <BsLinkedin className={styles.social_link}/>
                </a>
                <a href="https://github.com/darienmiller88"  className={styles.social_icon_wrapper}>
                    <BsGithub className={styles.social_link}/>
                </a>
                <a href="mailto:darienmiller88@yahoo.com"  className={styles.social_icon_wrapper}>
                    <BsEnvelope className={styles.social_link}/>
                </a>
            </div>
            <br/>
            <div className={styles.copyright}>
                Copyright © 2022 Darien Miller
            </div>
        </div>
    )
}
