import { API_CONFIG } from './config';
import { handleError } from './errorUtil';

interface RequestOptions extends RequestInit {
    params?: Record<string, string>;
}

const getHeaders = () => {
    // Basic headers - we don't force Content-Type here anymore, let request method handle it
    const headers = new Headers();
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

    post: <T>(endpoint: string, body: any, options: RequestOptions = {}) => {
        const isFormData = body instanceof FormData || body instanceof URLSearchParams;
        const headers = options.headers ? new Headers(options.headers) : new Headers();

        // If content-type is explicitly set, use it (or don't set default JSON)
        if (!headers.has('Content-Type') && !isFormData) {
            headers.set('Content-Type', 'application/json');
        }

        return request<T>(endpoint, {
            ...options,
            method: 'POST',
            body: isFormData ? body : JSON.stringify(body),
            headers: Object.fromEntries(headers.entries()) // Convert back to plain object for fetch
        });
    },

    put: <T>(endpoint: string, body: any, options: RequestOptions = {}) => {
        const isFormData = body instanceof FormData || body instanceof URLSearchParams;
        const headers = options.headers ? new Headers(options.headers) : new Headers();

        if (!headers.has('Content-Type') && !isFormData) {
            headers.set('Content-Type', 'application/json');
        }

        return request<T>(endpoint, {
            ...options,
            method: 'PUT',
            body: isFormData ? body : JSON.stringify(body),
            headers: Object.fromEntries(headers.entries())
        });
    },

    patch: <T>(endpoint: string, body: any, options: RequestOptions = {}) => {
        const isFormData = body instanceof FormData || body instanceof URLSearchParams;
        const headers = options.headers ? new Headers(options.headers) : new Headers();

        if (!headers.has('Content-Type') && !isFormData) {
            headers.set('Content-Type', 'application/json');
        }

        return request<T>(endpoint, {
            ...options,
            method: 'PATCH',
            body: isFormData ? body : JSON.stringify(body),
            headers: Object.fromEntries(headers.entries())
        });
    },

    delete: <T>(endpoint: string, options?: RequestOptions) =>
        request<T>(endpoint, { ...options, method: 'DELETE' }),

    // Helper to construct full URL for images etc
    getFileUrl: (path: string) => {
        if (!path) return '';
        if (path.startsWith('http')) return path;
        return `${API_CONFIG.BASE_URL}/${path.startsWith('/') ? path.slice(1) : path}`;
    }
};
