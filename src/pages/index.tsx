import Head from 'next/head';
import styles from '../styles/base.module.css';
import Layout from '../layouts/layout.component';

export default function Index() {
  return (
    <Layout>
      <div className="main">
        <div className={styles.header}>
          <div className={styles.wrapper}>
            <p className={styles.typewriter}>Welcome, this is CS50 Algo Visualiser 👋</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
