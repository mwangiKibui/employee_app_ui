import React,{useState,useEffect,} from 'react';
import Navbar from '../../components/Navbar';
import {Container,Box,Alert,TextField,Button} from '@mui/material';
import {useParams} from 'react-router-dom';
import {getEmployeeByEmail,updateEmployee} from './employeeAPI';

export default function UpdateEmployee() {
  const {email} = useParams();

  useEffect( () => {
    setLoading(true);
    // get the employee with the email
    getEmployeeByEmail(email).then(response => {
      if(response.success){ 
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setLoading(false);
      }else{
        setFormError("No employee exists with that email");
        setLoading(false);
      }
    })
  },[email]);

  const [firstName,setFirstName] = useState();
  const [lastName,setLastName] = useState();
  const [formError,setFormError] = useState('');
  const [message,setMessage] = useState('');
  const [loading,setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(firstName && lastName){
      let response = await updateEmployee(email,{
        firstName,
        lastName
      });
      if(response.success){
        setMessage("Employee Updated Successfully");
        return;
      }else{
        setFormError(response.message);
        return;
      }
    }else{
      setFormError("First Name and Last Name are required");
      return;
    }
  }

  return (
    <div>
      <Navbar />
      <Container>
        <Box sx={{m:2}}>
          {
            loading && <p>Loading</p>
          }
          {
            !loading && (
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
                            // placeholder="Employee First Name"
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                        />

                        <TextField
                            required
                            id="lastName"
                            label="Last Name"
                            // placeholder="Employee Last Name"
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                        />
                    </div>
                </Box>
                <Box sx={{m:1}}>
                <Button type="submit" variant="outlined">Submit</Button>
                </Box>
                    
        </form>
            ) 
          }
        
        </Box>
      </Container>
    </div>
  )
}
