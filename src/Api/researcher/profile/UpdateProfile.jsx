import { axiosInstance } from '../../axiosInstance';

export const UpdateProfile=async(researcherInfo)=> {
    try {
        const response = await axiosInstance.post('/researcher/profile', researcherInfo, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          console.log(response.data)
          return response.data
        } catch (error) {
          console.error('Error:', error);
    
        }
}
