// A mock function to mimic making an async request for data
import axios from 'axios';

export async function fetchEmployees() {
    try{
        let employees = await axios.get("https://employeeappbackend-production.up.railway.app/api/employees");
        return employees.data.data;
    }catch(error){
        return [];
    }
    
}

export async function addEmployee(data){
    let response = await axios.post('https://employeeappbackend-production.up.railway.app',data,{
        headers:{
            "Content-Type":"application/json"
        }
    });
    return response.data;
}

export async function updateEmployee(email,data){
    let response = await axios.put(`https://employeeappbackend-production.up.railway.app?email=${email}`,data,{
        headers:{
            "Content-Type":"application/json"
        }
    });
    return response.data;
}

export async function getEmployeeByEmail(email){
    let response = await axios.get(`https://employeeappbackend-production.up.railway.app?email=${email}`);
    return response.data;
}

export async function deleteEmployee(email){
    let response = await axios.delete(`https://employeeappbackend-production.up.railway.app?email=${email}`,{
        headers:{
            "Content-Type":"application/json"
        }
    });
    return response.data;
}