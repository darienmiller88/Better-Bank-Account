import { combineReducers } from "redux"
import { accountsReducer, accountNameReducer, userNameReducer, googleIdReducer } from "./reducers"

export const reducers = combineReducers({
    accounts: accountsReducer,
    currentAccountName: accountNameReducer,
    username: userNameReducer,
    googleId: googleIdReducer
})