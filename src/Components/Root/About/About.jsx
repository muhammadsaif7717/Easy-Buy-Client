import { Helmet } from "react-helmet-async";
import { SiWebflow } from "react-icons/si";
import { NavLink } from "react-router-dom";


const About = () => {
    return (
        <>
            <Helmet>
                <title>Easy Buy | About</title>
            </Helmet>
                    <div className="text-center flex flex-col items-center justify-center mt-16">
                        <h1 className="text-3xl md:text-5xl font-bold">Hello People!</h1>
                        <p className="py-6 w-3/4 md:w-2/3">
                            Welcome to Easy Buy! Our mission is to ignite a passion for
                            reading by offering a carefully curated selection of books for all
                            ages and interests. With a commitment to personalized service and
                            community engagement, we strive to create a welcoming environment
                            where every reader feels at home. Discover the joy of storytelling
                            with us.
                        </p>
                        <p className="text-lg leading-relaxed mb-4">
                            <b>Located at:</b>  Gulshan, Dhaka <br />
                        </p>
                        <p className="flex gap-1 items-center justify-center mx-auto mb-6">
                            <NavLink to='/'>
                                <button className="btn btn-ghost hover:bg-green-600 hover:text-white">
                                    <SiWebflow /> www.easybuy.com
                                </button>
                            </NavLink>
                        </p>
                        <NavLink to='/'>
                            <button className="btn bg-green-400 hover:bg-green-600 text-white border-none">
                                Get Started
                            </button>
                        </NavLink>
                    </div>
        </>
    );
};

export default About;