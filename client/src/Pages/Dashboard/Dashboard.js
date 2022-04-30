import React, { useState } from 'react'
import styles from "./Dashboard.module.scss"
import logo from "../../img/mdlogo.png"
import MiniNav from '../../Components/MiniNav/MiniNav'
import Footer from "../../Containers/Footer/Footer"
import Modal from '../../Components/Modal/Modal'
import DesktopView from "../../Components/DesktopView/DesktopView"
import PhoneView from "../../Components/PhoneView/PhoneView"
import NewAccountForm from "../../Components/NewAccountForm/NewAccountForm"
import DeleteAccountForm from '../../Components/DeleteAccountForm/DeleteAccountForm'
import WithdrawAccountForm from "../../Components/WithdrawAccountForm/WithdrawAccountForm"
import DepositAccountForm from '../../Components/DepositAccountForm/DepositAccountForm'
import { useSelector } from "react-redux"

export default function Dashboard() {
    const [showNewAccountModal, setShowNewAccountModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showWithdrawModal, setShowWithdrawModal] = useState(false)
    const [showDepositModal, setShowDepositModal] = useState(false)
    const username = useSelector(state => state.user)

    const openModal = (setModalShow) => {
        document.querySelector("body").style.overflow = "hidden"
        setModalShow(true)
    }

    const closeModal = (setModalShow) => {
        document.querySelector("body").style.overflow = 'visible';
        setModalShow(false)
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
                <div className={styles.welcome}>Welcome, {username}</div>
                <div className={styles.last_sign_in}>Last sign on: Apr. 06, 2022 (5:14 AM ET) from computer.</div>
                <button className={styles.open_new_account} onClick={() => openModal(setShowNewAccountModal)}>
                    Open New Account
                </button>

                {/* modal to create a new Account  */}
                <Modal 
                    show={showNewAccountModal}
                    onHide={() => closeModal(setShowNewAccountModal)}
                    modalContent={<NewAccountForm closeModal={() => closeModal(setShowNewAccountModal)}/>}
                    modalHeader={"Create your Account"}
                />

                {/* Modal to delete an account */}
                <Modal 
                    show={showDeleteModal}
                    onHide={() => closeModal(setShowDeleteModal)}
                    modalContent={<DeleteAccountForm closeModal={() => closeModal(setShowDeleteModal)}/>}
                    modalHeader={"Delete Account"}
                />

                {/* Modal to withdraw from an account */}
                <Modal 
                    show={showWithdrawModal}
                    onHide={() => closeModal(setShowWithdrawModal)}
                    modalContent={<WithdrawAccountForm closeModal={() => closeModal(setShowWithdrawModal)}/>}
                    modalHeader={"Withdraw"}
                />

                {/* Modal to Deposit into an account */}
                <Modal 
                    show={showDepositModal}
                    onHide={() => closeModal(setShowDepositModal)}
                    modalContent={<DepositAccountForm closeModal={() => closeModal(setShowDepositModal)}/>}
                    modalHeader={"Deposit"}
                />

                {/* For phone and tablet only */}
                <PhoneView 
                    openWithdrawModal={() => openModal(setShowWithdrawModal)}
                    openDepositModal={() => openModal(setShowDepositModal)}
                    openDeleteModal={() => openModal(setShowDeleteModal)}
                />

                {/* For laptops and desktops */}
                <DesktopView 
                    openWithdrawModal={() => openModal(setShowWithdrawModal)}
                    openDepositModal={() => openModal(setShowDepositModal)}
                    openDeleteModal={() => openModal(setShowDeleteModal)}
                />
            </div>
            <Footer />
        </>
    )
}
