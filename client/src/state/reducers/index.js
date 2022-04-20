import { combineReducers } from "redux"
import { accountsReducer } from "./accountReducer"

export const reducers = combineReducers({
    accounts: accountsReducer,
})