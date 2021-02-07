import 'styles/antd.css';
import type { AppProps } from 'next/app';

// Auth
import { AuthProvider } from 'shared/utils/auth/AuthProvider';

// Providers
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
