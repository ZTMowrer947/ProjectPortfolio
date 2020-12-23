// Imports
import { FC } from 'react';
import styled from 'styled-components';

// Styled components
const StyledFooter = styled.footer`
  font-family: 'Work Sans', sans-serif;
  font-size: 0.75rem;
`;

// Component
const Footer: FC = () => {
  return (
    <>
      <StyledFooter className="w-100 text-center text-dark">
        <p>
          Powered by{' '}
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Next.js
          </a>
        </p>
      </StyledFooter>
    </>
  );
};

// Exports
export default Footer;
