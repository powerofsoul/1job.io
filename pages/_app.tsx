import 'antd/dist/antd.css';
import Header from '../src/common/Header';
import Footer from '../src/common/Footer';
import styled from 'styled-components';
import DeviceSize from '../src/style/DeviceSize';

const AppBody = styled.div`
    display:flex;
    flex-direction: column;
    min-height: 100vh;
    font-family: 'Baloo Tamma 2', cursive;
`;

export default function App({ Component, pageProps }) {
  return <AppBody>
    <Header />
    <Component {...pageProps} />
    <Footer />

    <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Baloo+Tamma+2&display=swap');
    `}</style>
  </AppBody>
}