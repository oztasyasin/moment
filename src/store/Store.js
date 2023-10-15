import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import {rootReducer} from "./RootReducer";
import {persistStore} from "redux-persist";
import {reduxBatch} from "@manaflair/redux-batch"; 
import logger from "redux-logger";
// import { createStore, applyMiddleware } from 'redux'
// import thunk from "redux-thunk";

const middleware = [
  ...getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
    thunk: true
  }),
 
  logger
];

const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: "production",
  enhancers: [reduxBatch]
});

// const store = createStore(rootReducer,applyMiddleware(thunk));
// export const persistor=persistStore(store)
export const persistor = persistStore(store);
export default store;








