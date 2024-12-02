import React, { useState } from "react";
import header from "../assets/header.jpg";
import { baseUrl } from "../App";
import axios from "axios";
import { IoMdArrowRoundForward } from "react-icons/io";
const CardForAppointment = (props) => {
  const { therapistsId, name, date, time, userEmail, patientNumber } = props;
  console.log(props, "props45555555555555555555555555555555555");
  const formattedDate = new Date(date).toISOString().split("T")[0];

  const handleBookAppointment = async () => {
    try {
      const requestBody = {
        therapistsId,
        date: formattedDate,
        time,
        patientEmail: userEmail,
        patientNumber: patientNumber,
      };
      console.log(requestBody, "request body");
      const response = await axios.post(
        `${baseUrl}api/book-appointment`,
        requestBody
      );

      if (response.status === 200) {
        alert("Appointment booked successfully!");
      } else {
        alert("Failed to book the appointment.");
      }
    } catch (error) {
      console.error("Error booking the appointment:", error);
      alert("An error occurred while booking the appointment.");
    }
  };

  return (
    <div className="w-[26rem] border-1 border-gray-400 p-4 shadow-lg bg-gray-100">
      <div className="w-full h-[50%]">
        <img src={header} alt="" className="w-full h-full" />
      </div>
      <div className="space-y-4 h-[30%] p-2">
        <h2 className="text-start font-bold text-xl">{name}</h2>
        <h3 className="text-start font-medium text-xl">{userEmail}</h3>
        <h3 className="text-start font-medium text-xl">{date}</h3>
        <h3 className="text-start font-medium text-xl">{time}</h3>
      </div>
      <div
        onClick={handleBookAppointment}
        className=" bg-blue-700 rounded-md  p-4 mt-2 cursor-pointer flex justify-between hover:bg-blue-600"
      >
        <button className="text-white font-bold">Book Appointment</button>
        <IoMdArrowRoundForward className="w-8 h-8 text-2xl text-white cursor-pointer" />
      </div>
    </div>
  );
};

export default CardForAppointment;
