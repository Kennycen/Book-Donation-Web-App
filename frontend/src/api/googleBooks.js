import { googleBooksClient } from "./axiosInstance";

export const googleBooksService = {
    searchByISBN: async (isbn) => {
        const response = await googleBooksClient.get("/volumes", {
            params: { q: `isbn:${isbn}`},
        })
        return response.data
    }
}