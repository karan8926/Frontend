import React, { useState } from "react";
import header from "../assets/header.jpg";
import { baseUrl } from "../App";
import axios from "axios";

const CardForAppointment = (props) => {
  const { therapistsId, name, email, date, time, userEmail } = props;
  console.log(props, "props");
  const formattedDate = new Date(date).toISOString().split("T")[0];

  const handleBookAppointment = async () => {
    try {
      const requestBody = {
        therapistsId,
        date: formattedDate,
        time,
        email,
        status: "booked",
        PatientEmail: userEmail,
      };
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
        <h3 className="text-start font-medium text-xl">{email}</h3>
        <h3 className="text-start font-medium text-xl">{date}</h3>
        <h3 className="text-start font-medium text-xl">{time}</h3>
      </div>
      <div className=" bg-blue-700 rounded-md  p-4 mt-2 cursor-pointer">
        <button
          className="text-white font-bold"
          onClick={handleBookAppointment}
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default CardForAppointment;
