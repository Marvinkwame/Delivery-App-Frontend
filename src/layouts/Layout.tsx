//import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import React from 'react'

type Props = {
    children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
    return (
        <div className='flex flex-col min-h-screen bg-[#e9f5e3]'>
            <Nav />
            <div className="container mx-auto py-10 flex-1">
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default Layout