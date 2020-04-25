import 'antd/dist/antd.css';
import Header from '../src/common/Header';
import Footer from '../src/common/Footer';
import styled from 'styled-components';

const Body = styled.div`
    display:flex;
    flex-direction: column;
    min-height: 100vh;
`;

// This default export is required in a new `pages/_app.js` file.
export default function App({ Component, pageProps }) {
  return <Body>
    <Header /> 
    <Component {...pageProps} />;
    <Footer />
  </Body>
}