import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  loading:false,
  status: 'idle',
  employees:[],
  error:'',
};

export const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    fetchEmployeesState: async (state, action) => {
      state.loading = true;
    },
    fetchEmployeesEnd: (state,action) => {
      state.loading = false;
      state.employees = action.payload;
    },
    fetchEmployeesError:(state,action) => {
        state.loading = false;
        state.error = action.payload
    },
    addEmployeeStart:async(state,action) => {
        state.loading = true
    },
    addEmployeeEnd:(state,action) => {
        state.loading = false;
        state.error = action.payload;
    },
    deleteEmployee:(state,action) => {
      state.loading = true;
      state.employees = state.employees.filter(employee => employee.email !== action.payload);
      state.loading = false;
    }
  },
});

export const selectEmployee = (state) => state.employee;

export const { fetchEmployeesEnd,fetchEmployeesState,fetchEmployeesError,addEmployeeStart,addEmployeeEnd,setEmployeeByEmail,deleteEmployee } = employeeSlice.actions;



export const handleDeleteEmployee = (email) => (dispatch, getState) => {
    dispatch(deleteEmployee(email));
};


export default employeeSlice.reducer;