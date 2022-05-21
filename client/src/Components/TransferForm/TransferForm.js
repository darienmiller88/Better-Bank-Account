import React, { useRef, useState } from 'react'
import styles from "./TransferForm.module.scss"
import { useSelector, useDispatch } from "react-redux"
import { actionTypes } from "../../state/reducers/actionTypes"
import { useNavigate } from "react-router-dom";
import { accountApi } from "../API/API"
import FormButton from "../FormButton/FormButton"

export default function TransferForm({ closeModal }) {
    const [withdrawError, setWithdrawError] = useState("Not enough money")
    const [isSameWithdrawError, setIsWithdrawError] = useState(false)
    const accounts = useSelector(state => state.accounts)
    const accountFromName = useSelector(state => state.currentAccountName)
    const username = useSelector(state => state.username)
    const formRef = useRef(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const transferMoney = async (e) => {
        e.preventDefault()

        const formData       = new FormData(formRef.current)
        const accountToName  = formData.get("accountTo")
        const accountTo      = accounts.find(account => account.account_name === accountToName)
        const accountFrom    = accounts.find(account => account.account_name === accountFromName)
        const transferAmount = parseFloat(formData.get("transferAmount"))

        try {
            dispatch({type: actionTypes.TRANSFER, payload: { accountFromName, accountToName, transferAmount }})
            await accountApi.put(`/transfer/${username}/${accountFrom.ID}/${accountTo.ID}`, transferAmount) 

            formRef.current.reset()
            closeModal()
        } catch (error) {
            if (error.response.status === 403){
                closeModal()
                navigate("/")
                return
            }

            console.log("err:", error.response)
            setIsWithdrawError(true)
            setWithdrawError(error.response.data.errInvalidAmount)
        }  
    }

    return (
        <form className={styles.transfer_form} onSubmit={transferMoney} ref={formRef}> 
            <div className={styles.transfer_header}>Select account:</div>
            <div className={styles.input_group}>
                <label>Account to Transfer To: </label>
                <select name="accountTo" required>
                    {
                        accounts.map(account => {
                            return account.account_name !==  accountFromName
                                ?   
                                <option >
                                    { account.account_name }
                                </option>
                                :
                                null
                        })
                    }
                </select>
            </div>

            <div className={styles.input_group}>
                <label>Transfer Amount ($)</label><br />
                <input type="number" placeholder='0.0' defaultValue={0.0} step="0.01" min="0" name="transferAmount"/>
            </div>

            {
                isSameWithdrawError
                ?
                <div className={styles.error}>
                    {withdrawError}
                </div>
                :null
            }
            <FormButton buttonText={"Transfer Money"}/>
        </form>
    )
}
