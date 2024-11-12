import { axiosInstance } from "../../axiosInstance";

export const fetchUpadteProduct=async( companyInfo)=>{
    try {
        const response = await axiosInstance.post('/company/profile', companyInfo, {
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
 
