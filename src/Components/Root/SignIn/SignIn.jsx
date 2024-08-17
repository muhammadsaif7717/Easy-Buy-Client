import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import SocialLogin from "../../Shared/SocialLogin/SocialLogin";
import { Helmet } from "react-helmet-async";


const SignIn = () => {
    const { loginUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleCreateUser = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        //login user
        loginUser(email, password)
            .then((res) => {
                if (res.user) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "User Signed In Successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });

                    // then reset form
                    form.reset();
                    setTimeout(() => {
                        navigate(location?.state?.from || '/');
                    }, 1700);
                }

            })
            .then(() => {

            })
            .catch(() => {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Invallid Email or Password",
                    showConfirmButton: false,
                    timer: 2000
                });
            })
    }
    return (
        <>
            <Helmet><title>Easy Buy | Sign In</title></Helmet>
            <div className=" flex justify-center items-center min-h-screen">
                <div className="flex flex-col items-center justify-center gap-5 border border-gray-200 shadow-2xl card w-96 p-5">
                    <h1 className="font-bold text-3xl text-green-500">Sign In Now!</h1>
                    <form onSubmit={handleCreateUser} className="flex flex-col gap-3 w-full">
                        <div className="flex flex-col gap-2">
                            <label className="font-semibold">Email </label>
                            <input
                                type="text"
                                name="email"
                                placeholder="Your Email..."
                                className="input input-bordered"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="font-semibold">Password</label>
                            <input
                                type="text"
                                name="password"
                                placeholder="Your Password..."
                                className="input input-bordered"
                                required
                            />
                        </div>
                        <div className="mt-3">
                            <button className="btn btn-primary w-full">Sign In</button>
                        </div>
                    </form>
                    <div className="mt-3">
                        <SocialLogin></SocialLogin>
                    </div>
                    <div className="mt-3">
                        <p className="">No account? <Link to={`/signUp`} className="text-blue-500 font-semibold">Sign Up</Link></p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignIn;