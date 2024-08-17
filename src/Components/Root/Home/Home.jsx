import { Helmet } from "react-helmet-async";
import Products from "../Products/Products";

const Home = () => {


    return (
        <>
            <Helmet><title>Easy Buy | Home</title></Helmet>
            <div className="px-5 lg:px-0">
                <div className="mb-6 flex items-center justify-center text-center">
                    <div>
                        <h1 className="text-sm md:text-xl lg:text-2xl font-bold">Find Your Products with</h1>
                        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-orange-500">Easy Buy</h1>
                    </div>
                </div>
                <Products></Products>
            </div>
        </>
    );
};

export default Home;
