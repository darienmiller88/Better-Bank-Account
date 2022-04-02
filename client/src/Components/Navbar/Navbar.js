import React, { useEffect, useRef } from 'react'
import { BiMenu, BiX } from "react-icons/bi"
import styles from "./Navbar.module.scss"

export default function Navbar() {
    const phoneMenuRef = useRef(null)

    useEffect(() => {
        document.addEventListener("DOMContentLoaded", () => {
            const el_autohide = document.querySelector('.autohide');
            
            if(el_autohide){
                var last_scroll_top = 0;
                window.addEventListener('scroll', function() {
                    let scroll_top = window.scrollY;
                    if(scroll_top < last_scroll_top) {
                        el_autohide.classList.remove('scrolled-down');
                        el_autohide.classList.add('scrolled-up');
                    } else {
                        el_autohide.classList.remove('scrolled-up');
                        el_autohide.classList.add('scrolled-down');
                    }
                    last_scroll_top = scroll_top;
                }); 
            }
        })

        document.title = "Online banking with the best rated bank in the country!"
    }, [])

    const LinksWrapper = () => {
        return (
            <div className={styles.links_wrapper}>
                <div className={styles.link}>
                    About
                </div>
                <div className={styles.link}>
                    Account Information
                </div>
                <div className={styles.link}>                    
                    Services
                </div>
                <div className={styles.link}>
                    Banking
                </div>
            </div>
        )
    }

    const toggleMenu = () => {
        //If the menu is slid out of view, slide it back in by adding the appropriate class.
        if (phoneMenuRef.current.classList.contains(styles.phone_menu_slide_out)) {
            phoneMenuRef.current.classList.remove(styles.phone_menu_slide_out)
            phoneMenuRef.current.classList.add(styles.phone_menu_slide_in)
        }
        //Otherwise, slide it out of view by removing the appropiate class.
        else{
            phoneMenuRef.current.classList.remove(styles.phone_menu_slide_in)
            phoneMenuRef.current.classList.add(styles.phone_menu_slide_out)
        }
    }

    return (
        <div className={`${styles.navbar} ${styles.autohide}`}>
            <div className={styles.logo_wrapper}>
                <div className={styles.logo}>
                    Miller Banking
                </div>
            </div>    

            <div className={styles.hamburger_menu_wrapper} onClick={ toggleMenu }>
                <BiMenu className={styles.icon}/>
            </div>

            <div className={`${styles.phone_menu} ${styles.phone_menu_slide_out}`} ref={phoneMenuRef}>
                <div className={styles.x_wrapper}>
                    <BiX className={styles.icon} onClick={ toggleMenu }/>
                </div>
                <LinksWrapper />

                <div className={styles.signout_wrapper}>
                    <a href='/'>
                        Sign out
                    </a>
                </div>
            </div>
            
            <div className={styles.links}>
                <LinksWrapper />
            </div>

            <div className={styles.signout_wrapper}>
                <a href='/'>
                    Sign out
                </a>
            </div>
        </div>
    )
}
