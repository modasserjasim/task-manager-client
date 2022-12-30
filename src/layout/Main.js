import React from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import Footer from '../Pages/Shared/Footer';
import Header from '../Pages/Shared/Header';

const Main = () => {
    return (
        <div>
            <Header></Header>
            <div className='min-h-[83vh]'>
                <Outlet></Outlet>
                <ScrollRestoration />
            </div>

            <Footer></Footer>
        </div>
    );
};

export default Main;