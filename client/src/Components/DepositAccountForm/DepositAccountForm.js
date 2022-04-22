import React, {useRef} from 'react'
import styles from "./DepositAccountForm.module.scss"
import FormButton from '../FormButton/FormButton'
import { useSelector, useDispatch } from "react-redux"
import { actionTypes } from "../../state/reducers/actionTypes"

export default function DepositAccountForm({ closeModal }) {
    const formRef = useRef(null)
    const currentAccount = useSelector(state => state.currentAccount)
    const dispatch = useDispatch()

    const depositMoney = (e) => {
        e.preventDefault()
        const formData = new FormData(formRef.current)
        const depositAmount = parseFloat(formData.get("deposit"))

        dispatch({type: actionTypes.DEPOSIT, payload: {depositAmount, currentAccount}})

        formRef.current.reset()
        closeModal()
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
