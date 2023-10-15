import { combineReducers } from "redux";
import * as AllReducer from "../store/_redux/AllReducer";
import { all } from "redux-saga/effects";

export const rootReducer = combineReducers({
    common: AllReducer.baseReducer,
    auth: AllReducer.authReducer,
});





