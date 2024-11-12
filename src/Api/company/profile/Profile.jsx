import { axiosInstance } from "../../axiosInstance";

export const fetchProfile = async () => {
    try {
        const result = await axiosInstance.get('/company/profile');
        if (result) {
            console.log('Fetched profile:', result.data.data.company);
            return result.data.data.company
            ;
        } else {
            console.error('No data returned');
            return null; 
        }
    } catch (error) {
        console.error('Error fetching profile:', error);
        return null;
    }

}
