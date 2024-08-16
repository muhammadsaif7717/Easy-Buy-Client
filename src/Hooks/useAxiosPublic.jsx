import axios from "axios";

export const axiosPublic = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL || 'http://localhost:5000/products',
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;