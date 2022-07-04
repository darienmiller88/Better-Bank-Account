import React, { useRef, useState } from 'react'
import styles from "./WithdrawAccountForm.module.scss"
import { useSelector, useDispatch } from "react-redux"
import { actionTypes } from "../../state/reducers/actionTypes"
import { useNavigate } from "react-router-dom";
import { accountApi } from "../API/API"
import FormButton from "../FormButton/FormButton"

export default function WithdrawAccountForm({ closeModal }) {
    const dispatch = useDispatch()
    const formRef = useRef(null)
    const navigate = useNavigate()
    const [withdrawError, setWithdrawError] = useState("")
    const [isWithdrawError, setIsWithdrawError] = useState(false)
    const username = useSelector(state => state.username)
    const googleId = useSelector(state => state.googleId)
    const accounts = useSelector(state => state.accounts)
    const currentAccountName = useSelector(state => state.currentAccountName)

    const withdrawMoney = async (e) => {
        e.preventDefault()
        const formData = new FormData(formRef.current)
        const withdrawAmount = parseFloat(formData.get("withdraw"))
        const account = accounts.find(account => account.account_name === currentAccountName)

        if (withdrawAmount > account.available_balance){
            setWithdrawError("Insufficient funds. Please enter a different amount.")
            setIsWithdrawError(true)
            return
        }

        try {
            await accountApi.put(`/withdraw/${googleId ? googleId : username }/${account.ID}`, withdrawAmount.toFixed(2))
            dispatch({type: actionTypes.WITHDRAW, payload: {withdrawAmount, currentAccountName}})

            formRef.current.reset()
            closeModal()
        } catch (error) {
            if (error.response.status === 403){
                navigate("/")
                return
            }

            console.log("err:", error.response)
        }   
    }

    return (
        <form className={styles.withdraw_form} onSubmit={withdrawMoney} ref={formRef}> 
            <div className={styles.withdraw_header}>How much are you withdrawing today?</div>
            <div className={styles.input_group}>
                <label>Withdraw Amount ($)</label><br />
                <input type="number" placeholder='0.0' defaultValue={0.0} step="0.01" min="0" name="withdraw"/>
            </div>

            {
                isWithdrawError
                ?
                <div className={styles.new_account_error}>
                    {withdrawError}
                </div>
                :
                null
            }

            <FormButton buttonText={"Withdraw Money"}/>
        </form>
    )
}
