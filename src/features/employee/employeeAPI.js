// A mock function to mimic making an async request for data
import axios from 'axios';

export async function fetchEmployees() {
    try{
        let employees = await axios.get("http://localhost:4000/api/employees");
        return employees.data.data;
    }catch(error){
        return [];
    }
    
}

export async function addEmployee(data){
    let response = await axios.post('http://localhost:4000/api/save_employee',data,{
        headers:{
            "Content-Type":"application/json"
        }
    });
    return response.data;
}

export async function updateEmployee(email,data){
    let response = await axios.put(`http://localhost:4000/api/update_employee?email=${email}`,data,{
        headers:{
            "Content-Type":"application/json"
        }
    });
    return response.data;
}

export async function getEmployeeByEmail(email){
    let response = await axios.get(`http://localhost:4000/api/get_employee_by_email?email=${email}`);
    return response.data;
}

export async function deleteEmployee(email){
    let response = await axios.delete(`http://localhost:4000/api/delete_employee?email=${email}`,{
        headers:{
            "Content-Type":"application/json"
        }
    });
    return response.data;
}