import React from 'react';
import Header from '../components/header2';
import Footer from '../components/footer';

/*const LoginLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="layout">
            <Header />
            <div className="content">{children}</div>
            <Footer />
        </div>
    );
};

export default LoginLayout;*/
import { Outlet } from "react-router-dom";

function MainLayout() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
}

export default MainLayout;