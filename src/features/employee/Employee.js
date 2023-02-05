import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {selectEmployee,fetchEmployeesEnd,handleDeleteEmployee
} from './employeeSlice';
import {fetchEmployees,deleteEmployee} from './employeeAPI';
import Navbar from '../../components/Navbar';
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Button,Container,Box} from '@mui/material';

export function Employee() {
  const {loading,error,employees} = useSelector(selectEmployee);
  const dispatch = useDispatch();
  useEffect( () => {
    fetchEmployees().then((response) => {
        dispatch(fetchEmployeesEnd(response))
    })
  },[dispatch]);

  const handleDelete = async (email,e) => {
    e.target.innerText = "Deleting";
    let response = await deleteEmployee(email);
    if(response.success){
        dispatch(handleDeleteEmployee(email));
    }else{
        return;
    }
  }

  return (
    <div>
        <Navbar />
        <Container>
        {
            loading && <p>We are loading</p>
        }
        {
            !loading && error  && <p>An error occurred {error}</p>
        }
        {
            !loading && !error && employees && (
                <Box sx={{m:2}}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell><b>First Name</b></TableCell>
                                <TableCell align="right"><b>Last Name</b></TableCell>
                                <TableCell align="right"><b>Email</b></TableCell>
                                <TableCell align="right"><b>Employee Number</b></TableCell>
                                <TableCell align="right"><b>Salary (KES)</b></TableCell>
                                <TableCell align="right"><b>Actions</b></TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {employees.map((row,i) => (
                                <TableRow
                                key={i}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell component="th" scope="row">
                                    {row.firstName}
                                </TableCell>
                                <TableCell align="right">{row.lastName}</TableCell>
                                <TableCell align="right">{row.email}</TableCell>
                                <TableCell align="right">{row.employmentNumber}</TableCell>
                                <TableCell align="right">{parseInt(row.salary).toLocaleString()}</TableCell>
                                <TableCell align="right">
                                        <Button onClick={ () => window.location = `/view_employee/${row.email}`}>View More</Button> &nbsp;
                                        <Button variant="outlined" color="success" onClick={ () => window.location = `/update_employee/${row.email}`} >Update</Button> &nbsp;
                                        <Button variant="outlined" color="error" onClick={(e) => handleDelete(row.email,e)}>Delete</Button>
                                </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            )
        }
        </Container>
    </div>
  );
}
