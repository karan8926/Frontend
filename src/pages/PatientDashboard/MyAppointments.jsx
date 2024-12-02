import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import Pagination from "../../components/Pagination";
import { toast } from "react-toastify";
import axios from "axios";
import { baseUrl } from "../../App";

const MyAppointments = () => {
  // const dateVA = new Date();
  const [nameval, setName] = useState("adom");
  const [emailval, setEmail] = useState("adom12@gmail");
  const [dateval, setDate] = useState("28-nov-24");
  const [startDate, setStartDate] = useState(new Date());
  const [calenderView, setCalenderView] = useState(false);
  const [appointmentData, setAppointmentData] = useState([]);
  // async function myAppointmentsList() {
  //   try {
  //     const myAppointmentList = await axios.get(`${baseUrl}/`);
  //     setAppointmentData();
  //   } catch (error) {
  //     toast.error("");
  //   }
  // }
  return (
    <div className="w-full h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 bg-gray-100 p-6">
          <div className="w-full overflow-hidden ">
            <div className="w-full h-[30%]  ">
              <div className="w-full h-8 ">
                <h1 className="font-bold text-3xl">My Appointments</h1>
              </div>
              <table className="">
                <thead>
                  <tr className="w-full h-10  flex space-x-80 p-4">
                    <th className="font-bold">sr no</th>
                    <th className="font-bold">Name</th>
                    <th className="font-bold">Date</th>
                    <th className="font-bold">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {appointmentData.map((data, index) => (
                    <tr key={index} className="border-t">
                      <td className="p-2">{index + 1}</td>
                      <td className="p-2">{data.name}</td>
                      <td className="p-2">{data.email}</td>
                      <td className="p-2">{data.phone_number}</td>
                      <td className="p-2">{data.type}</td>
                      {/* <td className="p-2">{data.date}</td>
                      <td className="p-2">{data.time}</td> */}
                    </tr>
                  ))}
                </tbody>
              </table>

              <Pagination />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAppointments;
