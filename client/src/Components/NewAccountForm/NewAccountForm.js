import React, { useRef, useState } from 'react'
import styles from "./NewAccountForm.module.scss"
import { useDispatch, useSelector } from "react-redux"
import { actionTypes } from "../../state/reducers/actionTypes"
import { accountApi } from "../API/API"
import { useNavigate } from "react-router-dom";

export default function NewAccountForm({ closeModal }) {
    const formRef = useRef(useRef)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const username = useSelector(state => state.username)
    const googleId = useSelector(state => state.googleId)
    const [newAccountError, setNewAccountError] = useState("")
    const [isAccountError, setIsAccountError] = useState(false)

    const createAccount = async (e) => { 
        e.preventDefault()

        const form = new FormData(formRef.current)
        const account_name = form.get("account_name")
        const available_balance = parseFloat(form.get("deposit"))
        const ondeposit_balance = available_balance
        const account_type = form.get("account_type")
        const result = {
            account_name,
            available_balance,
            ondeposit_balance,
            account_type,
        }

        try {
            const account = await accountApi.post(`/${googleId ? googleId : username}`, result)
            dispatch({type: actionTypes.ADD_ACCOUNT, payload: { ...result, ID: account.data}})
            formRef.current.reset()
            setIsAccountError(false)
            closeModal()
        } catch (error) {
            //If when trying to post a new account no cookie was detected, redirect the user back to the login page.
            if (error.response.status === 403){
                navigate("/")
                return
            }
            
            setIsAccountError(true)
            setNewAccountError(error.response.data.errDuplicateAccountName)
        }
    }

    return (
        <form onSubmit={createAccount} ref={formRef} className={styles.new_account_form}>
            <div className={styles.input_group}>
                <label>Account Name</label><br />
                <input type="text" name='account_name' minLength="4" maxLength="20" required/>
            </div>

            {
                isAccountError
                ?
                <div className={styles.new_account_error}>
                    {newAccountError}
                </div>
                :
                null
            }

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
