import React, { useEffect, useState } from 'react'
import styles from "./Transfers.module.scss"
import { userApi } from "../../Components/API/API"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa"
import { BsXLg } from "react-icons/bs"

export default function Transfers() {
    const [transfers, setTransfers] = useState([])
    const navigate = useNavigate()
    const username = useSelector(state => state.username)

    useEffect(() => {
      (async () => {
          try {
            const response = await userApi.get(`/${username}/transfers`)
            setTransfers(response.data)
          }catch (error) {
            navigate("/")
          }
      })()
    }, [navigate, username])
    

    return (
        <div className={styles.transfers_container}>
            <div className={styles.header}>Transfers</div>
            <div className={styles.transfers}>
                <table className={styles.transfers_table}>
                    <tbody>
                        <tr>
                            <th>Transfer Date</th>
                            <th>From Account</th>
                            <th>To Account</th>
                            <th>Transfer Amount</th>
                            <th>Status</th>
                        </tr>
                        {
                            transfers.map(transfer => {
                                return(
                                    <tr key={transfer.id}>
                                        <td>{new Date(transfer.transfer_date).toLocaleDateString()}</td>
                                        <td>{transfer.account_from_name}</td>
                                        <td>{transfer.account_to_name}</td>
                                        <td>${transfer.transfer_amount}</td>
                                        <td>{transfer.status}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

                {
                    transfers.map(transfer => {
                        return(
                            <div className={styles.transfer} key={transfer.id}>
                                <div className={styles.date}>
                                    {new Date(transfer.transfer_date).toLocaleDateString()}                    
                                    <div className={styles.status}>
                                        {transfer.status} 
                                        {
                                            transfer.status === "completed"
                                            ?
                                            <FaCheck className={styles.complete} />
                                            :
                                            <BsXLg className={styles.fail}/>
                                        }
                                    </div>
                                </div>
                                <div>From: {transfer.account_from_name}</div>
                                <div>To: {transfer.account_to_name}</div>
                                <div>${transfer.transfer_amount}</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
