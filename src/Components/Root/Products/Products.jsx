import { Rating } from "@smastrom/react-rating";
import { useQuery } from "@tanstack/react-query";
import '@smastrom/react-rating/style.css'
import axios from "axios";
import { useState } from "react";

const Products = () => {
    const [page, setPage] = useState(1);
    const limit = 9; // Set the limit of items per page

    const { data, isLoading } = useQuery({
        queryKey: ['products', page],
        queryFn: async () => {
            try {
                const res = await axios.get(`http://localhost:5000/products?page=${page}&limit=${limit}`);
                return res.data;
            } catch (err) {
                console.error('Error fetching data:', err);
                throw err;
            }
        }
    });

    if (isLoading) return (
        <div className="flex justify-center h-full">
            <span className="loading loading-dots loading-lg"></span>
        </div>
    );

    const { products, totalPages, currentPage } = data;

    return (
        <>
        <div className="flex items-center justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {
                    products.map((product) =>
                        <div key={product._id} className="card bg-base-100 w-full shadow-xl">
                            <figure>
                                <img
                                    src={product.image} />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">
                                    {product.name}
                                    <div className="badge badge-secondary">NEW</div>
                                </h2>
                                <p>{product.description}</p>
                                <div className="card-actions justify-between">
                                    <Rating
                                        className="text-red-300"
                                        style={{ maxWidth: 180 }}
                                        value={product.ratings}
                                        readOnly
                                    />
                                    <div className="badge badge-outline font-bold p-4">{product.price} $</div>
                                    <div className="badge font-bold badge-outline p-4">{product.ratings}</div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
        {/* Pagination Controls */}
        <div className="flex justify-center mt-4">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setPage(page - 1)}
                    className="btn btn-outline">
                    Previous
                </button>
                <span className="mx-4">Page {currentPage} of {totalPages}</span>
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setPage(page + 1)}
                    className="btn btn-outline">
                    Next
                </button>
            </div>
        </>
    );
};

export default Products;
