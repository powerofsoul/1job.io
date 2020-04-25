import 'antd/dist/antd.css';
import Header from '../src/common/Header';
import Footer from '../src/common/Footer';

// This default export is required in a new `pages/_app.js` file.
export default function App({ Component, pageProps }) {
  return <>
    <Header /> 
    <Component {...pageProps} />;
    <Footer />
  </>
}