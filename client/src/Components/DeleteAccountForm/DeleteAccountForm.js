import React from 'react'
import styles from "./DeleteAccountForm.module.scss"
import { useDispatch, useSelector } from "react-redux"
import { actionTypes } from "../../state/reducers/actionTypes"

export default function DeleteAccountForm({ closeModal }) {
    const dispatch = useDispatch()
    const currentAccount = useSelector(state => state.currentAccount)

    const deleteAccount = () => {
        dispatch({type: actionTypes.DELETE_ACCOUNT, payload: currentAccount})
        closeModal()
    }

    return (
        <div className={styles.delete_account_form}>
            <div className={styles.warning}>
                Are you sure you want to <span>delete</span> this account? 
                Please transfer your funds elsewhere.
            </div>
            <button onClick={deleteAccount}>Delete</button>
        </div>
    )
}
