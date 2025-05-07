import { Outlet } from 'react-router-dom'
import SidebarAdmin from './SidebarAdmin'
const Adminapp = () => {
  return (
    <div className='flex size-full overflow-hidden'>
        <SidebarAdmin/>
    <Outlet/>
    </div>
  )
}

export default Adminapp
