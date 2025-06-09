import axios from 'axios';

// Base URL for your API
export const BASE_URL = "http://localhost:7001/api";

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Get token from localStorage
export const getToken = () => localStorage.getItem("token");

// Generalized API Request handler
export const apiRequest = async (endpoint, data = {}, method = "get") => {
  const token = getToken();
  const isFormData = data instanceof FormData;

  const headers = {
    ...(token && { Authorization: `Bearer ${token}` }),
    // For FormData, do NOT set Content-Type, axios sets it automatically with boundary
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
  };

  try {
    const response = await axiosInstance.request({
      url: endpoint,
      method,
      headers,
      ...(method === "get" ? { params: data } : { data }),
    });

    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    return error.response?.data || { success: false, message: error.message };
  }
};

// Auth APIs
export const loginAPI = async (payload) => {
  const data = await apiRequest("/user/login", payload, "post");
  if (data?.token) {
    localStorage.setItem("token", data.token);
  }
  return data;
};

export const getUserInfo = async () => {
  return await apiRequest("/user/getUserInfo", {}, "get");
};

export const logoutAPI = () => {
  localStorage.removeItem("token");
  window.location.href = "/"; // optional redirect
};

// Brand APIs
export const getAllBrands = async () => {
  return await apiRequest("/brand/getAllBrands", {}, "get");
};

export const addNewBrand = async (payload) => {
  // payload can be FormData or JSON object
  return await apiRequest("/brand/create", payload, "post");
};

export const updateBrand = async (id, payload) => {
  // payload can be FormData or JSON object
  return await apiRequest(`/brand/updateBrand/${id}`, payload, "put");
};

export const deleteBrand = async (id) => {
  return await apiRequest(`/brand/deleteBrand/${id}`, {}, "delete");
};

//  Category APIS


export const addNewCategory = async (payload) => {
  return await apiRequest("/category/create", payload, "post");
};

export const getAllCategories = async () => {
  return await apiRequest("/category/getAllCategories", {}, "get");
};

export const deleteCategory = async (id) => {
  return await apiRequest(`/category/deleteCategory/${id}`, {}, "delete");
};

export const updateCategory = async (id, payload) => {
  return await apiRequest(`/category/updateCategory/${id}`, payload, "put");
};

//  Product APIS


export const getAllProducts = async () => {
  return await apiRequest('/product/getAllProducts', {}, "get");
};

export const addNewProduct = async (payload) => {
  return await apiRequest('/product/create', payload, 'post');
};

export const deleteProduct = async (ID) => {
  return await apiRequest(`/product/deleteProduct/${ID}`, {}, "delete");
};

export const updateProduct = async (ID, payload) => {
  return await apiRequest(`/product/updateProduct/${ID}`, payload, "put");
};

export default axiosInstance;
