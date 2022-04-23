import { actionTypes } from "./actionTypes"

export const accountsReducer = (state = [
    {
        accountName: "firstAccount",
        availableAmount: 120.78,
        onDepositAmount: 120.78,
        accountType: "Savings"
    }
], action) => {
    switch (action.type) {
        case actionTypes.ADD_ACCOUNT: 
            return [...state, action.payload]
        case actionTypes.DELETE_ACCOUNT: 
            return state.filter(account => account.accountName !== action.payload)
        case actionTypes.WITHDRAW: {
             const indexOfAccount = state.findIndex(account => account.accountName === action.payload.currentAccount)
            state[indexOfAccount].availableAmount -= action.payload.withdrawAmount
            state[indexOfAccount].availableAmount = parseFloat(state[indexOfAccount].availableAmount.toFixed(2))
            state[indexOfAccount].onDepositAmount = state[indexOfAccount].availableAmount
            
            return state
        }
           
        case actionTypes.DEPOSIT: {
            const indexOfAccount = state.findIndex(account => account.accountName === action.payload.currentAccount)
            state[indexOfAccount].availableAmount += action.payload.depositAmount 
            state[indexOfAccount].availableAmount = parseFloat(state[indexOfAccount].availableAmount.toFixed(2))    
            state[indexOfAccount].onDepositAmount = state[indexOfAccount].availableAmount

            return state
        }

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

// function withdrawOrDeposit(actionType, state, action) {
//     const indexOfAccount = state.findIndex(account => account.accountName === action.payload.currentAccount)

//     actionType === actionTypes.DEPOSIT ?
//     state[indexOfAccount].availableAmount += action.payload.depositAmount
//     :
    
//     state[indexOfAccount].availableAmount = parseFloat(state[indexOfAccount].availableAmount.toFixed(2))

// }