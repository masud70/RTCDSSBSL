import React from 'react';
import Navbar from './navbar';


export default function Layout({ children }) {
  return (
    <>
        <Navbar/>
        <main className=' bg-gray-200'>{children}</main>
    </>
  )
}
