import React,{useEffect,useState} from 'react';
import NavBar from '../../components/Navbar';
import {Container,Box,Card,CardContent,Typography,Alert} from '@mui/material';
import {getEmployeeByEmail} from './employeeAPI';
import {useParams} from 'react-router-dom';

export default function ViewEmployee() {
  const {email} = useParams();

  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const [employeeEmail,setEmail] = useState("");
  const [employmentNumber,setEmploymentNumber] = useState("");
  const [salary,setSalary] = useState("");

  const [error,setError] = useState("");
  const [loading,setLoading] = useState(false);

  useEffect( () => {
    setLoading(true);
    getEmployeeByEmail(email).then((response) =>  {
      setFirstName(response.data.firstName);
      setLastName(response.data.lastName);
      setEmail(response.data.email);
      setEmploymentNumber(response.data.employmentNumber);
      setSalary(response.data.salary);
      setLoading(false);

    }).catch(error => {
      setError("An error occurred, "+error);
      setLoading(false);
    });
  },[email]);
  return (
    <div>
      <NavBar />
      <Container>
        <Box sx={{m:2}}>
          {
            loading  && (
              <p>Loading</p>
            )
          }
          {
            !loading && error && (
              <Alert severity="error">{error}</Alert>
            )
          }
          {
            !loading && (
              <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography variant="h6" component="div">
                  First Name : {firstName}
                </Typography>
                <Typography variant="h6" component="div">
                  Last Name : {lastName}
                </Typography>
                <Typography variant="h6" component="div">
                  Email : {employeeEmail}
                </Typography>
                <Typography variant="h6" component="div">
                  Employment Number : {employmentNumber}
                </Typography>
                <Typography variant="h6" component="div">
                  Salary : KES {parseInt(salary).toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
            )
          }
        </Box>
      </Container>
    </div>
  )
}
