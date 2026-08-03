// src/api/auth.ts

import axiosInstance from "../../axios/axiosInstance";

// =========================
// Send OTP
// =========================
export const sendOtpAxios = async (email: string) => {
    const response = await axiosInstance.post("/v1/auth/send-otp", {
        email,
    });

    return response.data;
};

// =========================
// Verify OTP
// =========================
export const verifyOtpAxios = async (
    email: string,
    otp: string
) => {
    const response = await axiosInstance.post("/v1/auth/verify-otp", {
        email,
        otp,
    });

    return response.data;
};

// =========================
// Refresh Token
// =========================
export const refreshTokenAxios = async (token: string) => {
    const response = await axiosInstance.post("/v1/auth/refresh", {
        token,
    });

    return response.data;
};

// =========================
// Logout
// =========================
export const logoutAxios = async (token: string) => {
    const response = await axiosInstance.post("/v1/auth/logout", {
        token,
    });

    return response.data;
};

// =========================
// Create Blog
// =========================
export const createBlogAxios = async (payload: {
    titlename: string;
    category: string;
    summary: string;
    article: string;
    imageurl: string[];
}) => {
    const response = await axiosInstance.post("/v1/blogs/create", payload);

    return response.data;
};

// =========================
// Get All Blogs
// =========================
export const getAllBlogsAxios = async (payload?: any) => {
    const response = await axiosInstance.post(
        "/v1/blogs/get-all",
        payload ?? {}
    );

    return response.data;
};

// =========================
// Get Blog By ID
// =========================
export const getBlogByIdAxios = async (id: number) => {
    const response = await axiosInstance.post(
        `/v1/blogs/get-by-id/${id}`
    );

    return response.data;
};

// =========================
// Update Blog
// =========================
export const updateBlogAxios = async (payload: {
    id: number;
    titlename?: string;
    category?: string;
    summary?: string;
    article?: string;
    imageurl?: string[];
}) => {
    const response = await axiosInstance.post(
        "/v1/blogs/update",
        payload
    );

    return response.data;
};

// =========================
// Delete Blog
// =========================
export const deleteBlogAxios = async (id: number) => {
    const response = await axiosInstance.post(
        `/v1/blogs/delete/${id}`
    );

    return response.data;
};