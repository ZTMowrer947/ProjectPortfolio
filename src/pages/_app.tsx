/* eslint-disable react/jsx-props-no-spreading */
// Imports
import '../app.scss';
import React from 'react';
import { AppProps } from 'next/app';
import Container from 'react-bootstrap/Container';

import Header from '../components/Header';

// App component
const CustomApp: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <>
            <Header />
            <Container fluid>
                <Component {...pageProps} />
            </Container>
        </>
    );
};

// Exports
export default CustomApp;
