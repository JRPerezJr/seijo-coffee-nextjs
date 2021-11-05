import '../styles/globals.css';
import { StoreProvider } from '../contexts/coffee-stores/coffee-stores.context';

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  );
}

export default MyApp;
