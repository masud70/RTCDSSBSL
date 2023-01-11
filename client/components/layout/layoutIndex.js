import React from 'react';
import Navbar from './navbar';
import Navbar2 from './navBar2';

export default function Layout({ children }) {
    return (
        <>
            <Navbar2 />
            <main className=" bg-gray-200">{children}</main>
        </>
    );
}
