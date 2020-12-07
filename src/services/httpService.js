import axios from "axios";
import {toast} from "react-toastify";


axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(success=>{
    console.log(success);
    // toast.success('You are logged in successfully!');
    return success;
},error =>{
    const expectedError = error.response &&
        error.response.status >=400 &&
        error.response.status <500;
    if (expectedError){
        console.log(error.response);
        toast.error(error.response.data);
    }
    if(!expectedError){
        console.log(error);
        toast.error('An Unexpected error occured!');
    }
    return Promise.reject(error);
});

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
};
