import { Rating } from "@smastrom/react-rating";
import { useQuery } from "@tanstack/react-query";
import '@smastrom/react-rating/style.css';
import axios from "axios";
import { useState, useMemo } from "react";
import './Products.css';
import ReactPaginate from "react-paginate";

const Products = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchQuery, setSearchQuery] = useState(''); // Stores the actual query used to filter results
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [sortBy, setSortBy] = useState('default'); // Set default sorting
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 9;

    const { data, isLoading } = useQuery({
        queryKey: ['products', searchQuery, brand, category, minPrice, maxPrice, sortBy],
        queryFn: async () => {
            const res = await axios.get('http://localhost:5000/products'); // Fetch all products
            return res.data;
        }
    });

    // Perform filtering and sorting
    const filteredProducts = useMemo(() => {
        if (!data?.products) return [];
        return data.products.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (brand ? product.brand === brand : true) &&
            (category ? product.category === category : true) &&
            (minPrice ? product.price >= parseFloat(minPrice) : true) &&
            (maxPrice ? product.price <= parseFloat(maxPrice) : true)
        );
    }, [data?.products, searchQuery, brand, category, minPrice, maxPrice]);

    const sortedProducts = useMemo(() => {
        if (!filteredProducts) return [];
        switch (sortBy) {
            case 'priceAsc':
                return [...filteredProducts].sort((a, b) => a.price - b.price);
            case 'priceDesc':
                return [...filteredProducts].sort((a, b) => b.price - a.price);
            case 'createdAt':
                return [...filteredProducts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            default:
                return filteredProducts; // Default: No sorting
        }
    }, [filteredProducts, sortBy]);

    if (isLoading) return (
        <div className="flex justify-center h-full">
            <span className="loading loading-dots loading-lg"></span>
        </div>
    );

    // Calculate pagination details
    const pageCount = Math.ceil(sortedProducts.length / itemsPerPage);
    const paginatedProducts = sortedProducts.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    return (
        <div className="container mx-auto">
            <br /><hr /><br />
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                {/* Search */}
                <div className="relative w-full md:w-72 lg:w-96">
                    <input
                        type="text"
                        placeholder="Search by name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="input input-bordered w-full "
                    />
                    <button onClick={() => setSearchQuery(searchTerm)} className="btn btn-primary absolute right-[0%]">Search</button>
                </div>
                {/* Sorting */}
                <div className="w-full md:w-72">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="select select-bordered w-full">
                        <option value="default">Sort by</option>
                        <option value="createdAt">Newly Added</option>
                        <option value="priceAsc">Price: Low to High</option>
                        <option value="priceDesc">Price: High to Low</option>
                    </select>
                </div>
            </div>
            <br /><hr /><br />
            {/* Filtering */}
            <div className="flex justify-between">
                <div className="w-full">
                    <h1 className="text-2xl text-center mb-5">Filter Products</h1>
                    <div className="flex flex-col md:flex-row gap-4 justify-between">
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="select select-bordered w-full md:w-52 lg:w-60">
                            <option value="">Select Category</option>
                            <option>Audio</option>
                            <option>Cameras</option>
                            <option>Computers</option>
                            <option>Gaming</option>
                            <option>Home Appliances</option>
                            <option>Home Entertainment</option>
                            <option>Kitchen Appliances</option>
                            <option>Personal Care</option>
                            <option>Smart Home</option>
                            <option>Accessories</option>
                        </select>
                        <select
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                            className="select select-bordered w-full md:w-52 lg:w-60">
                            <option value="">Select Brand</option>
                            <option>Samsung</option>
                            <option>Apple</option>
                        </select>
                        <select
                            value={`${minPrice}-${maxPrice}`}
                            onChange={(e) => {
                                const [min, max] = e.target.value.split('-');
                                setMinPrice(min);
                                setMaxPrice(max);
                            }}
                            className="select select-bordered w-full md:w-52 lg:w-60">
                            <option value="">Select Price Range</option>
                            <option value="10-49.99">10$ to 49.99$</option>
                            <option value="50-99.99">50$ - 99.99$</option>
                            <option value="100-199.99">100$ - 199.99$</option>
                            <option value="200-499.99">200$ - 499.99$</option>
                            <option value="500-999.99">500$ - 999.99$</option>
                            <option value="1000-1999.99">1000$ - 1999.99$</option>
                            <option value="2000-4999.99">2000$ - 4999.99$</option>
                            <option value="5000-9999.99">5000$ - 9999.99$</option>
                            <option value="10000-">10000$+</option>
                        </select>
                    </div>
                </div>
            </div>
            <br /><hr /><br />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {paginatedProducts.length === 0 ? (
                    <div className="text-center">No products found.</div>
                ) : (
                    paginatedProducts.map((product) => (
                        <div key={product._id} className="card bg-base-100 w-full shadow-xl">
                            <figure><img src={product.image} alt={product.name} /></figure>
                            <div className="card-body">
                                <h2 className="card-title">
                                    {product.name}
                                    <div className="badge badge-secondary">NEW</div>
                                </h2>
                                <p>{product.description}</p>
                                <div className="card-actions justify-between">
                                    <Rating
                                        style={{ maxWidth: 180 }}
                                        value={product.ratings}
                                        readOnly
                                    />
                                    <div className="badge badge-outline font-bold p-4">{product.price} $</div>
                                    <div className="badge font-bold badge-outline p-4">{product.ratings}</div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div className="pagination-controls flex justify-center mt-14 scale-75 md:scale-100">
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    breakLabel={"..."}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={(selectedItem) => setCurrentPage(selectedItem.selected)}
                    containerClassName={"pagination"}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                    activeClassName={"active"}
                />
            </div>
        </div>
    );
};

export default Products;
