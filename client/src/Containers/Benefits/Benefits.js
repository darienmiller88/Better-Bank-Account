import React from 'react'
import styles from "./Benefits.module.scss"
import cart from "../../img/cart_nobg.png"
import wallet from "../../img/wallet_nobg.png"
import card from "../../img/cartooncreditcard_nobg.png"

export default function Benefits() {
    const savingsBenefit = "We offer the lowest interest rates and monthly fees in North America!"
    const onlineBenefit = "Enjoy monthly stipends to fund online shopping!"
    const creditBenefit = "Our bank offers unlimited 5% on dining and on grocery store purchases on our credit cards."

    const Benefit = ({ image, benefitTitle, benefitDescription }) => {
        return(
            <div className={styles.benefit}>
                <div className={styles.benefit_image}>
                    <img alt="benefit" src={image}/>
                </div>
                <div className={styles.benefit_title}>
                    {benefitTitle}
                </div>
                <div className={styles.benefit_description}>
                    { benefitDescription }
                </div>
            </div>
        )
    }

    return (
        <div className={styles.benefits_section}>    
            <div className={styles.benefits_inner}>
                <div className={styles.title}>Enjoy several benefits after opening an account!</div>
                <div className={styles.benefits_wrapper}>
                    <Benefit image={wallet} benefitDescription={savingsBenefit} benefitTitle={"Savings"}/>
                    <Benefit image={cart}   benefitDescription={onlineBenefit}  benefitTitle={"Online Shopping"}/>
                    <Benefit image={card}   benefitDescription={creditBenefit}  benefitTitle={"Credit / Debit"}/>
                </div>
            </div>        
        </div>
    )
}
