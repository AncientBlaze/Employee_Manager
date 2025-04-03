import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LogInPage from './Components/LogInPage.jsx';
import AddEmployee from './Components/AddEmployee.jsx';
import Employee from './Components/Employee.jsx';
import EmployeeDetails from './Components/EmployeeDetails.jsx';
import Dashboard from './Components/Dashboard.jsx';
import Tasks from './Components/Tasks.jsx';
import Employees from './Components/Employees.jsx';
import Settings from './Components/Settings.jsx';
import ErrorPage from './ErrorPage.jsx';
import RegisterPage from './Components/RegisterPage.jsx';
import AboutUsPage from './Components/AboutUsPage.jsx';
import ContactUsPage from './Components/ContactUsPage.jsx';

const route = createBrowserRouter([
  {
    path: '*',
    element: <ErrorPage />,
  },
  {
    path: '/',
    element: <LogInPage />
  },
  {
    path: '/register',
    element: <RegisterPage />
  },
  {
    path: '/about',
    element: <AboutUsPage />
  },
  {
    path: '/contact',
    element: <ContactUsPage />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    path: '/tasks',
    element: <Tasks />
  },
  {
    path: '/employees',
    element: <Employees />
  },
  {
    path: '/settings',
    element: <Settings />
  },
  {
    path: '/addEmployee',
    element: <AddEmployee />
  },
  {
    path: '/employee/:id',
    element: <Employee />
  },
  {
    path: '/employeeDetails/:id',
    element: <EmployeeDetails />
  }
]);

function App() {
  return (
    <RouterProvider router={route} />
  );
}

export default App;