import React, { useState, useRef, useEffect } from 'react'
import styles from "./Dashboard.module.scss"
import logo from "../../img/logo2-nobg.png"
import MiniNav from '../../Components/MiniNav/MiniNav'
import Footer from "../../Containers/Footer/Footer"
import Modal from '../../Components/Modal/Modal'
import DesktopView from "../../Components/DesktopView/DesktopView"
import PhoneView from "../../Components/PhoneView/PhoneView"
import { useSelector, useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import { actionCreators } from "../../state/index"
import { actionTypes } from "../../state/reducers/actionTypes"

export default function Dashboard() {
    const [modalShow, setModalShow] = useState(false);
    const accounts = useSelector(state => state.accounts)
    const dispatch = useDispatch()

    console.log("state:", accounts);

    const openModal = () => {
        document.querySelector("body").style.overflow = "hidden"
        setModalShow(true)
    }

    const closeModal = () => {
        document.querySelector("body").style.overflow = 'visible';
        setModalShow(false)
    }

    const NewAccountForm = () => {
        const formRef = useRef(useRef)
       

        const createAccount = (e) => { 
            e.preventDefault()

            const form = new FormData(formRef.current)
            const accountName = form.get("account_name")
            const availableAmount = form.get("deposit")
            const onDepositAmount = availableAmount
            const accountType = form.get("account_type")
            const result = {
                accountName,
                availableAmount,
                onDepositAmount,
                accountType,
            }

            dispatch({type: actionTypes.ADD_ACCOUNT, payload: result})
            console.log("form:", result, "and accounts:", accounts);
            formRef.current.reset()
            closeModal()
        }

        return (
            <form onSubmit={createAccount} ref={formRef}>
                <div className={styles.input_group}>
                    <label>Account Name</label><br />
                    <input type="text" name='account_name' minLength="4" maxLength="20" required/>
                </div>

                <div className={styles.input_group}>
                    <label>Initial deposit ($)</label><br />
                    <input type="number" placeholder='0.0' defaultValue={0.0} step="0.01" name="deposit"/>
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

    return (
        <>
            <div className={styles.dashboard}>
                <div className={styles.logo_nav}>
                    <div className={styles.logo_wrapper}>
                        <img alt='logo' src={logo} />
                    </div>
                </div>
                <MiniNav />
                <div className={styles.welcome}>Welcome, DARIEN</div>
                <div className={styles.last_sign_in}>Last sign on: Apr. 06, 2022 (5:14 AM ET) from computer.</div>
                <button className={styles.open_new_account} onClick={openModal}>
                    Open New Account
                </button>

                <Modal 
                    show={modalShow}
                    onHide={closeModal}
                    modalContent={<NewAccountForm />}
                    modalHeader={"Create your Account"}
                />

                {/* For phone and tablet only */}
                <PhoneView />

                {/* For laptops and desktops */}
                <DesktopView />
            </div>
            <Footer />
        </>
    )
}
