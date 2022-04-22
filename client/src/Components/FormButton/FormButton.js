import React from 'react'
import styles from "./FormButton.module.scss"

export default function FormButton({ buttonText, onClick }) {
    return (
        <button className={styles.form_button} onClick={onClick}>
            { buttonText }
        </button>
    )
}
