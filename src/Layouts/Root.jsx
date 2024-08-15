import { Outlet } from "react-router-dom";
import Footer from "../Components/Root/Footer/Footer";
import NavBar from "../Components/Root/NavBar/NavBar";


const Root = () => {
    return (
        <div>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;