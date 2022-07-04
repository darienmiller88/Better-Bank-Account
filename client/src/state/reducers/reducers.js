import { actionTypes } from "./actionTypes"

export const accountsReducer = (state = [], action) => {
    switch (action.type) {
        case actionTypes.CLEAR_ACCOUNTS:
            return []
        case actionTypes.ADD_ACCOUNT: 
            return [...state, action.payload]
        case actionTypes.TRANSFER:
            const accountFrom = state.find(account => account.account_name === action.payload.accountFromName)
            const accountTo   = state.find(account => account.account_name === action.payload.accountToName)

            withdrawOrDeposit(actionTypes.WITHDRAW, accountFrom, action.payload.transferAmount)
            withdrawOrDeposit(actionTypes.DEPOSIT, accountTo, action.payload.transferAmount)
            return state
        case actionTypes.DELETE_ACCOUNT: {                    
            return state.filter(account => account.account_name !== action.payload)
        }
        case actionTypes.WITHDRAW: {
            const indexOfAccount = state.findIndex(account => account.account_name === action.payload.currentAccountName)
           
            withdrawOrDeposit(action.type, state[indexOfAccount], action.payload.withdrawAmount)
            return state
        }
           
        case actionTypes.DEPOSIT: {
            const indexOfAccount = state.findIndex(account => account.account_name === action.payload.currentAccountName)
                        
            withdrawOrDeposit(action.type, state[indexOfAccount], action.payload.depositAmount)
            return state
        }

        default:
            return state
    }
}

export const userNameReducer = (state = "", action) => {
    switch (action.type) {
        case actionTypes.UPDATE_USERNAME: 
            return action.payload 
        case actionTypes.CLEAR:
            return ""
        default:
            return state
    }
}

export const googleIdReducer = (state = "", action) => {
    switch (action.type) {
        case actionTypes.UPDATE_GOOGLE_ID: 
            return action.payload
        case actionTypes.CLEAR:
            return ""
        default:
            return state
    }
}


export const accountNameReducer = (state = "", action) => {
    switch (action.type) {
        case actionTypes.UPDATE_ACCOUNT_NAME: 
            return action.payload
        case actionTypes.CLEAR:
            return ""
        default:
            return state
    }
}

function withdrawOrDeposit(actionType, account, amount) {
    actionType === actionTypes.DEPOSIT ?
    account.available_balance += amount
    :
    account.available_balance -= amount
    account.available_balance = parseFloat(account.available_balance.toFixed(2))    
    account.ondeposit_balance = account.available_balance
}