import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Components/Root/Footer/Footer";
import NavBar from "../Components/Root/NavBar/NavBar";


const Root = () => {
    const location = useLocation();
    const ifLoginPage = location.pathname.includes('signIn')
    const ifSignUpPage = location.pathname.includes('signUp')
    return (
        <div>
            {(ifLoginPage || ifSignUpPage) || <NavBar></NavBar>}
            <div className={ifLoginPage || ifSignUpPage ?"min-h-screen py-0":"min-h-screen pb-10 pt-[105px]"}>
                <Outlet></Outlet>
            </div>
            {(ifLoginPage || ifSignUpPage) || <Footer></Footer>}
        </div>
    );
};

export default Root;