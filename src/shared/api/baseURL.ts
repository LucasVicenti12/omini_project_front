/**
 * This function returns the base url of backend
 * @returns {string | null}
 */
export const baseURL = () => {
    if (process.env.NODE_ENV === "production") {
        return null;
    } else {
        return "http://localhost:9000/";
    }
};
