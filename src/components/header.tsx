// Imports
import { Link } from 'gatsby';
import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

// Prop Types
interface HeaderPropTypes {
    siteTitle?: string;
}

// Component
const Header: React.FC<HeaderPropTypes> = ({ siteTitle }) => (
    <header className="bg-primary">
        <Navbar variant="dark" expand="lg">
            <Link to="/" className="navbar-brand">
                {siteTitle}
            </Link>
        </Navbar>
    </header>
);

// Export
export default Header;
