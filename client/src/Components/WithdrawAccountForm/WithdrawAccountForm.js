import React, { useRef } from 'react'
import styles from "./WithdrawAccountForm.module.scss"
import { useSelector, useDispatch } from "react-redux"
import { actionTypes } from "../../state/reducers/actionTypes"
import FormButton from "../FormButton/FormButton"

export default function WithdrawAccountForm({ closeModal }) {
    const dispatch = useDispatch()
    const formRef = useRef(null)
    const currentAccount = useSelector(state => state.currentAccount)

    const withdrawMoney = (e) => {
        e.preventDefault()
        const formData = new FormData(formRef.current)
        const withdrawAmount = formData.get("withdraw")

        dispatch({type: actionTypes.WITHDRAW, payload: {withdrawAmount, currentAccount}})

        formRef.current.reset()
        closeModal()
    }

    return (
        <form className={styles.withdraw_form} onSubmit={withdrawMoney} ref={formRef}> 
            <div className={styles.withdraw_header}>How much are you withdrawing today?</div>
            <div className={styles.input_group}>
                <label>Withdraw Amount ($)</label><br />
                <input type="number" placeholder='0.0' defaultValue={0.0} step="0.01" min="0" name="withdraw"/>
            </div>
            <FormButton buttonText={"Withdraw Money"}/>
        </form>
    )
}
