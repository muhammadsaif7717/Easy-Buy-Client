import { createBrowserRouter } from "react-router-dom";
import Root from "../Layouts/Root";
import Home from "../Components/Root/Home/Home";
import ErrorPage from "../Components/Shared/DarkMode/ErrorPage/ErrorPage";
import Products from "../Components/Root/Products/Products";

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
                path:'/products',
                element: <Products></Products>
            },
        ]
    },
]);

export default router;