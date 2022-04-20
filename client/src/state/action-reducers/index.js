import { actionTypes } from "../reducers/actionTypes"

export const depositMoney = (amount) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.DEPOSIT,
            payload: amount
        })
    }
}

export const withdrawMoney = (amount) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.WITHDRAW,
            payload: amount
        })
    }
}