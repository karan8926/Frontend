import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  function logout(e) {
    e.preventDefault();
    navigate("/signin");
  }
  return (
    <div className="w-full h-[6rem]  bg-white p-6 shadow-slate-800 shadow-2xl flex justify-between">
      <div className="p-2 ">
        <h3 className=" w-full p-2 rounded-xl text-center bg-yellow-400 text-yellow-700 font-bold text-lg">
          userName
        </h3>
      </div>
      <div className="flex w-[20%]">
        <button
          onClick={logout}
          className=" w-[50%] rounded-lg bg-red-400 text-red-700 font-bold text-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
