import { Outlet } from 'react-router-dom'
import Nav from '../components/Nav'
import Side from '../components/Side'
import { useState } from 'react'
import CreateLpModal from '../components/CreateLpModal'
import WithdrawalModal from '../components/WithdrawalModal'

const RootLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenCreateLp, setIsOpenCreateLp] = useState(false);
  const [isOpenWithdrawal, setIsOpenWithdrawal] = useState(false);

  const toggleSidebar = () => setIsOpen((prev) => !prev);
  const closeSidebar = () => setIsOpen(false);

  const handleFloatingBtn = () => {
    setIsOpenCreateLp((prev) => !prev);
  };

  return (
    <div className='flex flex-col h-dvh relative'>
      <Nav onMenuClick={toggleSidebar} />
      <div className='flex flex-1 bg-black mt-13 relative'>
        <aside className='hidden lg:block'>
          <Side 
            onOpenWithdrawal={setIsOpenWithdrawal}
          />
        </aside>
        <main className='p-6 w-full h-full relative'>
          <Outlet />
          {isOpenCreateLp &&
            <CreateLpModal 
              onCloseCreateLp={setIsOpenCreateLp}
            />
          }
        </main>
      </div>
      <button
        onClick={handleFloatingBtn}
        className='fixed bottom-6 right-6 bg-pink-500 text-white rounded-full w-14 h-14 text-4xl flex justify-center items-center hover:bg-pink-400 hover:scale-90 z-20'
      >
        +
      </button>
      
      {isOpenWithdrawal && 
        <WithdrawalModal 
          onCloseWithdrawal={setIsOpenWithdrawal}
        />
      }

      <div
        className={`fixed inset-0 z-30 mt-13 ${isOpen ? "block": "hidden"} lg:hidden`}
        onClick={closeSidebar}
      >
        <div className='absolute inset-0 bg-black/50'/>
        <div
          className='absolute left-0 top-0 w-[200px] h-full bg-gray-900'
          onClick={(e) => e.stopPropagation()}
        >
          <Side 
            onOpenWithdrawal={setIsOpenWithdrawal}
          />
        </div>
      </div>
    </div>
  )
}

export default RootLayout