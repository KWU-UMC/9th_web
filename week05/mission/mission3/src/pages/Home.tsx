import { useEffect } from "react";
import { getUser } from "../apis/auth";

// src/pages/home.tsx
const HomePage = () => {
  useEffect(() => {
    const getUserData = async () => {
      const reponse = getUser();
      console.log(reponse);
    };
    getUserData();
  }, []);
  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-4xl text-white">Home Page!</h1>
    </div>
  );
};

export default HomePage;
