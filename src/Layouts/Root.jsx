import { Outlet } from "react-router-dom";
import NavBar from "../Components/Root/NavBar/NavBar";
import Footer from "../Components/Root/Footer/Footer";


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