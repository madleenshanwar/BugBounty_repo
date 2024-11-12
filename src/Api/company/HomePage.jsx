import { axiosInstance } from "../axiosInstance";

export const fetchHome=async()=>{
    try {
        const result = await axiosInstance.get('/company/home');
        if (result) {
            console.log('Fetched home:', result);
            return result.data.data.researcher;
        } else {
            console.error('No data returned');
            return null; 
        }
    } catch (error) {
        console.error('Error fetching home:', error);
        return null; 
    }
}