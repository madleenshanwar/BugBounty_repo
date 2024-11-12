import axios from "axios"
const BASE_URL = 'https://api.bug-bounty.darrebni.net/api';
export const RegisterResearcher=async(ReasearcherInfo)=>{
    console.log(BASE_URL)
    try{
        const response=await axios.post(`${BASE_URL}/researcher/register`,ReasearcherInfo);
        console.log(response,'...........')
        return response.data
    }
    catch(error){
        console.log('error',error);
    }
}