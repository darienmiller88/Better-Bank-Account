import React, { useState, useEffect } from 'react'
import styles from "./DisplayAccounts.module.scss"
import Modal from '../../Components/Modal/Modal'
import DesktopView from "../../Components/DesktopView/DesktopView"
import PhoneView from "../../Components/PhoneView/PhoneView"
import NewAccountForm from "../../Components/NewAccountForm/NewAccountForm"
import DeleteAccountForm from '../../Components/DeleteAccountForm/DeleteAccountForm'
import WithdrawAccountForm from "../../Components/WithdrawAccountForm/WithdrawAccountForm"
import DepositAccountForm from '../../Components/DepositAccountForm/DepositAccountForm'
import TransferForm from '../../Components/TransferForm/TransferForm'
import { useSelector, useDispatch } from "react-redux"
import { userApi } from "../../Components/API/API"
import { useNavigate } from "react-router-dom";
import { actionTypes } from "../../state/reducers/actionTypes"

export default function DisplayAccounts() {
    const [showNewAccountModal, setShowNewAccountModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showWithdrawModal, setShowWithdrawModal] = useState(false)
    const [showDepositModal, setShowDepositModal] = useState(false)
    const [showTransferModal, setShowTransferModal] = useState(false)
    const [lastSignIn, setLastSignIn] = useState("")
    const username = useSelector(state => state.username)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect( () => {
        (async () => {
            try {
                const response = await userApi.get(`/${username}`)
                const formatDate = new Date(response.data.last_signin)

                dispatch({type: actionTypes.CLEAR_ACCOUNTS})
                dispatch({type: actionTypes.UPDATE_USERNAME, payload: response.data.username})
                response.data.accounts.forEach(account => {
                    dispatch({type: actionTypes.ADD_ACCOUNT, payload: account})
                })
                setLastSignIn(formatDate)
            } catch (error) {
                navigate("/")
                console.log("err:", error.response.data);
            }
        })();
    }, [dispatch, navigate, username])

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
            <div className={styles.welcome}>Welcome, {username}</div>
            <div className={styles.last_sign_in}>{`Last sign on: ${lastSignIn} from computer.`}</div>
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

            {/* Modal to Transfer into an account */}
            <Modal 
                show={showTransferModal}
                onHide={() => closeModal(setShowTransferModal)}
                modalContent={<TransferForm closeModal={() => closeModal(setShowTransferModal)}/>}
                modalHeader={"Transfer"}
            />

            {/* For phone and tablet only */}
            <PhoneView 
                openWithdrawModal={() => openModal(setShowWithdrawModal)}
                openDepositModal={() => openModal(setShowDepositModal)}
                openDeleteModal={() => openModal(setShowDeleteModal)}
                openTransferModal={() => openModal(setShowTransferModal)}
            />

            {/* For laptops and desktops */}
            <DesktopView 
                openWithdrawModal={() => openModal(setShowWithdrawModal)}
                openDepositModal={() => openModal(setShowDepositModal)}
                openDeleteModal={() => openModal(setShowDeleteModal)}
                openTransferModal={() => openModal(setShowTransferModal)}
            />
        </>
    )
}