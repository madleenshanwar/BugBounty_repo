import axios from "axios";
import { axiosInstance } from "../../axiosInstance";

const BASE_URL = 'https://api.bug-bounty.darrebni.net/api';
export const LogOut=async()=>{
  
    try {
        const response = await axiosInstance.post(`/researcher/researcher/logout`, {}, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
  
        return response.data
  
      } catch (error) {
        // setError('Logout failed. Please check your credentials.');
        console.error('Error:', error);
  
      }
}