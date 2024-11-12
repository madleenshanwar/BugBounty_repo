import axios from "axios"
const BASE_URL = 'https://api.bug-bounty.darrebni.net/api';
export const RegisterCompany=async(companyInfo)=>{
    console.log(BASE_URL)
    try{
        const response=await axios.post(`${BASE_URL}/company/register`,companyInfo);
        return response
    }
    catch(error){
        console.log('error',error);
    }
}