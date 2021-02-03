import Head from 'next/head';

// Components
import { Card, Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

// Styles
import styles from 'styles/pages/home.module.scss';

const Logged = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>SaaS boilerplate - Logged in!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Card className={styles.card}>
          <p>You are logged in</p>
          <Button
            className={styles.googleSignIn}
            type="primary"
            size="large"
            icon={<LogoutOutlined />}
            onClick={() => null}
          >
            Log me out!
          </Button>
        </Card>
      </main>
    </div>
  );
};

export default Logged;
