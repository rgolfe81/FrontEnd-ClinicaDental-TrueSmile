import axios from 'axios';

const root = "http://localhost:3000"
// const root = "https://clinica-truesmile-production-b948.up.railway.app"

export const logMe = async (body) => {

    return await axios.post(`${root}/auth/login`, body);
} 

export const registerMe = async (body) => {

    return await axios.post(`${root}/auth/register`, body);
}
export const bringProfile = async (token) => {
    let config = {
      headers: { 
        'Authorization': 'Bearer '+ token,  
      }
    };

    return await axios.get(`${root}/user/profile`, config);
}