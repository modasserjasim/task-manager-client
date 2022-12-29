import React from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import Footer from '../../../../assignment-11/my-panoramic-client/src/Pages/Shared/Footer/Footer';
import Header from '../Pages/Shared/Header';

const Main = () => {
    return (
        <div>
            <Header></Header>
            <div>
                <Outlet></Outlet>
                <ScrollRestoration />
            </div>

            <Footer></Footer>
        </div>
    );
};

export default Main;