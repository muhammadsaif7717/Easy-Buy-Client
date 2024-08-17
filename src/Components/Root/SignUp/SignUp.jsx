import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import SocialLogin from "../../Shared/SocialLogin/SocialLogin";
import { Helmet } from "react-helmet-async";


const SignUp = () => {
    const { createNewUser, updateUserProfile } = useAuth()
    const navigate = useNavigate();
    const location = useLocation();
    const axiosPublic = useAxiosPublic();

    const handleCreateUser = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        //create new user
        createNewUser(email, password)
            .then(res => {
                // console.log('New User', res.user)
                if (res.user) {

                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "User Created Successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });

                    // if not existing user post to database
                    const newUser = {
                        name: name,
                        email: email,
                        role: 'user',
                    }
                    axiosPublic.post('/users', newUser)

                    // then reset form
                    form.reset();
                    setTimeout(() => {
                        navigate(location?.state?.from || '/');
                    }, 1700);
                }
                //then update profile
                updateUserProfile(name)
                    .then(() => {
                        // console.log('User Profile Updated')
                    })
            })
            .catch(err => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                });
                console.log(err.message)
            })
    };



    return (
        <>
            <Helmet><title>Easy Buy | Sign Up</title></Helmet>
            <div className=" flex justify-center items-center min-h-screen">
                <div className="flex flex-col items-center justify-center gap-5 border border-gray-200 shadow-2xl card w-96 p-5">
                    <h1 className="font-bold text-3xl text-green-500">Sign Up Now!</h1>
                    <form onSubmit={handleCreateUser} className="flex flex-col gap-3 w-full">
                        <div className="flex flex-col gap-2">
                            <label className="font-semibold">Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Your name..."
                                className="input input-bordered"
                                required
                            />
                        </div>
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
                            <button className="btn btn-primary w-full">Sign Up</button>
                        </div>
                    </form>
                    <div className="mt-3">
                        <SocialLogin></SocialLogin>
                    </div>
                    <div className="mt-3">
                        <p className="">Already have account? <Link to={`/signIn`} className="text-blue-500 font-semibold">Sign In</Link></p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;