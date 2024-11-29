import React, { useState } from "react";
import header from "../assets/header.jpg";
const CardForAppointment = (props) => {
  const { name, email, date } = props;
  console.log(props, "props");
  return (
    <div className="w-[22rem] border-1 border-gray-400 p-4 shadow-lg bg-gray-100">
      <div className="w-full h-[50%]">
        <img src={header} alt="" className="w-full h-full" />
      </div>
      <div className="space-y-4 h-[30%] p-2">
        <h2 className="text-start font-bold text-xl">{name}</h2>
        <h3 className="text-start font-medium text-xl">{email}</h3>
        <h3 className="text-start font-medium text-xl">{date}</h3>
      </div>
      <div className=" bg-blue-700 rounded-md  p-4 mt-2 cursor-pointer">
        <button className="text-white font-bold">Book Appointment</button>
      </div>
    </div>
  );
};

export default CardForAppointment;
