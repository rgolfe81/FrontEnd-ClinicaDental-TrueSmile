import axios from 'axios';

// const root = "http://localhost:3000"
const root = "https://clinica-truesmile-production-b948.up.railway.app"

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

export const addMeAppointment = async (body, token) => {
  let config = {
    headers: { 
      'Authorization': 'Bearer '+ token,  
    }
  };
  return await axios.post(`${root}/appointment/create`, body, config);
}

export const bringPatientAppointments = async (token) => {
  let config = {
    headers: { 
      'Authorization': 'Bearer '+ token,  
    }
  };
  return await axios.get(`${root}/appointment/viewPatient`, config);
}
export const bringDoctorAppointments = async (token) => {
  let config = {
    headers: { 
      'Authorization': 'Bearer '+ token,  
    }
  };
  return await axios.get(`${root}/appointment/viewDoctor`, config);
}

export const deleteAppointment = async (id, token) => {
  let config = {
    headers: { 
      'Authorization': 'Bearer '+ token,  
    }
  };
  return await axios.delete(`${root}/appointment/delete/${id}`, config);
}

export const bringAllUsers = async (token) => {
  let config = {
    headers: { 
      'Authorization': 'Bearer '+ token,  
    }
  };
  return await axios.get(`${root}/user/allUsers`, config);
}

export const bringAllAppointments = async (token) => {
  let config = {
    headers: { 
      'Authorization': 'Bearer '+ token,  
    }
  };
  return await axios.get(`${root}/appointment/viewAll`, config);
}