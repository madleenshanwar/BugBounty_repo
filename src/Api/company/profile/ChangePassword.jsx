import { axiosInstance } from "../../axiosInstance";
import axios from "axios"
// import { axiosInstance } from "../../axiosInstance";
const BASE_URL = 'https://api.bug-bounty.darrebni.net/api';
export const fetchPassword=async( login)=>{
    try {
        const response =await axios.post(`${BASE_URL}/company/changePassword`, login, {
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
