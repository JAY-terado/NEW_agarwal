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
export const refreshTokenAxios = async (refreshToken: string) => {
    const response = await axiosInstance.post("/v1/auth/refresh", {
        refreshToken,
    });

    return response.data;
};

// =========================
// Logout
// =========================
export const logoutAxios = async (refreshToken: string) => {
    const response = await axiosInstance.post("/v1/auth/logout", {
        refreshToken,
    });

    return response.data;
};

// =========================
// Create Blog
// =========================
export interface CreateBlogPayload {
    title: string;
    blogCategory: string;
    blogSummary: string;
    blogDescription: string;
    blogImageFileName: string;
    blogImageURL: string;
}

export const createBlogAxios = async (payload: CreateBlogPayload) => {
    const response = await axiosInstance.post(
        "/v1/blogs/create",
        payload
    );

    return response.data;
};

// =========================
// Get All Blogs
// =========================
export interface GetAllBlogsPayload {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
}

let inFlightBlogsPromise: Promise<any> | null = null;

export const getAllBlogsAxios = async (
    payload: GetAllBlogsPayload = {}
) => {
    const isDefault = !payload || Object.keys(payload).length === 0;
    if (isDefault && inFlightBlogsPromise) {
        return inFlightBlogsPromise;
    }

    const fetchPromise = axiosInstance.post(
        "/v1/blogs/list",
        payload
    ).then((res) => res.data);

    if (isDefault) {
        inFlightBlogsPromise = fetchPromise;
        fetchPromise.finally(() => {
            inFlightBlogsPromise = null;
        });
    }

    return fetchPromise;
};

// =========================
// Get Blog By ID
// =========================
export interface GetBlogByIdPayload {
    id: number;
}

export const getBlogByIdAxios = async (id: number) => {
    const response = await axiosInstance.post(
        "/v1/blogs/details",
        { id }
    );

    return response.data;
};

// =========================
// Update Blog
// =========================
export interface UpdateBlogPayload {
    id: number;
    title?: string;
    blogCategory?: string;
    blogSummary?: string;
    blogDescription?: string;
    blogImageFileName?: string;
    blogImageURL?: string;
}

export const updateBlogAxios = async (payload: UpdateBlogPayload) => {
    const response = await axiosInstance.post(
        "/v1/blogs/update",
        payload
    );

    return response.data;
};

// =========================
// Delete Blog
// =========================
export interface DeleteBlogPayload {
    id: number;
}

export const deleteBlogAxios = async (id: number) => {
    const response = await axiosInstance.post(
        "/v1/blogs/delete",
        { id }
    );

    return response.data;
};