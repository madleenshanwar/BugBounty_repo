import { axiosInstance } from "../../axiosInstance";


export const fetchCompanyProfile=async(index)=>{
    try {
        const result = await axiosInstance.get(`/researcher/company/${index}`);
        if (result) {
            console.log('Fetched Company Profile:',result.data.data
            );
            return result.data.data["company-data"];
        } else {
            console.error('No data returned');
            return null; 
        }
    } catch (error) {
        console.error('Error fetching Company Profile:', error);
        return null; 
    }
}