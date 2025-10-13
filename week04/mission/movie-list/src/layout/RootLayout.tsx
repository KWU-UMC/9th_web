import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"

const rootLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default rootLayout
