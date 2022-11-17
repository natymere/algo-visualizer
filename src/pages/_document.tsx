import { Html, Head, Main, NextScript } from 'next/document';
import Nav from '../components/nav.component';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        ></link> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
