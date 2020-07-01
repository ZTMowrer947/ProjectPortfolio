/* eslint-disable react/jsx-props-no-spreading */
// Imports
import React from 'react';
import { AppProps } from 'next/app';
import Container from 'react-bootstrap/Container';

import 'bootstrap/scss/bootstrap.scss';

// App component
const CustomApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
    return (
        <Container fluid>
            <Component {...pageProps} />
        </Container>
    );
};

// Exports
export default CustomApp;
