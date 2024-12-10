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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const userId = userDetails?.userId;
  async function myAppointmentsList(pageNo) {
    try {
      const myAppointmentList = await axios.get(
        `${baseUrl}api/getPatientById?pageNo=${pageNo}&patientId=${userId}`
      );
      setTotalPages(myAppointmentList.data.totalPages);
      console.log(myAppointmentList, "list data==========================");
      setAppointmentData(myAppointmentList.data.result);
    } catch (error) {
      toast.error(error, "error");
    }
  }
  function DateTime(data) {
    const date = new Date(data);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() is zero-based, so add 1
    const day = String(date.getDate()).padStart(2, "0");

    return `${month}/${day}/${year}`;
  }
  useEffect(() => {
    myAppointmentsList(currentPage);
  }, []);

  function timeSlotFunction(startTime, appointmentType) {
    const [hours, minutes] = startTime.split(":").map(Number);

    let duration = 30;
    if (appointmentType === "Consultation(45min)") {
      duration = 45;
    }

    let endMinutes = minutes + duration;
    let endHours = hours + Math.floor(endMinutes / 60);
    endMinutes = endMinutes % 60;

    const endTimeFormatted = `${endHours}:${
      endMinutes < 10 ? "0" : ""
    }${endMinutes}`;

    return endTimeFormatted;
  }

  const handlePageChange = (pageNo) => {
    if (pageNo >= 1 && pageNo <= totalPages) {
      myAppointmentsList(pageNo);
      setCurrentPage(pageNo);
    }
  };
  return (
    <div className="w-full h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 bg-gray-100 p-6">
          <div className="w-full overflow-hidden ">
            <div className="w-full h-[30%]  ">
              <div className="w-full h-8 mb-4">
                <h1 className="font-bold text-3xl">My Appointments</h1>
              </div>
              <table className="table-auto w-full ">
                <thead>
                  <tr className="h-10">
                    <th className="font-bold p-2 text-left">sr no</th>
                    <th className="font-bold p-2 text-left">Therapist Name</th>
                    <th className="font-bold p-2 text-left">Therapist Email</th>
                    <th className="font-bold p-2 text-left">Specialty</th>
                    <th className="font-bold p-2 text-left">
                      Appointment Type(duration)
                    </th>
                    <th className="font-bold p-2 text-left">Date</th>
                    <th className="font-bold p-2 text-left">Time Slot</th>
                  </tr>
                </thead>
                <tbody>
                  {appointmentData.map((data, index) => (
                    <tr key={index} className="border-t">
                      <td className="p-2">{index + 1}</td>
                      <td className="p-2">{data?.therapistDetails[0]?.name}</td>
                      <td className="p-2">{data?.therapistDetails[0]?.email}</td>
                      <td className="p-2">
                        {data?.therapistDetails[0]?.specialty}
                      </td>

                      <td className="p-2">{data?.appointmentType}</td>
                      <td className="p-2">{DateTime(data?.date)}</td>
                      <td className="p-2">
                        {data?.time} -
                        {timeSlotFunction(data?.time, data?.appointmentType)}
                      </td>

                      {/* <td className="p-2">{data.date}</td>
                      <td className="p-2">{data.time}</td> */}
                    </tr>
                  ))}
                </tbody>
              </table>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAppointments;
