// Next stuff
import Head from 'next/head';
import { InferGetServerSidePropsType } from 'next';

// Utils

// Auth
import { logout } from 'shared/utils/auth/functions/logout';

// Components
import { Card, Button, Avatar } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

// Styles
import styles from 'styles/pages/home.module.scss';
import { Footer } from 'shared/components/Footer';
import withAuth from 'shared/utils/auth/withAuth';

const Logged = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const user = props.AuthUser;

  const handleLogout = async () => await logout({ redirect: '/' });

  return (
    <div className={styles.container}>
      <Head>
        <title>SaaS boilerplate - Logged in!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Card className={styles.card}>
          <p>
            <Avatar style={{ marginRight: 20 }} src={user?.picture} size={60} />
            Howdy, {user?.firstName} 👋🏼
          </p>
          <Button
            className={styles.signOut}
            type="primary"
            size="large"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          >
            Log me out!
          </Button>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export const getServerSideProps = withAuth()(async ({ AuthUser }) => {
  console.log(AuthUser.firstName);
});

export default Logged;
