import axios from 'axios';

const root = "http://localhost:3000"

export const logMe = async (body) => {

    return await axios.post(`${root}/auth/login`, body);
} 

export const registerMe = async (body) => {

    return await axios.post(`${root}/auth/register`, body);
}
// export const bringUsers = async (token) => {
//     let config = {
//       headers: { 
//         'Authorization': 'Bearer '+ token,  
//       }
//     };

//     return await axios.get(`${root}/api/users`, config);
// }