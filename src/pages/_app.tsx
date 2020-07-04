/* eslint-disable react/jsx-props-no-spreading */
// Imports
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import Container from 'react-bootstrap/Container';

import '../app.scss';
import Header from '../components/Header';

// App component
const CustomApp: React.FC<AppProps> = ({ Component, pageProps }) => {
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
        </>
    );
};

// Exports
export default CustomApp;
