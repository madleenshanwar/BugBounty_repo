import { axiosInstance } from '../../axiosInstance';

export const FetchProfile=async()=>{
    try {
        const result = await axiosInstance.get('/researcher/profile');
        if (result) {
            console.log('Fetched profile:', result.data.data.researcher);
            return result.data.data.researcher
            ;
        } else {
            console.error('No data returned');
            return null; 
        }
    } catch (error) {
        console.error('Error fetching home:', error);
        return null; 
    }
}
