import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const Home = () => {
    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:5000/users')
            return res.data;
        }
    })

    console.log(users)
    return (
        <div className="min-h-screen">
            This is home
        </div>
    );
};

export default Home;