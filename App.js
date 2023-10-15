import { Text } from 'react-native';
import { Provider } from 'react-redux';
import store, { persistor } from "./src/store/Store";
import RoutesPage from './src/routes/RoutesPage';
import { PersistGate } from "redux-persist/integration/react";
import { useEffect } from 'react';
export default function App() {


  return (
    <Provider store={store} >
      <PersistGate persistor={persistor} loading={<Text>Loading</Text>} >
        <RoutesPage />
      </PersistGate>
    </Provider>
  );
}

