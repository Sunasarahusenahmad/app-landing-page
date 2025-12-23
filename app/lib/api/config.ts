export const API_CONFIG = {
    // Use the proxy path if configured, otherwise fallback (though proxy is recommended)
    BASE_URL: process.env.NEXT_PUBLIC_APP_URL || '/api',
    TIMEOUT: 15000,
    HEADERS: {
        'Content-Type': 'application/json',
    },
};
