import 'antd/dist/antd.css';
import Header from '../src/common/Header';
import Footer from '../src/common/Footer';
import styled from 'styled-components';
import DeviceSize from '../src/style/DeviceSize';

const AppBody = styled.div`
    display:flex;
    flex-direction: column;
    min-height: 100vh;
`;

export default function App({ Component, pageProps }) {
  return <AppBody>
    <Header />
    <Component {...pageProps} />
    <Footer />
  </AppBody>
}