import { axiosInstance } from "../../../axiosInstance";

export const fetchProducts=async()=>{
    try {
        const result = await axiosInstance.get('/company/all_product');
        if (result) {
            console.log('Fetched products:', result);
            return result.data.data.product;
        } else {
            console.error('No data returned');
            return null; 
        }
    } catch (error) {
        console.error('Error fetching products:', error);
        return null; 
    }
}