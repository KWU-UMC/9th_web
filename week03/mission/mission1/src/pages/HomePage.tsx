import React from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from "../components/NavBar";

const HomePage = (): React.ReactElement => {
    return (
    <div>
        <NavBar></NavBar>
        <Outlet />
    </div>
    );
};

export default HomePage;


//Outlet : 