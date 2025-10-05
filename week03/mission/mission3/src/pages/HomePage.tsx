import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";

const HomePage = () =>{
    return(
        <>
        <Navbar/>
        영화 페이지
        <Outlet/>   
        </>
    )
}
export default HomePage;