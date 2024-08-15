import { Outlet } from "react-router-dom";
import Footer from "../Components/Root/Footer/Footer";
import NavBar from "../Components/Root/NavBar/NavBar";


const Root = () => {
    return (
        <div>
            <NavBar></NavBar>
            <div className="min-h-screen py-40">
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Root;