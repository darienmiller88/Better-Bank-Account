import React from 'react'
import styles from "./DeleteAccountForm.module.scss"
import { useDispatch, useSelector } from "react-redux"
import { actionTypes } from "../../state/reducers/actionTypes"
import { accountApi } from "../API/API"
import { useNavigate } from "react-router-dom";
import FormButton from "../FormButton/FormButton"

export default function DeleteAccountForm({ closeModal }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const currentAccountName = useSelector(state => state.currentAccountName)
    const username = useSelector(state => state.username)
    const accounts = useSelector(state => state.accounts)

    const deleteAccount = async () => {
        const account = accounts.find(account => account.account_name === currentAccountName)

        try {
            await accountApi.delete(`/${username}/${account.ID}`)
            dispatch({type: actionTypes.DELETE_ACCOUNT, payload: currentAccountName})
            closeModal() 
        } catch (error) {
            //The only possible error that can be returned to the client side from trying to delete an account
            //is a 403 from the auth middleware that is triggered when no cookie containing the jwt is detected.
            navigate("/")
        }        
    }

    return (
        <div className={styles.delete_account_form}>
            <div className={styles.warning}>
                Are you sure you want to <span>delete</span> this account? 
                Please transfer your funds elsewhere.
            </div>
            <FormButton buttonText={"Delete"} onClick={deleteAccount}/>
        </div>
    )
}
