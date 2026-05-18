import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';

/*const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="layout">
            <Header />
            <div className="content">{children}</div>
            <Footer />
        </div>
    );
};

export default MainLayout;*/
import { Outlet } from "react-router-dom";

function MainLayout() {
    return (
        <>
            <Header />
            <div className="content">
                <Outlet />
            </div>
            <Footer />
        </>
    );
}

export default MainLayout;