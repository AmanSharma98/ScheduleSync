// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import {
//   createBrowserRouter,
//   createRoutesFromElements,
//   Route,
//   RouterProvider,
// } from 'react-router-dom'
// import Dashboard from './user/components/Dashboard.jsx'
// import Calendar from './User/components/Calendar.jsx'
// import ApplyLeave from './User/components/ApplyLeave.jsx'
// import Admindashboard from './Admin/components/Admindashboard.jsx'
// import Login from './Shared/Login.jsx'
// import Adminapp from './Admin/components/Adminapp.jsx'
// import ProtectedRoute from './Shared/ProtectedRoute.jsx'
// import AddAdjustment from './Admin/components/AddAdjustment';
// import AdminLeaveRequests from './Admin/components/AdminLeaveRequests.jsx'

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <>
//     <Route path="/login" element={<Login />} />

//     {/* USER ROUTES */}
//     <Route
//       path="/"
//       element={
//         <ProtectedRoute role="user">
//           <App />
//         </ProtectedRoute>
//       }
//     >
//       <Route index element={<Dashboard />} />
//       <Route path="dashboard" element={<Dashboard />} />
//       <Route path="calendar" element={<Calendar />} />
//       <Route path="apply-leave" element={<ApplyLeave />} />
//     </Route>

//     {/* ADMIN ROUTES */}
//     <Route
//       path="/admin/"
//       element={
//         <ProtectedRoute role="admin">
//           <Adminapp />
//         </ProtectedRoute>
//       }
//     >
//       <Route index element={<Admindashboard />} />
//       <Route path="dashboard" element={<Admindashboard />} /> {/* Fixed path */}
//       <Route path="/admin/add-adjustment" element={<AddAdjustment />} /> 
//       <Route path="/admin/applyleave" element={<AdminLeaveRequests/>} />
//     </Route>
//   </>
//   )
// )

// createRoot(document.getElementById('root')).render(
//   <RouterProvider router={router} />
// )



import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import Dashboard from './user/components/Dashboard.jsx';
import Calendar from './user/components/Calendar.jsx';
 import ApplyLeave from './User/components/ApplyLeave.jsx'

import Admindashboard from './Admin/components/Admindashboard.jsx';
import AdminLeaveRequests from './Admin/components/AdminLeaveRequests.jsx';
import AddAdjustment from './Admin/components/AddAdjustment.jsx';

import Login from './Shared/Login.jsx';
import Adminapp from './Admin/components/Adminapp.jsx';
import ProtectedRoute from './Shared/ProtectedRoute.jsx';
import AdminCalendar from './Admin/components/AdminCalendar.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* LOGIN */}
      <Route path="/login" element={<Login />} />

      {/* USER ROUTES */}
      <Route
        path="/"
        element={
          <ProtectedRoute role="user">
            <App />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="apply-leave" element={<ApplyLeave />} />
      </Route>

      {/* ADMIN ROUTES */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <Adminapp />
          </ProtectedRoute>
        }
      >
        <Route index element={<Admindashboard />} />
        <Route path="dashboard" element={<Admindashboard />} />
        <Route path="add-adjustment" element={<AddAdjustment />} />
        <Route path="applyleave" element={<AdminLeaveRequests />} />
        <Route path="calendar" element={<AdminCalendar />} />
      </Route>
    </>
  )
);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
