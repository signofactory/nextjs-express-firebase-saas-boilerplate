import 'styles/antd.css';
import type { AppProps } from 'next/app';

// Providers
import { AuthProvider } from 'shared/utils/auth/AuthContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
