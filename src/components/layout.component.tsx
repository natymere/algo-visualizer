import Head from 'next/head';
import { ReactNode } from 'react';
import Footer from './footer.component';
import styles from './layout.module.css';
import Nav from './nav.component';

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <Head>
        <title>Algo Visualizer</title>
        <meta name="description" content="Generated by create next app" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🦄</text></svg>"
        />
      </Head>
      <Nav></Nav>
      {children}
      <Footer></Footer>
    </>
  );
}
