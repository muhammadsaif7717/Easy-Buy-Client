import axios from "axios";

export const axiosPublic = axios.create({
    baseURL:'https://scic-job-task-2-server.vercel.app',
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;