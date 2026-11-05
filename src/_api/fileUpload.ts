import axiosInstance from "../../axios/axiosInstance";

export type FileUploadModule =
    | "blogs"
    | "resumes"
    | "suppliers"
    | "documents";

export interface UploadedFileResponse {
    fileName: string;
    originalName: string;
    fileURL: string;
    relativePath: string;
    mimetype: string;
    size: number;
}

export interface FileUploadResponse {
    success: boolean;
    message: string;
    data: UploadedFileResponse;
}

export interface MultipleFileUploadResponse {
    success: boolean;
    message: string;
    data: UploadedFileResponse[];
}

// 3. Resolve / Normalize File URL to match current API baseURL
export const resolveFileUrl = (
    fileURL: string,
    relativePath?: string
): string => {
    if (!fileURL && !relativePath) return "";

    // Data URLs or blobs should be used directly
    if (fileURL && (fileURL.startsWith("data:") || fileURL.startsWith("blob:"))) {
        return fileURL;
    }

    const envBase =
        (typeof import.meta !== "undefined" && (import.meta as any).env?.VITE_API_URL) ||
        (typeof import.meta !== "undefined" && (import.meta as any).env?.NEXT_PUBLIC_API_URL) ||
        "";
    const baseURL = (axiosInstance.defaults.baseURL || envBase || "").replace(/\/+$/, "");

    // If relativePath is available, use baseURL + relativePath
    if (relativePath && baseURL) {
        const cleanPath = relativePath.startsWith("/")
            ? relativePath
            : `/${relativePath}`;
        return `${baseURL}${cleanPath}`;
    }

    if (!fileURL) return "";

    // If it's a relative path starting with /
    if (fileURL.startsWith("/")) {
        return baseURL ? `${baseURL}${fileURL}` : fileURL;
    }

    // If it's just a filename (e.g. blogs-12345.jpg)
    if (!fileURL.includes("/") && !fileURL.startsWith("http")) {
        return baseURL ? `${baseURL}/uploads/blogs/${fileURL}` : fileURL;
    }

    // If it's an absolute HTTP/HTTPS URL
    if (fileURL.startsWith("http://") || fileURL.startsWith("https://")) {
        try {
            const parsedUrl = new URL(fileURL);
            // If the host in fileURL is localhost or 127.0.0.1, but baseURL points elsewhere
            if (
                baseURL &&
                (parsedUrl.hostname === "localhost" || parsedUrl.hostname === "127.0.0.1")
            ) {
                const parsedBase = new URL(baseURL);
                if (parsedBase.host !== parsedUrl.host) {
                    return `${baseURL}${parsedUrl.pathname}${parsedUrl.search}`;
                }
            }
        } catch {
            // Keep original if URL parsing fails
        }
    }

    return fileURL;
};

// 1. Single File Upload
export const uploadFileAxios = async (
    file: File,
    module: FileUploadModule
): Promise<FileUploadResponse> => {
    try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axiosInstance.post(
            `/v1/files/upload/${module}`,
            formData
        );

        if (response.data?.data) {
            response.data.data.fileURL = resolveFileUrl(
                response.data.data.fileURL,
                response.data.data.relativePath
            );
        }

        return response.data;
    } catch (err: any) {
        const errorMsg =
            err?.response?.data?.message ||
            err?.response?.data?.error ||
            err?.message ||
            "File upload failed";
        throw new Error(errorMsg);
    }
};

// 2. Multiple Files Upload (Maximum 10 files)
export const uploadMultipleFilesAxios = async (
    files: File[],
    module: FileUploadModule
): Promise<MultipleFileUploadResponse> => {
    try {
        const formData = new FormData();

        files.forEach((file) => {
            formData.append("files", file);
        });

        const response = await axiosInstance.post(
            `/v1/files/upload-multiple/${module}`,
            formData
        );

        if (Array.isArray(response.data?.data)) {
            response.data.data.forEach((item: any) => {
                if (item) {
                    item.fileURL = resolveFileUrl(item.fileURL, item.relativePath);
                }
            });
        }

        return response.data;
    } catch (err: any) {
        const errorMsg =
            err?.response?.data?.message ||
            err?.response?.data?.error ||
            err?.message ||
            "Multiple file upload failed";
        throw new Error(errorMsg);
    }
};

// 3. Get File URL for Viewing / Downloading
export const getFileUrl = (
    module: FileUploadModule,
    filename: string,
    download: boolean = false
): string => {
    const baseURL = axiosInstance.defaults.baseURL || "";

    const url = `${baseURL}/v1/files/${module}/${encodeURIComponent(filename)}`;

    return download ? `${url}?download=true` : url;
};