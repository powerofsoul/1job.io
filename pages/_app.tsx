import 'antd/dist/antd.css';
import Header from '../src/common/Header';
import Footer from '../src/common/Footer';
import styled from 'styled-components';
import { Provider } from 'react-redux';
import configureStore from '../src/redux/configureStore';
import { PersistGate } from 'redux-persist/integration/react';

const AppBody = styled.div`
    display:flex;
    flex-direction: column;
    min-height: 100vh;
`;

export default function App({ Component, pageProps }) {
  const appStore = configureStore();

  return <Provider store={appStore.store}>
    <PersistGate loading={null} persistor={appStore.persistor}>
      <AppBody>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </AppBody>
    </PersistGate>
  </Provider>
}