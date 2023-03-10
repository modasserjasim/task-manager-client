import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import { toast } from 'react-toastify';
import { BsEye, BsEyeSlash } from "react-icons/bs";
import Spinner from '../../components/Spinner';

const SignUp = () => {
    const [passwordShown, setPasswordShown] = useState(false);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { createUser, updateUserProfile, loading, setLoading, signInWithGoogle } = useContext(AuthContext);

    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const navigate = useNavigate();

    const handleSignUp = data => {
        // console.log(data);
        // add image to imageBB
        const image = data.img[0];
        const formData = new FormData();
        formData.append('image', image);
        // console.log(image);
        const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMGBB_KEY}`;
        fetch(url, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    createUser(data.email, data.password)
                        .then(result => {
                            const user = result.user;
                            setLoading(false);
                            toast.success(`You have successfully created your account, ${data.name}`);
                            //update profile
                            updateUserProfile(data.name, imgData.data.display_url)
                                .then(() => {
                                    setLoading(false);
                                    navigate(from, { replace: true });
                                })
                                .catch(err => toast.error(err));

                        })
                        .catch(err => {
                            toast.error('Sorry!', err.code);
                            setLoading(false);
                        })
                }
            })

    }
    const handleGoogleSignin = () => {
        signInWithGoogle()
            .then(result => {
                const user = result.user;
                navigate(from, { replace: true });
                toast.success(`${user.displayName}, you have successfully logged in!`)

            })
    }

    return (
        <section className="relative bg-white overflow-hidden">
            <div className="relative z-10 flex flex-wrap items-center -m-8 ">
                <div className="w-full md:w-7/12 p-8 md:min-h-[85vh] py-16 bg-gradient-to-br from-blue-50 flex flex-col justify-center">
                    <div className="container px-4 mx-auto">
                        <div className="flex flex-wrap">
                            <div className="w-full">
                                <div className="md:max-w-lg mx-auto">
                                    <h2 className="mb-16 text-4xl sm:text-6xl md:text-5xl font-bold font-heading tracking-px-n leading-tight">Sign up and organize your work and life, finally.</h2>
                                    <h3 className="mb-9 text-xl font-bold font-heading leading-normal">Become focused, organized, and calm with Task Manager.</h3>
                                    <ul className="md:max-w-xs">
                                        <li className="mb-5 flex flex-wrap">
                                            <svg className="mr-2 text-green-800" width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M12.5 23C18.0228 23 22.5 18.5228 22.5 13C22.5 7.47715 18.0228 3 12.5 3C6.97715 3 2.5 7.47715 2.5 13C2.5 18.5228 6.97715 23 12.5 23ZM17.1339 11.3839C17.622 10.8957 17.622 10.1043 17.1339 9.61612C16.6457 9.12796 15.8543 9.12796 15.3661 9.61612L11.25 13.7322L9.63388 12.1161C9.14573 11.628 8.35427 11.628 7.86612 12.1161C7.37796 12.6043 7.37796 13.3957 7.86612 13.8839L10.3661 16.3839C10.8543 16.872 11.6457 16.872 12.1339 16.3839L17.1339 11.3839Z" fill="green"></path>
                                            </svg>
                                            <span className="flex-1 font-medium leading-relaxed">Add your tasks. Organize your life. Achieve more every day.</span>
                                        </li>
                                        <li className="mb-5 flex flex-wrap">
                                            <svg className="mr-2 text-green-800" width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M12.5 23C18.0228 23 22.5 18.5228 22.5 13C22.5 7.47715 18.0228 3 12.5 3C6.97715 3 2.5 7.47715 2.5 13C2.5 18.5228 6.97715 23 12.5 23ZM17.1339 11.3839C17.622 10.8957 17.622 10.1043 17.1339 9.61612C16.6457 9.12796 15.8543 9.12796 15.3661 9.61612L11.25 13.7322L9.63388 12.1161C9.14573 11.628 8.35427 11.628 7.86612 12.1161C7.37796 12.6043 7.37796 13.3957 7.86612 13.8839L10.3661 16.3839C10.8543 16.872 11.6457 16.872 12.1339 16.3839L17.1339 11.3839Z" fill="green"></path>
                                            </svg>
                                            <span className="flex-1 font-medium leading-relaxed">Delightfully simple and deceptively powerful task management</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-5/12 p-8 md:min-h-[85vh] bg-white mb-10 flex flex-col justify-center">

                    <div className="md:max-w-md px-5 md:px-0">
                        <div className=''>
                            <div>

                                <button onClick={handleGoogleSignin} type="button" className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full">
                                    <svg width={19} height={20} viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18.9892 10.1871C18.9892 9.36767 18.9246 8.76973 18.7847 8.14966H9.68848V11.848H15.0277C14.9201 12.767 14.3388 14.1512 13.047 15.0812L13.0289 15.205L15.905 17.4969L16.1042 17.5173C17.9342 15.7789 18.9892 13.221 18.9892 10.1871Z" fill="#4285F4" />
                                        <path d="M9.68813 19.9314C12.3039 19.9314 14.4999 19.0455 16.1039 17.5174L13.0467 15.0813C12.2286 15.6682 11.1306 16.0779 9.68813 16.0779C7.12612 16.0779 4.95165 14.3395 4.17651 11.9366L4.06289 11.9465L1.07231 14.3273L1.0332 14.4391C2.62638 17.6946 5.89889 19.9314 9.68813 19.9314Z" fill="#34A853" />
                                        <path d="M4.17667 11.9366C3.97215 11.3165 3.85378 10.6521 3.85378 9.96562C3.85378 9.27905 3.97215 8.6147 4.16591 7.99463L4.1605 7.86257L1.13246 5.44363L1.03339 5.49211C0.37677 6.84302 0 8.36005 0 9.96562C0 11.5712 0.37677 13.0881 1.03339 14.4391L4.17667 11.9366Z" fill="#FBBC05" />
                                        <path d="M9.68807 3.85336C11.5073 3.85336 12.7344 4.66168 13.4342 5.33718L16.1684 2.59107C14.4892 0.985496 12.3039 0 9.68807 0C5.89885 0 2.62637 2.23672 1.0332 5.49214L4.16573 7.99466C4.95162 5.59183 7.12608 3.85336 9.68807 3.85336Z" fill="#EB4335" />
                                    </svg>
                                    <p className="text-base font-medium ml-4 text-gray-700">Continue with Google</p>
                                </button>
                                <button type="button" className="focus:outline-none  focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-4">
                                    <svg width={21} height={20} viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M10.1543 0C4.6293 0 0.154298 4.475 0.154298 10C0.153164 12.0993 0.813112 14.1456 2.04051 15.8487C3.26792 17.5517 5.00044 18.8251 6.9923 19.488C7.4923 19.575 7.6793 19.275 7.6793 19.012C7.6793 18.775 7.6663 17.988 7.6663 17.15C5.1543 17.613 4.5043 16.538 4.3043 15.975C4.1913 15.687 3.7043 14.8 3.2793 14.562C2.9293 14.375 2.4293 13.912 3.2663 13.9C4.0543 13.887 4.6163 14.625 4.8043 14.925C5.7043 16.437 7.1423 16.012 7.7163 15.75C7.8043 15.1 8.0663 14.663 8.3543 14.413C6.1293 14.163 3.8043 13.3 3.8043 9.475C3.8043 8.387 4.1913 7.488 4.8293 6.787C4.7293 6.537 4.3793 5.512 4.9293 4.137C4.9293 4.137 5.7663 3.875 7.6793 5.163C8.49336 4.93706 9.33447 4.82334 10.1793 4.825C11.0293 4.825 11.8793 4.937 12.6793 5.162C14.5913 3.862 15.4293 4.138 15.4293 4.138C15.9793 5.513 15.6293 6.538 15.5293 6.788C16.1663 7.488 16.5543 8.375 16.5543 9.475C16.5543 13.313 14.2173 14.163 11.9923 14.413C12.3543 14.725 12.6673 15.325 12.6673 16.263C12.6673 17.6 12.6543 18.675 12.6543 19.013C12.6543 19.275 12.8423 19.587 13.3423 19.487C15.3273 18.8168 17.0522 17.541 18.2742 15.8392C19.4962 14.1373 20.1537 12.0951 20.1543 10C20.1543 4.475 15.6793 0 10.1543 0Z"
                                            fill="#333333"
                                        />
                                    </svg>
                                    <p className="text-base font-medium ml-4 text-gray-700">Continue with Github</p>
                                </button>
                                <div className="w-full flex items-center justify-between py-5">
                                    <hr className="w-full bg-gray-400" />
                                    <p className="text-base font-medium leading-4 px-2.5 text-gray-400">OR</p>
                                    <hr className="w-full bg-gray-400  " />
                                </div>
                            </div>

                        </div>
                        <form onSubmit={handleSubmit(handleSignUp)}>
                            <div className="relative">
                                <input {...register("name", { required: "Name is required" })} type="text" name='name' id="floating_outlined-name" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer" placeholder=" " required />
                                <label htmlFor="floating_outlined-name" className="absolute text-md text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Your Name</label>
                                <div>
                                    {errors.email && <p role="alert" className='text-red-700 text-xs'>{errors.email?.message}</p>}
                                </div>
                            </div>
                            <div className="relative mt-4">
                                <input {...register("img", { required: "Image is required" })} type="file" name='img' id="floating_outlined-img" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer" placeholder=" " required />
                                <label htmlFor="floating_outlined-img" className="absolute text-md text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Choose Profile Photo</label>
                                <div>
                                    {errors.img && <p role="alert" className='text-red-700 text-xs'>{errors.img?.message}</p>}
                                </div>

                            </div>
                            <div className="relative mt-4">
                                <input {...register("email", { required: "Email Address is required" })} type="email" id="floating_outlined-email" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer" placeholder=" " required />
                                <label htmlFor="floating_outlined-email" className="absolute text-md text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Email Address</label>
                                <div>
                                    {errors.email && <p role="alert" className='text-red-700 text-xs'>{errors.email?.message}</p>}
                                </div>
                            </div>
                            <div className="w-full pt-4">
                                <div className="relative flex items-center justify-center">
                                    <div className='w-full'>
                                        <input {...register("password", {
                                            required: "Password is required!",
                                            minLength: { value: 8, message: "Password should be at least 8 char" },
                                            pattern: {
                                                value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8}/
                                                , message: "Please use symbol, num, upper & lowercase"
                                            }
                                        })} type={passwordShown ? "text" : "password"} id="floating_outlined-pass" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer" placeholder=" " required />
                                        <label htmlFor="floating_outlined-pass" className="absolute text-md text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Password</label>
                                    </div>
                                    <div onClick={() => setPasswordShown(!passwordShown)} className="absolute right-0 mr-3 cursor-pointer">
                                        {
                                            passwordShown ? <BsEyeSlash /> : <BsEye />
                                        }
                                    </div>

                                </div>
                                {errors.password && <p role="alert" className='text-red-700 text-xs'>{errors.password?.message}</p>}
                            </div>


                            <div className="mt-8">
                                <button type="submit" className="text-lg rounded-md font-semibold leading-none text-white focus:outline-none bg-green-800 hover:bg-green-600 py-4 w-full">

                                    {loading ? <Spinner /> : 'Create my account'}
                                </button>
                            </div>
                        </form>
                        <p className="text-sm mt-8 font-medium leading-none text-gray-500">
                            Already have an account?{" "}
                            <Link to='/login' tabIndex={0} className="text-sm font-medium leading-none underline text-gray-800 cursor-pointer">
                                {" "}
                                Login here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignUp;