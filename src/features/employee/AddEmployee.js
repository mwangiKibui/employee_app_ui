import React,{useState} from 'react';
import {Container,Box,TextField,Button,Alert} from '@mui/material';
import Navbar from '../../components/Navbar';
import {addEmployee} from './employeeAPI';

export default function AddEmployee() {

  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const [email,setEmail] = useState("");
  const [employmentNumber,setEmploymentNumber] = useState("");
  const [salary,setSalary] = useState("");
  const [message,setMessage] = useState("");
  const [formError,setFormError] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    if(firstName && lastName && email && employmentNumber && salary){
        let response = await addEmployee({
            firstName,
            lastName,
            email,
            employmentNumber,
            salary
        });
        if(response.success){
            setMessage("Employee Added Successfully");
            setFirstName('');
            setLastName('');
            setEmail('');
            setEmploymentNumber('');
            setSalary('');
            setFormError('');
        }else{
            setFormError(response.message)
        }
    }else{
        setFormError("All fields are required");
        return;
    }
  }

  return (
    <div>
        <Navbar />
        <Container>
            <Box sx={{m:2}}>
                <form onSubmit={handleSubmit}>
                <Box
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '100ch' },
                    }}
                >
                    <div>
                        {
                            formError && <Alert severity="error">{formError}</Alert>
                        }
                        {
                            message && <Alert severity='success'>{message}</Alert>
                        }
                        <TextField
                            required
                            id="firstName"
                            label="First Name"
                            placeholder="Employee First Name"
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                        />

                        <TextField
                            required
                            id="lastName"
                            label="Last Name"
                            placeholder="Employee Last Name"
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                        />

                        <TextField
                            required
                            id="email"
                            label="Email"
                            placeholder="Employee Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />

                        <TextField
                            required
                            id="employmentNumber"
                            label="Employment Number"
                            placeholder="Employee Employment Number"
                            value={employmentNumber}
                            onChange={e => setEmploymentNumber(e.target.value)}
                        />

                        <TextField
                            required
                            id="salary"
                            label="Salary (KES)"
                            placeholder="Employee Salary"
                            value={salary}
                            onChange={e => setSalary(e.target.value)}
                        />

                        

                    </div>
                </Box>
                <Box sx={{m:1}}>
                <Button type="submit" variant="outlined">Submit</Button>
                </Box>
                    
                </form>
            </Box>
        </Container>
    </div>
  )
}
