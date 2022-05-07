import React, {useRef} from 'react'
import styles from "./DepositAccountForm.module.scss"
import FormButton from '../FormButton/FormButton'
import { useSelector, useDispatch } from "react-redux"
import { actionTypes } from "../../state/reducers/actionTypes"
import { useNavigate } from "react-router-dom";
import { accountApi } from "../API/API"

export default function DepositAccountForm({ closeModal }) {
    const formRef = useRef(null)
    const dispatch = useDispatch()    
    const navigate = useNavigate()
    const username = useSelector(state => state.username)
    const accounts = useSelector(state => state.accounts)
    const currentAccountName = useSelector(state => state.currentAccountName)

    const depositMoney = async (e) => {
        e.preventDefault()
        const formData = new FormData(formRef.current)
        const depositAmount = parseFloat(formData.get("deposit"))
        const account = accounts.find(account => account.account_name === currentAccountName)

        try {
            await accountApi.put(`/deposit/${username}/${account.ID}`, depositAmount.toFixed(2))
            dispatch({type: actionTypes.DEPOSIT, payload: { depositAmount, currentAccountName }})
            formRef.current.reset()
            closeModal() 
        } catch (error) {
            console.log("err:", error);
            if (error && error.response.status === 403){
                navigate("/")
                return
            }
        }
    }

    return (
        <form className={styles.deposit_form} onSubmit={depositMoney} ref={formRef}> 
            <div className={styles.deposit_header}>How much are you depositing today?</div>
            <div className={styles.input_group}>
                <label>Deposit Amount ($)</label><br />
                <input type="number" placeholder='0.0' defaultValue={0.0} step="0.01" min="0" name="deposit"/>
            </div>
            <FormButton buttonText={"Deposit Money"}/>
        </form>
    )
}
