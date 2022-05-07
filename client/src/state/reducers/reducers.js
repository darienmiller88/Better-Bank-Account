import { actionTypes } from "./actionTypes"

export const accountsReducer = (state = [], action) => {
    switch (action.type) {
        case actionTypes.CLEAR_ACCOUNTS:
            return []
        case actionTypes.ADD_ACCOUNT: 
            return [...state, action.payload]
        case actionTypes.DELETE_ACCOUNT: {
            const account = state.filter(account => account.account_name !== action.payload)
            
            console.log("account removed:", account);
            
            return state.filter(account => account.account_name !== action.payload)
        }
        case actionTypes.WITHDRAW: {
            const indexOfAccount = state.findIndex(account => account.account_name === action.payload.currentAccountName)
           
            state[indexOfAccount].available_balance -= action.payload.withdrawAmount
            state[indexOfAccount].available_balance = parseFloat(state[indexOfAccount].available_balance.toFixed(2))
            state[indexOfAccount].ondeposit_balance = state[indexOfAccount].available_balance
            
            return state
        }
           
        case actionTypes.DEPOSIT: {
            const indexOfAccount = state.findIndex(account => account.account_name === action.payload.currentAccountName)
                        
            state[indexOfAccount].available_balance += action.payload.depositAmount 
            state[indexOfAccount].available_balance = parseFloat(state[indexOfAccount].available_balance.toFixed(2))    
            state[indexOfAccount].ondeposit_balance = state[indexOfAccount].available_balance

            return state
        }

        default:
            return state
    }
}

export const userNameReducer = (state = "", action) => {
    switch (action.type) {
        case actionTypes.UPDATE_USERNAME: 
            state = action.payload
            return state
        default:
            return state
    }
}

export const accountNameReducer = (state = "", action) => {
    switch (action.type) {
        case actionTypes.UPDATE_ACCOUNT_NAME: 
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