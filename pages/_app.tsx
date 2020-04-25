import 'antd/dist/antd.css';
import styled from 'styled-components';
import colors from '../src/style/Colors';

const Body = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  background:
		linear-gradient(90deg, ${colors.dark} ($dot-space - $dot-size), transparent 1%) center,
		linear-gradient($bg-color ($dot-space - $dot-size), transparent 1%) center,
		$dot-color;
	background-size: $dot-space $dot-space;
`;

// This default export is required in a new `pages/_app.js` file.
export default function App({ Component, pageProps }) {
  return <Body>
    <Component {...pageProps} />
  </Body>
}