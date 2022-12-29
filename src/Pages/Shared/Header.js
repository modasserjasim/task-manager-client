import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { HiMenuAlt1, HiOutlineX } from "react-icons/hi";
import { MdMonochromePhotos } from "react-icons/md";
import { VscSignOut, VscSignIn } from "react-icons/vsc";
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';
import { toast } from 'react-toastify';

const Header = () => {
    const { user, logOut } = useContext(AuthContext);
    const [navbar, setNavbar] = useState(false);

    const handleLogOut = () => {
        logOut()
            .then(() => {
                toast.success('You have logged out from the site');
            })
            .catch((error) => {
                toast.error(error.message);
            });
    }
    return (
        <nav className="w-full shadow sticky top-0 z-50 backdrop-blur-sm bg-white/60">
            <div className="justify-between mx-auto lg:max-w-7xl md:items-center md:flex px-4 md:px-6">
                <div>
                    <div className="flex items-center gap-7 justify-between py-2 md:block">
                        <Link className='flex items-center' to='/'>
                            {/* <img src={logo} alt="Logo" className='w-44' /> */}
                            <MdMonochromePhotos className='text-5xl md:text-7xl text-green-800' />
                            <div>
                                <h2 className='text-xl md:text-3xl font-extrabold leading-none'>Task Manager</h2>
                            </div>
                        </Link>

                        {/* Only for mobile  */}
                        <div className="flex items-center md:hidden">
                            <button
                                className="rounded-md "
                                onClick={() => setNavbar(!navbar)}
                            >
                                {navbar ? (
                                    <HiOutlineX className='text-3xl text-green-800 animate-pulse delay-75 transition' />
                                ) : (
                                    <HiMenuAlt1 className='text-3xl' />
                                )}
                            </button>

                        </div>
                    </div>
                </div>
                <div>
                    <div
                        className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${navbar ? "block" : "hidden"
                            }`}
                    >
                        <div className='flex items-center space-x-6'>
                            <ul className="items-center justify-center space-y-4 md:flex md:space-x-8 md:space-y-0 font-semibold uppercase">
                                <li className=" hover:text-green-800">
                                    <NavLink className={({ isActive }) => isActive ? 'text-green-800' : ''} to='/'>Home</NavLink>
                                </li>
                                <li className=" hover:text-green-800">
                                    <NavLink to='/services' className={({ isActive }) => isActive ? 'text-green-800' : ''}>Services</NavLink>
                                </li>
                                <li className=" hover:text-green-800">
                                    <NavLink to='/blog' className={({ isActive }) => isActive ? 'text-green-800' : ''}>Blog</NavLink>
                                </li >
                                {
                                    user?.uid ? <>
                                        <li className=" hover:text-green-800">
                                            <NavLink className={({ isActive }) => isActive ? 'text-green-800' : ''} to='/my-reviews'>My Reviews</NavLink>
                                        </li>
                                        <li className=" hover:text-green-800">
                                            <NavLink to='/add-service' className={({ isActive }) => isActive ? 'text-green-800' : ''}>Add Service</NavLink>
                                        </li>
                                        <li className="px-4 mr-3 py-2 text-white bg-green-800 rounded-md shadow hover:bg-gray-800 hidden md:block">
                                            <Link className='flex items-center gap-2' onClick={handleLogOut} ><VscSignOut className='text-2xl' /> Logout</Link>
                                        </li >
                                    </> : <>
                                        <Link to='/login'
                                            className="md:flex items-center gap-2 px-4 mr-3 py-2 text-white bg-green-800 rounded-md shadow hover:bg-gray-800 font-medium uppercase hidden"
                                        >
                                            <VscSignIn className='text-2xl' /> Login
                                        </Link>
                                    </>
                                }

                            </ul>

                        </div>


                        <div className="md:hidden sm:inline-block mb-5 mt-6">
                            {
                                user?.uid ? <Link onClick={handleLogOut}
                                    className="flex items-center gap-2 px-4 mr-3 py-2 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
                                >
                                    <VscSignOut /> Log Out
                                </Link> : <>
                                    <Link to='/login'
                                        className="px-4 mr-3 py-2 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800 font-semibold uppercase"
                                    >
                                        Login
                                    </Link>
                                    <Link to='/signup'
                                        className="px-4 py-2 btn-primary rounded-md shadow font-semibold uppercase"
                                    >
                                        Signup
                                    </Link>
                                </>
                            }
                        </div>
                    </div>
                </div>

            </div>
        </nav>
    );
};

export default Header;