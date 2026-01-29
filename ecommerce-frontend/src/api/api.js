
// import axios from "axios";

// // Backend base URL (NO trailing slash)
// const API_URL = "http://localhost:9080/api";

// // PRODUCTS
// export const getProducts = () =>
//   axios.get(`${API_URL}/products`);

// export const getProductById = (id) =>
//   axios.get(`${API_URL}/products/${id}`);

// // CATEGORIES
// export const getCategories = () =>
//   axios.get(`${API_URL}/categories`);

// // CART (NO TOKEN)
// export const addToCart = (data) =>
//   axios.post(`${API_URL}/cart`, data);

// export const getCart = (userId) =>
//   axios.get(`${API_URL}/cart/${userId}`);

// // AUTH (NO JWT)
// // Correct
// export const loginUser = (data) =>
//   axios.post(`${API_URL}/auth/login`, data);


// export const registerUser = (data) =>
//   axios.post(`${API_URL}/auth/register`, data);


// // USER → MyOrdersPage
// // api.js

// export const getUserOrders = async (email) => {
//   if (!email) throw new Error("Email is required");

//   const response = await fetch("http://localhost:9080/api/orders/by-email", {
//     headers: {
//       "Content-Type": "application/json",
//       "X-User-Email": email,
//     },
//   });

//   if (response.status === 204) return [];
//   if (!response.ok) {
//     const text = await response.text();
//     throw new Error(`API request failed: ${response.status} ${text}`);
//   }

//   return response.json();
// };

import axios from "axios";

/**
 * Backend base URL
 * Comes from .env (local) or Vercel Environment Variables (prod)
 */
const API_URL = `${process.env.REACT_APP_API_URL}/api`;

/**
 * Axios instance (recommended)
 */
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/* =========================
   PRODUCTS
========================= */
export const getProducts = () =>
  api.get("/products");

export const getProductById = (id) =>
  api.get(`/products/${id}`);

/* =========================
   CATEGORIES
========================= */
export const getCategories = () =>
  api.get("/categories");

/* =========================
   CART
========================= */
export const addToCart = (data) =>
  api.post("/cart", data);

export const getCart = (userId) =>
  api.get(`/cart/${userId}`);

/* =========================
   AUTH
========================= */
export const loginUser = (data) =>
  api.post("/auth/login", data);

export const registerUser = (data) =>
  api.post("/auth/register", data);

/* =========================
   USER ORDERS
========================= */
export const getUserOrders = async (email) => {
  if (!email) throw new Error("Email is required");

  const response = await fetch(`${API_URL}/orders/by-email`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-User-Email": email,
    },
  });

  if (response.status === 204) return [];
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`API request failed: ${response.status} ${text}`);
  }

  return response.json();
};
