import React, { useEffect, useState } from "react";
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
  async function myAppointmentsList() {
    try {
      const myAppointmentList = await axios.get(`${baseUrl}api/allAppointment`);
      setAppointmentData(myAppointmentList.data.AppointmentData);
    } catch (error) {
      toast.error(error, "error");
    }
  }
  useEffect(() => {
    myAppointmentsList();
  }, []);
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
              <table className="table-auto w-full ">
                <thead>
                  <tr className="h-10">
                    <th className="font-bold p-2 text-left">sr no</th>
                    <th className="font-bold p-2 text-left">
                      Appointment Type
                    </th>
                    <th className="font-bold p-2 text-left">Date</th>
                    <th className="font-bold p-2 text-left">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {appointmentData.map((data, index) => (
                    <tr key={index} className="border-t">
                      <td className="p-2">{index + 1}</td>
                      <td className="p-2">{data?.appointmentType}</td>
                      <td className="p-2">{data.date}</td>
                      <td className="p-2">{data.time}</td>
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
