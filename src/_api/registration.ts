import axiosInstance from "../../axios/axiosInstance";

// =========================
// Channel Partner Apply
// =========================
export interface ChannelPartnerRegisterPayload {
    fullName: string;
    firmOrCompanyName: string;
    reraRegNo: string;
    mobileNumber: string;
    email: string;
    cityOfOperation: string;
}

export const channelPartnerRegisterAxios = async (
    payload: ChannelPartnerRegisterPayload
) => {
    const response = await axiosInstance.post(
        "/v1/hr/channel-partner/register",
        payload
    );

    return response.data;
};

// =========================
// Supplier Apply
// =========================
export interface SupplierRegisterPayload {
    supplierName: string;
    companyName: string;
    mobileNumber: string;
    email: string;
    address: string;
    website: string;
    serviceCategories: string[];
    yearsOfExperience: string;
    areaOfOperation: string;
    majorClientServed: string;
    companyProfileAttachment: string;
    productCatalogueAttachment: string;
    rateListAttachment: string;
    projectPortfolioAttachment: string;
    relevantLicencesAttachment: string;
    otherSupportingAttachment: string;
}

export const supplierRegisterAxios = async (
    payload: SupplierRegisterPayload
) => {
    const response = await axiosInstance.post(
        "/v1/hr/supplier/register",
        payload
    );

    return response.data;
};

// =========================
// Career Apply
// =========================
export interface CareerApplyPayload {
    appliedForPosition: string;
    fullName: string;
    email: string;
    mobileNumber: string;
    resumeUploadLink: string;
}

export const careerApplyAxios = async (
    payload: CareerApplyPayload
) => {
    const response = await axiosInstance.post(
        "/v1/hr/career/apply",
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