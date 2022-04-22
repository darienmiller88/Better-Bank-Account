import { actionTypes } from "./actionTypes"

export const accountsReducer = (state = [], action) => {
    switch (action.type) {
        case actionTypes.ADD_ACCOUNT: 
            return [...state, action.payload]
        case actionTypes.DELETE_ACCOUNT: 
            return state.filter(account => account.accountName !== action.payload)
        case actionTypes.WITHDRAW: 
            const accountToWithdraw = state.find(account => account.accountName === action.payload)
            
            accountToWithdraw.availableAmount -= action.payload
            return accountToWithdraw
        case actionTypes.DEPOSIT: 
            const accountToDeposit = state.find(account => account.accountName === action.payload)

            accountToDeposit.availableAmount += action.payload
            return accountToDeposit
        default:
            return state
    }
}

export const accountClickedReducer = (state = "", action) => {
    switch (action.type) {
        case actionTypes.CHANGE_NAME: 
            state = action.payload
            return state
        default:
            return state
    }
}