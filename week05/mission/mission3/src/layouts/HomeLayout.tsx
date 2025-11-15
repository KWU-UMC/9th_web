import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar";

const HomeLayout = () =>{
    
    return (
        <div className="h-dvh flex flex-col">
            <Navbar/>
            <main className="flex-1">
                <Outlet/>
            </main>
        </div>
    );
};

export default HomeLayout;