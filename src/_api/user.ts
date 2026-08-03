// src/api/user.ts

import axiosInstance from "../../axios/axiosInstance";

// =========================
// Create Lead (PDF)
// =========================
export const createLeadAxios = async (payload: {
    name: string;
    mobile_number: string;
    email: string;
    requirement: string;
    company: string;
}) => {
    const response = await axiosInstance.post("/v1/leads", payload);

    return response.data;
};

// =========================
// Contact Email
// =========================
export const contactEmailAxios = async (payload: {
    name: string;
    email: string;
    mobile_number: string;
}) => {
    const response = await axiosInstance.post(
        "/v1/leads/contact-email",
        payload
    );

    return response.data;
};