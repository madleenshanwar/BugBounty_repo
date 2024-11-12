import axios from "axios"
// import { axiosInstance } from "../../axiosInstance";
const BASE_URL = 'https://api.bug-bounty.darrebni.net/api';
export const LoginCompany=async(login)=>{
    console.log(login)
    try {
        const response = await axios.post(`${BASE_URL}/company/login`, login, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
  
        return response.data
  
      } catch (error) {
        // setError('Login failed. Please check your credentials.');
        console.error('Error:', error);
  
      }
}