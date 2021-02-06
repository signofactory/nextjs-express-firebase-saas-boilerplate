import Head from 'next/head';

// Auth
import { login } from 'shared/utils/auth/functions/login';

// Components
import { Card, Button } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import { Footer } from 'shared/components/Footer';

// Styles
import styles from 'styles/pages/home.module.scss';

const Home = () => {
  const handleLogin = async () => await login({ redirect: '/logged' });

  return (
    <div className={styles.container}>
      <Head>
        <title>SaaS boilerplate</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Sign in to SaaS</h1>
        <Card className={styles.card}>
          <Button
            className={styles.googleSignIn}
            type="primary"
            size="large"
            icon={<GoogleOutlined />}
            onClick={handleLogin}
          >
            Sign in with Google
          </Button>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
