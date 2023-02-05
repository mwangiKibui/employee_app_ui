import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import App from './App';
import AddEmployee from './features/employee/AddEmployee';
import UpdateEmployee from './features/employee/UpdateEmployee';
import ViewEmployee from './features/employee/ViewEmployee';
import reportWebVitals from './reportWebVitals';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path:'/add_employee',
    element:<AddEmployee />
  },
  {
    path:'/view_employee/:email',
    element:<ViewEmployee />
  },
  {
    path:'/update_employee/:email',
    element:<UpdateEmployee />
  }
]);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
