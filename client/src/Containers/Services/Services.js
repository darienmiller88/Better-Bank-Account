import React from 'react'
import styles from "./Services.module.scss"
import serviceOnePic from "../../img/serviceOnePicture.jpg"
import serviceTwoPic from "../../img/serviceTwoPicture.jpg"
import serviceThreePic from "../../img/serviceThreePicture.jpg"

export default function Services() {
    const serviceOneTitle =   "For new Miller Banking customers"
    const serviceTwoTitle =   "Virtual check deposit"
    const serviceThreeTitle = "Share accounts across multiple cards"

    const serviceOneDescription = "Open a student account to earn a $200 bonus, and a 5% discount on textbooks."
    const serviceTwoDescription = "QuickDesposit allows you to seamlessly deposit checks in person or online by providing a picture."
    const serviceThreeDescription = "Miller Bank allows up to five users to have access to the same savings or checking account."

    const Service = ({ index, picture, serviceTitle, serviceDescription}) => {
        return (
            <div className={`${styles.service} ${index % 2 === 0 ? styles.picture_left : styles.picture_right}`}>
                <div className={styles.service_picture}>
                    <img alt='service_picture' src={picture}/>
                </div>
                <div className={styles.service_description_wrapper}>
                    <div className={styles.service_title}>
                        {serviceTitle}
                    </div>
                    <div className={styles.service_description}>
                        {serviceDescription}
                    </div>
                    <div className={styles.learn_more}>
                        <button>
                            Learn more
                        </button>
                    </div>
               </div>
            </div>
        )
    }

    return (
        <div className={styles.services_section}>            
            <div className={styles.services_section_title}>Our Services</div>
            <Service index={0} serviceTitle={serviceOneTitle}   serviceDescription={serviceOneDescription}   picture={serviceOnePic}/>
            <Service index={1} serviceTitle={serviceTwoTitle}   serviceDescription={serviceTwoDescription}   picture={serviceTwoPic}/>
            <Service index={2} serviceTitle={serviceThreeTitle} serviceDescription={serviceThreeDescription} picture={serviceThreePic}/>
        </div>
    )
}
