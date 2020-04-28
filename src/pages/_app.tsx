import 'antd/dist/antd.css';
import 'react-toastify/dist/ReactToastify.css';

import Header from '../common/Header';
import Footer from '../common/Footer';
import styled from 'styled-components';
import { Provider } from 'react-redux';
import configureStore from '../redux/configureStore';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';

const AppBody = styled.div`
    display:flex;
    flex-direction: column;
    min-height: 100vh;
`;

export default function App({ Component, pageProps }) {
  const appStore = configureStore();

  return <Provider store={appStore.store}>
    <PersistGate loading={null} persistor={appStore.persistor}>
      <ToastContainer position="top-right"
                      autoClose={1500} />
      <AppBody>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </AppBody>
    </PersistGate>
  </Provider>
}