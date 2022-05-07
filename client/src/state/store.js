import { createStore } from "redux"
import { reducers } from "./reducers/index"
import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage"

const persistConfig = {
    key: "main-root",
    storage,
}

const persistedReducer = persistReducer(persistConfig, reducers)
export const store = createStore(persistedReducer, {})
export const persistor = persistStore(store)