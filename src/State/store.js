import { createStore, combineReducers,applyMiddleware } from "redux";
import LoginReducer from "./loginReducer";
import thunk from "redux-thunk" 
import {persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";
const rootReducer = combineReducers({LoginReducer});
const persistConfig = {
    key: 'Revolution-soft-admin',
    storage,
  }
  const persistedReducer = persistReducer(persistConfig, rootReducer)
  let store = createStore(persistedReducer)
  export let persistor = persistStore(store)
  export default store