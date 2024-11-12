import axios from "axios"
const BASE_URL = 'https://api.bug-bounty.darrebni.net/api';

export const submitCode = async (uuid,code) => {
    try {
        const response = await axios.post(`${BASE_URL}/researcher/register/${uuid}`, {code} );
        return response.data
    } catch (error) {
        console.error('Error submitting code:', error);
        throw error;
    }
};