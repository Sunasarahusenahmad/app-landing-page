export class ApiError extends Error {
    status: number;
    data: any;

    constructor(message: string, status: number, data?: any) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.data = data;
    }
}

export const handleError = async (response: Response) => {
    const contentType = response.headers.get("content-type");

    let errorMessage = `HTTP Error ${response.status}: ${response.statusText}`;
    let errorData = null;

    try {
        if (contentType && contentType.includes("application/json")) {
            errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
        } else {
            const text = await response.text();
            // Only include text if it's short, otherwise generic error
            if (text.length < 200) {
                errorMessage = text;
            } else {
                console.error("Non-JSON Error Response:", text); // Log full HTML for debug
                errorMessage = "An unexpected server error occurred.";
            }
        }
    } catch (e) {
        // Failed to parse error body
        console.error("Failed to parse error response", e);
    }

    throw new ApiError(errorMessage, response.status, errorData);
};
