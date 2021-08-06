import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app';
import { GlobalProvider } from '../context/GlobalContext';
import '../styles/globals.css';
function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    typeof document !== undefined
      ? require('bootstrap/dist/js/bootstrap.bundle')
      : null;
  }, []);
  return (
    <GlobalProvider>
      <Component {...pageProps} />
    </GlobalProvider>
  );
}
export default MyApp;
