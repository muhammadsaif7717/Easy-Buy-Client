import axios from "axios";
// import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";


const SignUp = () => {
    const { user: saif } = useAuth()
    // const {setEmailOrPhone}=useContext(AuthContext)
    const naviagate = useNavigate();

    const handleCreateUser = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const user = {
            name: name,
            email: email,
            password: password,
        }
        console.log(user, saif)
        axios.post(`http://localhost:5000/users`, user)
            .then((res) => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "User Created Successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    form.reset()
                }
            })
            .then(() => naviagate('/'))
    }
    return (
        <div className="bg-base-300 flex justify-center items-center min-h-screen">
            <div className="flex flex-col items-center justify-center gap-5 bg-[#282a358d] card w-96 p-5">
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
                    <div className="mt-3">
                        <p className="text-white">Already have account? <Link to={`/signIn`} className="text-blue-500 font-semibold">Sign In</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;