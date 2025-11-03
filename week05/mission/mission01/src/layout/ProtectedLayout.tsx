import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/navbar";

const ProtectedLayout = () => {

    const {accessToken}=useAuth();

    if(!accessToken)
    {
        return <Navigate to={"/login"}replace/>;
    }
    return (
        <>
            <Navbar />
            <Outlet/>
        </>
    )
}

export default ProtectedLayout;