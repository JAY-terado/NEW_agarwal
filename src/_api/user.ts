import axiosInstance from "../../axios/axiosInstance";

// =========================
// Request Callback
// =========================
export interface RequestCallbackPayload {
    fullName: string;
    email: string;
    mobileNumber: string;
}

export const requestCallbackAxios = async (
    payload: RequestCallbackPayload
) => {
    const response = await axiosInstance.post(
        "/v1/leads/request-callback",
        payload
    );

    return response.data;
};

// =========================
// Brochure Download Request
// =========================
export interface DownloadBrochurePayload {
    fullName: string;
    email: string;
    mobileNumber: string;
}

export const downloadBrochureAxios = async (
    payload: DownloadBrochurePayload
) => {
    const response = await axiosInstance.post(
        "/v1/leads/download-brochure",
        payload
    );

    return response.data;
};

// =========================
// Customer Registration
// =========================
export interface CustomerRegistrationPayload {
    fullName: string;
    email: string;
    mobileNumber: string;
    occupationCategory: string;
    designation: string;
    organization: string;
    preferredConfiguration: string;
    estimatedBudget: string;
    sourceOfVisit: string;
    referredBy: string;
    houseNo: string;
    buildingOrSocietyName: string;
    locality: string;
    city: string;
    pincode: string;
    state: string;
    country: string;
}

export const customerRegistrationAxios = async (
    payload: CustomerRegistrationPayload
) => {
    const response = await axiosInstance.post(
        "/v1/leads/store",
        payload
    );

    return response.data;
};

// =========================
// Error Extractor Helper
// =========================
export const extractErrorMessage = (err: any, fallback: string = 'Submission failed'): string => {
    if (!err) return fallback;
    const data = err.response?.data;
    if (!data) return err.message || fallback;

    if (typeof data === 'string' && data.trim()) return data;
    if (typeof data.message === 'string' && data.message.trim()) return data.message;
    if (Array.isArray(data.message) && data.message.length > 0) {
        return data.message.join(', ');
    }
    if (typeof data.error === 'string' && data.error.trim()) return data.error;
    if (typeof data.errMsg === 'string' && data.errMsg.trim()) return data.errMsg;

    if (Array.isArray(data.errors) && data.errors.length > 0) {
        return data.errors.map((e: any) => (typeof e === 'string' ? e : e.message || e.msg || JSON.stringify(e))).join(', ');
    }
    if (data.error && typeof data.error === 'object' && typeof data.error.message === 'string') {
        return data.error.message;
    }

    return err.message || fallback;
};

// Backward-compatibility aliases
export const contactEmailAxios = requestCallbackAxios;
export const createLeadAxios = downloadBrochureAxios;