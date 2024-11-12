import { axiosInstance } from "../../../axiosInstance";

export const fetchDeleteProduct=async( uuid)=>{
    try {
        const response = await axiosInstance.post('/company/delete_product', {
            uuid: uuid
          }
          );
          console.log(response.data)
          return response.data
        } catch (error) {
          console.error('Error:', error);
    
        }
  }
 
