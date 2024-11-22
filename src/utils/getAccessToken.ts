export const getAccessToken = (key: string): string | null => {
    try {
        const token = localStorage.getItem(key);
        console.log('Retrieved Token:', token);
        return token;
    } catch (error) {
        console.error('Error retrieving token:', error);
        return null;
    }
};
