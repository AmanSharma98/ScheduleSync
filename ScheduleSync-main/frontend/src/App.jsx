import React from 'react'
import Sidebar from './User/components/Sidebar.jsx';
import { Outlet } from 'react-router'
const App = () => {
  return (
    <div className='flex size-full overflow-hidden'>
    <Sidebar />
    <Outlet/>
    </div>
  )
}

export default App
