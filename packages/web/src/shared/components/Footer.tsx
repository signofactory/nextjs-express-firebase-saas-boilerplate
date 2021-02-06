import styles from 'styles/components/footer.module.scss';

export const Footer = () => (
  <footer className={styles.footer}>
    <p>
      Open source boilerplate by SignoFactory. <br />
      See{' '}
      <a href="https://github.com/signofactory/nextjs-express-firebase-saas-boilerplate">
        the code on Github
      </a>
      .
    </p>
  </footer>
);
