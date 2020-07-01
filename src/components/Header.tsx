// Imports
import Link from 'next/link';
import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import NavLink from './NavLink';

// Components
const Header: React.FC = () => {
    return (
        <header className="bg-primary">
            <Navbar variant="dark" expand="lg">
                <Link href="/" passHref>
                    <Navbar.Brand>Zack Mowrer&apos;s Portfolio</Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="#navb" />
                <Navbar.Collapse id="navb">
                    <Nav className="mr-auto">
                        <NavLink href="/">Portfolio</NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>
    );
};

// Exports
export default Header;
