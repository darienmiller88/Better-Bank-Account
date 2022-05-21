import React from 'react'
import { BsLinkedin, BsGithub, BsEnvelope, BsCodeSlash } from 'react-icons/bs';
import styles from "./Footer.module.scss"

export default function Footer({ isFixed }) {
    return (
        <div className={`${styles.footer} ${isFixed ? styles.fixed : null}`}>
             <div className={styles.socials} >
                <a href="https://www.linkedin.com/in/darien-miller" className={styles.social_icon_wrapper} target="_blank" rel='noreferrer'>
                    <BsLinkedin className={styles.social_link}/>
                </a>
                <a href="https://github.com/darienmiller88"  className={styles.social_icon_wrapper} target="_blank" rel='noreferrer'>
                    <BsGithub className={styles.social_link}/>
                </a>
                <a href="https://darienmiller.com/"  className={styles.social_icon_wrapper} target="_blank" rel='noreferrer'>
                  <BsCodeSlash className={styles.social_link} />  
                </a>
                <a href="mailto:darienmiller88@yahoo.com"  className={styles.social_icon_wrapper} target="_blank" rel='noreferrer'>
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
