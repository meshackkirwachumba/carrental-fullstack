import NavbarOwner from '../../components/owner/NavbarOwner'
import Sidebar from '../../components/owner/Sidebar'
import { Outlet } from 'react-router'
import { useAppContext } from '../../context/AppContext'
import { useEffect } from 'react'

function Layout() {
  const {isOwner, navigateTo} = useAppContext()

  useEffect(()=>{
    if(!isOwner){
      navigateTo('/')
    }
  },[isOwner])
  return (
    <div className='flex flex-col'>
      <NavbarOwner />
      <div className='flex'>
        <Sidebar />
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
