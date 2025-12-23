import { API_CONFIG } from './config';
import { handleError } from './errorUtil';

interface RequestOptions extends RequestInit {
    params?: Record<string, string>;
}

const getHeaders = () => {
    const headers = new Headers(API_CONFIG.HEADERS);
    // Add Auth token if exists
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('adminToken');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
    }
    return headers;
};

const request = async <T>(endpoint: string, options: RequestOptions = {}): Promise<T> => {
    const { params, ...init } = options;

    let url = `${API_CONFIG.BASE_URL}/${endpoint.startsWith('/') ? endpoint.slice(1) : endpoint}`;

    if (params) {
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                searchParams.append(key, value);
            }
        });
        url += `?${searchParams.toString()}`;
    }

    try {
        const response = await fetch(url, {
            ...init,
            headers: {
                ...getHeaders(),
                ...init.headers,
            },
        });

        if (!response.ok) {
            await handleError(response);
        }

        // Handle 204 No Content
        if (response.status === 204) {
            return {} as T;
        }

        // Check if response is JSON
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return await response.json();
        }

        // For non-JSON success? (rare, but handled)
        return {} as T;

    } catch (error) {
        throw error;
    }
};

export const api = {
    get: <T>(endpoint: string, options?: RequestOptions) =>
        request<T>(endpoint, { ...options, method: 'GET' }),

    post: <T>(endpoint: string, body: any, options?: RequestOptions) =>
        request<T>(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) }),

    put: <T>(endpoint: string, body: any, options?: RequestOptions) =>
        request<T>(endpoint, { ...options, method: 'PUT', body: JSON.stringify(body) }),

    patch: <T>(endpoint: string, body: any, options?: RequestOptions) =>
        request<T>(endpoint, { ...options, method: 'PATCH', body: JSON.stringify(body) }),

    delete: <T>(endpoint: string, options?: RequestOptions) =>
        request<T>(endpoint, { ...options, method: 'DELETE' }),

    // Helper to construct full URL for images etc
    getFileUrl: (path: string) => {
        if (!path) return '';
        if (path.startsWith('http')) return path;
        return `${API_CONFIG.BASE_URL}/${path.startsWith('/') ? path.slice(1) : path}`;
    }
};
