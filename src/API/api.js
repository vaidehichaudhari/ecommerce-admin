import axios from 'axios';

// Base URL for the API
export const BASE_URL = "http://localhost:7001/api";


//axios instance
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});



// Utility functions
export const getToken = () => localStorage.getItem("token");

export const getUser = () => {
    const user = localStorage.getItem("token");
    return user ? JSON.parse(user) : null;
};

export const logoutAPI = () => {
    localStorage.removeItem("token");
    window.location.href = "/"; // optional: redirect to login
};

// Generalized API Request
export const apiRequest = async (endpoint, data = {}, method = "get") => {
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    try {
        const response = await axiosInstance.request({
            url: endpoint,
            method,
            data,
            headers,
        });
        return response.data;
    } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

// Login API
export const loginAPI = async (payload) => {
    const data = await apiRequest("/user/login", payload, "post");
    if (data?.token) {
        localStorage.setItem("token", data.token);
    }
    return data;
};

export const getUserInfo = async () => {
    return await apiRequest("/user/getUserInfo", {}, "get")
}


// brand API 

export const getAllBrands = async () => {
    return await apiRequest("/brand/getAllBrands", {}, "get")
}

export const addNewBrand = async (payload) => {
    return await apiRequest("/brand/create", payload, "post")
}

export const deleteBrand = async (ID) => {
    try {
        return await apiRequest(`/brand/deleteBrand/${ID}`, {}, "delete")
    } catch (error) {
        if (error) {
            throw error
        }
    }



}


export default axiosInstance;