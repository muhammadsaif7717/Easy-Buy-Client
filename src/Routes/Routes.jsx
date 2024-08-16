import { createBrowserRouter } from "react-router-dom";
import Root from "../Layouts/Root";
import Home from "../Components/Root/Home/Home";
import ErrorPage from "../Components/Shared/DarkMode/ErrorPage/ErrorPage";
import SignUp from "../Components/Root/SignUp/SignUp";
import SignIn from "../Components/Root/SignIn/SignIn";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path:'/',
                element: <Home></Home>
            },
            {
                path:'/signUp',
                element: <SignUp></SignUp>
            },
            {
                path:'/signIn',
                element: <SignIn></SignIn>
            },
        ]
    },
]);

export default router;