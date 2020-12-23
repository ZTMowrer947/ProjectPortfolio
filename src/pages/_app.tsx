/* eslint-disable react/jsx-props-no-spreading */
// Imports
import '../app.scss';

import { AppProps } from 'next/app';
import Head from 'next/head';
import { FC } from 'react';
import Container from 'react-bootstrap/Container';

import Footer from '../components/Footer';
import Header from '../components/Header';

// App component
const CustomApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>Zack Mowrer | Software Developer</title>
      </Head>
      <Header />
      <Container fluid>
        <Component {...pageProps} />
      </Container>
      <hr />
      <Footer />
    </>
  );
};

// Exports
export default CustomApp;
