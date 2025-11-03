import { Outlet } from 'react-router-dom'
import Nav from '../components/Nav'

const RootLayout = () => {
  return (
    <div className='flex flex-col h-dvh'>
      <Nav />
      <main className='flex-1 bg-black'>
        <Outlet />
      </main>
    </div>
  )
}

export default RootLayout
