import { axiosInstance } from "../../axiosInstance";

export const fetchHomeResearcher=async()=>{
    try {
        const result = await axiosInstance.get('/researcher/home');
        if (result) {
            console.log('Fetched home:', result);
            return result.data.data.companies;
        } else {
            console.error('No data returned');
            return null; 
        }
    } catch (error) {
        console.error('Error fetching home:', error);
        return null; 
    }
}