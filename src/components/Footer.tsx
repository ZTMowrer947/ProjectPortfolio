// Imports
import React from 'react';

// Component
const Footer: React.FC = () => {
    return (
        <>
            <footer className="w-100 text-center text-dark">
                <p>
                    Powered by{' '}
                    <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer">
                        Next.js
                    </a>
                </p>
            </footer>
            <style jsx>
                {`
                    footer {
                        font-family: 'Work Sans', sans-serif;
                        font-size: 0.75rem;
                    }
                `}
            </style>
        </>
    );
};

// Exports
export default Footer;
