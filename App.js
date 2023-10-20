import { Text } from 'react-native';
import { Provider } from 'react-redux';
import store, { persistor } from "./src/store/Store";
import RoutesPage from './src/routes/RoutesPage';
import { PersistGate } from "redux-persist/integration/react";
import { useEffect } from 'react';
import { ToastProvider } from 'react-native-toast-notifications'
import { navBarHeight } from './src/data/staticDatas';
export default function App() {
  console.warn = () => { };

  return (
    <Provider store={store} >
      <PersistGate persistor={persistor} loading={<Text>Loading</Text>} >
        <ToastProvider style={{ marginBottom: navBarHeight + 10}} >
          <RoutesPage />
        </ToastProvider>
      </PersistGate>
    </Provider>
  );
}

