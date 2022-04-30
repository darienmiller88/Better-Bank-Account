import { combineReducers } from "redux"
import { accountsReducer, accountClickedReducer, userReducer } from "./reducers"

export const reducers = combineReducers({
    accounts: accountsReducer,
    currentAccount: accountClickedReducer,
    user: userReducer
})