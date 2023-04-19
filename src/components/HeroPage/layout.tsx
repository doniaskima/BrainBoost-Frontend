import Footer from "../subComponents/Footer/Footer"
import Navbar from "../subComponents/Navbar/Navbar"
import React, { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <header>
                <title>IO Academy</title>
                <meta name='description' content='Mastering computer science fundamentals from zero to hero, with the best experts around the world.' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='icon' href='/favicon.ico' />
            </header>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </>
    )
}

export default Layout