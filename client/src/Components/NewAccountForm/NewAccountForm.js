import React, { useRef } from 'react'
import styles from "./NewAccountForm.module.scss"
import { useDispatch } from "react-redux"
import { actionTypes } from "../../state/reducers/actionTypes"

export default function NewAccountForm({ closeModal }) {
    const formRef = useRef(useRef)
    const dispatch = useDispatch()

    const createAccount = (e) => { 
        e.preventDefault()

        const form = new FormData(formRef.current)
        const accountName = form.get("account_name")
        const availableAmount = parseFloat(form.get("deposit"))
        const onDepositAmount = availableAmount
        const accountType = form.get("account_type")
        const result = {
            accountName,
            availableAmount,
            onDepositAmount,
            accountType,
        }

        dispatch({type: actionTypes.ADD_ACCOUNT, payload: result})
        formRef.current.reset()
        closeModal()
    }

    return (
        <form onSubmit={createAccount} ref={formRef} className={styles.new_account_form}>
            <div className={styles.input_group}>
                <label>Account Name</label><br />
                <input type="text" name='account_name' minLength="4" maxLength="20" required/>
            </div>

            <div className={styles.input_group}>
                <label>Initial deposit ($)</label><br />
                <input type="number" placeholder='0.0' defaultValue={0.0} min="0" step="0.01" name="deposit"/>
            </div>
            <div className={styles.input_group}>
                <label>Account Type: </label>
                <select name="account_type" required>
                    <option value="Checkings">Checkings</option>
                    <option value="Savings">Savings</option>
                </select>
            </div>
            <div className={styles.submit}>
                <input type="submit" />
            </div>
        </form>
    )
}
