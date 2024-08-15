import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Helmet } from "react-helmet-async";

const Home = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            try {
                const res = await axios.get('products.json');
                console.log('Fetched data:', res.data); // Check the structure of the response data
                return res.data;
            } catch (err) {
                console.error('Error fetching data:', err);
                throw err;
            }
        }
    });

    // Data processing
    const products = Array.isArray(data) ? data : [];
    console.log(products)

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading products</div>;

    return (
        <>
            <Helmet><title>Easy Buy | Home</title></Helmet>
            <div className="min-h-screen pt-40">
                This is home
                {
                    products.map((product, idx) =>
                        <div key={idx}>
                            {idx + 1} &nbsp; &nbsp; &nbsp;{product.name} &nbsp; &nbsp; &nbsp;
                            <img src={product.image} className="w-40 inline" alt={product.name} />
                        </div>
                    )
                }
            </div>
        </>
    );
};

export default Home;
