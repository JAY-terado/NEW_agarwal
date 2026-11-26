import axiosInstance from "../../axios/axiosInstance";

export interface NewsletterCreator {
    id: number;
    name: string;
    email?: string;
    role?: string;
}

export interface NewsletterItem {
    id: number;
    title: string;
    subtitle: string;
    image: string;
    imageRedirectUrl?: string;
    description: string;
    htmlContent?: string;
    status: number;
    createdBy?: number;
    createdAt: string;
    updatedAt?: string;
    creator?: NewsletterCreator;
}

export interface CreateNewsletterPayload {
    title: string;
    subtitle: string;
    image: string;
    imageRedirectUrl?: string;
    description: string;
    htmlContent?: string;
}

export interface GetNewsletterListPayload {
    page?: number;
    limit?: number;
    search?: string;
    status?: number;
}

export interface UpdateNewsletterPayload {
    id: number;
    title?: string;
    subtitle?: string;
    image?: string;
    imageRedirectUrl?: string;
    description?: string;
    htmlContent?: string;
    status?: number;
}

export interface GetSubscribersListPayload {
    page?: number;
    limit?: number;
    search?: string;
}

// =========================
// Create Newsletter (Admin)
// =========================
export const createNewsletterAxios = async (payload: CreateNewsletterPayload) => {
    const response = await axiosInstance.post("/v1/newsletter/create", payload);
    return response.data;
};

// =========================
// List Newsletters (Public)
// =========================
export const getNewsletterListAxios = async (
    payload: GetNewsletterListPayload = {}
) => {
    const response = await axiosInstance.post("/v1/newsletter/list", payload);
    return response.data;
};

// =========================
// Get Newsletter by ID (Public)
// =========================
export const getNewsletterByIdAxios = async (id: number) => {
    const response = await axiosInstance.post("/v1/newsletter/details", { id });
    return response.data;
};

// =========================
// Update Newsletter (Admin)
// =========================
export const updateNewsletterAxios = async (payload: UpdateNewsletterPayload) => {
    const response = await axiosInstance.post("/v1/newsletter/update", payload);
    return response.data;
};

// =========================
// Delete Newsletter (Admin)
// =========================
export const deleteNewsletterAxios = async (id: number) => {
    const response = await axiosInstance.post("/v1/newsletter/delete", { id });
    return response.data;
};

// =========================
// Subscribe (Public)
// =========================
export const subscribeNewsletterAxios = async (email: string) => {
    const response = await axiosInstance.post("/v1/newsletter/subscribe", { email });
    return response.data;
};

// =========================
// Unsubscribe (Public)
// =========================
export const unsubscribeNewsletterAxios = async (email: string) => {
    const response = await axiosInstance.post("/v1/newsletter/unsubscribe", { email });
    return response.data;
};

// =========================
// List Subscribers (Admin)
// =========================
export const getNewsletterSubscribersAxios = async (
    payload: GetSubscribersListPayload = {}
) => {
    const response = await axiosInstance.post("/v1/newsletter/subscribers/list", payload);
    return response.data;
};

// =========================
// Admin Unsubscribe (Admin)
// =========================
export const adminUnsubscribeNewsletterAxios = async (
    payload: { id?: number; email?: string }
) => {
    const response = await axiosInstance.post("/v1/newsletter/admin/unsubscribe", payload);
    return response.data;
};
