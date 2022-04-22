import { combineReducers } from "redux"
import { accountsReducer, accountClickedReducer } from "./reducers"

export const reducers = combineReducers({
    accounts: accountsReducer,
    currentAccount: accountClickedReducer
})