// Imports
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Nav from 'react-bootstrap/Nav';

// Prop Types
interface PropTypes {
    href: string;
}

// Component
const NavLink: React.FC<PropTypes> = ({ children, href }) => {
    // Get router and extract pathname
    const { pathname } = useRouter();

    // Determine whether this link is active
    const active = pathname === href;

    // Render Bootstrap NavLink inside Next Link
    return (
        <Link href={href} passHref>
            <Nav.Link active={active}>{children}</Nav.Link>
        </Link>
    );
};

// Exports
export default NavLink;
