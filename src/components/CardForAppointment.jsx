import React, { useState } from "react";
import medicalImage from "../assets/medicalPlaceholder.png";
import { baseUrl } from "../App";
import axios from "axios";
import { IoMdArrowRoundForward } from "react-icons/io";
import { toast } from "react-toastify";
const CardForAppointment = (props) => {
  const {
    therapistsId,
    name,
    date,
    startTime,
    endTime,
    userEmail,
    patientNumber,
    region,
    therapistEmail,
    specialty,
  } = props;
  const formattedDate = new Date(date).toISOString().split("T")[0];
  function DateTime(data) {
    const date = new Date(data);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() is zero-based, so add 1
    const day = String(date.getDate()).padStart(2, "0");

    return `${month}/${day}/${year}`;
  }

  const handleBookAppointment = async () => {
    try {
      const requestBody = {
        therapistsId,
        date: formattedDate,
        time: startTime,
        patientEmail: userEmail,
        patientNumber: patientNumber,
      };
      // console.log(requestBody, "request body");
      const response = await axios.post(
        `${baseUrl}api/book-appointment`,
        requestBody
      );

      if (response.status === 200) {
        toast.success("Appointment booked successfully!");
      } else {
        toast.error("Failed to book the appointment.");
      }
    } catch (error) {
      console.error("Error booking the appointment:", error);
      toast.error("An error occurred while booking the appointment.");
    }
  };

  return (
    <div className="w-[20rem] tracking-wide border-2 border-gray-300 p-6 shadow-xl bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg hover:shadow-2xl transition-all">
      <div className="w-full h-auto  overflow-hidden rounded-t-lg">
        <img
          src={medicalImage}
          alt="Therapist"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="space-y-2 p-4">
        <h2 className="text-start font-bold text-2xl text-gray-800 mb-2">
          {name}
        </h2>
        <div className="flex items-center space-x-2">
          <h3 className="text-start font-medium text-lg text-gray-500">
            <span className="text-gray-700 font-semibold">Specialty:</span>{" "}
            {specialty}
          </h3>
        </div>
        <div className="flex items-center space-x-2">
          <h3 className="text-start font-medium text-lg text-gray-500">
            <span className="text-gray-700 font-semibold">Email:</span>{" "}
            {therapistEmail}
          </h3>
        </div>
        <div className="flex items-center space-x-2">
          <h3 className="text-start font-medium text-lg text-gray-500">
            <span className="font-semibold text-gray-700">Region:</span>{" "}
            {region}
          </h3>
        </div>
        <div className="flex items-center space-x-2">
          <h3 className="text-start font-medium text-lg text-gray-500">
            <span className="font-semibold text-gray-700">Date:</span>{" "}
            {formattedDate}
          </h3>
        </div>
        <div className="flex items-center space-x-2">
          <h3 className="text-start font-medium text-lg text-gray-500">
            <span className="font-semibold text-gray-700">Time Slot:</span>{" "}
            {startTime} - {endTime}
          </h3>
        </div>
      </div>
      <div
        onClick={handleBookAppointment}
        className="bg-blue-600 rounded-md p-4 mt-4 cursor-pointer flex justify-between items-center hover:bg-blue-500 transition-colors"
      >
        <button className="text-white font-semibold text-lg">
          Book Appointment
        </button>
        <IoMdArrowRoundForward className="w-6 h-6 text-white" />
      </div>
    </div>
  );
};

export default CardForAppointment;
