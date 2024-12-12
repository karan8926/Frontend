import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
const Navbar = () => {
  const navigate = useNavigate();
  const userDetails = JSON.parse(sessionStorage.getItem("userDetails"));
  const [userName, setUserName] = useState(null);
  function logout(e) {
    e.preventDefault();
    sessionStorage.clear();
    "patient".match(userDetails.userType)
      ? navigate("/patient/signin")
      : navigate("/signin");
  }
  function handleProfile() {
    navigate(`/${userDetails.userType}/profile/${userDetails.userId}`);
  }
  useEffect(() => {
    setUserName(userDetails.userName);
  }, []);
  return (
    <div className="w-full  h-[6rem]  bg-white p-6 shadow-slate-800 shadow-2xl flex justify-between">
      <div
        className="p-2 flex items-center cursor-pointer "
        onClick={handleProfile}
      >
        <RxAvatar className="size-[4rem] " />

        <h3 className=" w-full p-2 rounded-xl text-center  text-gray-600 font-extrabold text-2xl">
          <span>Hi,</span>
          {userName}
        </h3>
      </div>
      <div className="flex w-full justify-end ">
        <button
          onClick={logout}
          className=" w-[10%] rounded-lg bg-red-400 text-white font-bold text-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
