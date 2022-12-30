import { createBrowserRouter } from "react-router-dom";
import Main from "../../layout/Main";
import AddTask from "../../Pages/AddTask/AddTask";
import CompletedTask from "../../Pages/CompletedTasks/CompletedTask";
import Home from "../../Pages/Home/Home";
import Login from "../../Pages/Login/Login";
import MyTasks from "../../Pages/MyTasks/MyTasks";
import SignUp from "../../Pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute/PrivateRoute";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <PrivateRoute><AddTask></AddTask></PrivateRoute>
            },
            {
                path: '/my-tasks',
                element: <PrivateRoute><MyTasks></MyTasks></PrivateRoute>
            },
            {
                path: '/completed-tasks',
                element: <PrivateRoute><CompletedTask></CompletedTask></PrivateRoute>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            }
        ]
    }
])