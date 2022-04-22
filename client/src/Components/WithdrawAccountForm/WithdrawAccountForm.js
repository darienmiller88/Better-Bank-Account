import React from 'react'
import styles from "./WithdrawAccountForm.module.scss"
import { useSelector } from "react-redux"

export default function WithdrawAccountForm({ closeModal }) {
    const currentAccount = useSelector(state => state.currentAccount)

    return (
        <div>WithdrawAccountForm</div>
    )
}
