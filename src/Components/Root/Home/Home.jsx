import { Helmet } from "react-helmet-async";
import Products from "../Products/Products";

const Home = () => {


    return (
        <>
            <Helmet><title>Easy Buy | Home</title></Helmet>
            <div className="px-5 lg:px-0">
                This is home

                <Products></Products>
            </div>
        </>
    );
};

export default Home;
