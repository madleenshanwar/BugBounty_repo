import { axiosInstance } from "../../../axiosInstance";

export const fetchAddProduct=async( Program)=>{
    try {
        const response = await axiosInstance.post('company/add_product', Program, {
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
 
