
import { persistReducer, persistStore } from "redux-persist";
import { createStore } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as common from '../_redux/common/slice';
import * as auth from '../_redux/auth/slice';

export const baseReducer = persistReducer(
    {
        debug: false,
        storage: AsyncStorage,
        key: 'state-common',
        blacklist: []
    },
    common.Slice.reducer
)
export const authReducer = persistReducer(
    {
        debug: false,
        storage: AsyncStorage,
        key: 'state-auth',
        blacklist: []
    },
    auth.Slice.reducer
)

const baseStore = createStore(baseReducer);
const authStore = createStore(authReducer);

persistStore(baseStore);
persistStore(authStore);
