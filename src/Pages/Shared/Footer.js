import React from 'react';

const Footer = () => {
    return (
        <div>
            <hr className="border-blueGray-300" />
            <div className="flex flex-wrap items-center md:justify-between justify-center">
                <div className="w-full md:w-4/12 px-4 mx-auto text-center">
                    <div className="text-sm text-blueGray-500 font-semibold py-5">
                        Copyright © <span id="get-current-year">2022</span>  Task Manager by
                        <a href="https://modasserjasim.com" className="text-blueGray-500 hover:text-blueGray-800"> Modasser Jasim</a>.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;