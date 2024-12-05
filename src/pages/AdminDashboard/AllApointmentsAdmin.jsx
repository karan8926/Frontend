import React, { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../../App";

const AllApointmentsAdmin = () => {
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [appointments, setAppointments] = useState([]);
  const fetchData = async (pageNo) => {
    try {
      const response = await axios.get(
        `${baseUrl}api/allAppointment?pageNo=${pageNo}`
      );
      console.log(response, "reponse are:----");
      setAppointments(response.data.AppointmentData);
      setTotalPages(response.data.noOfPages);
    } catch (err) {
      console.log(err);
      toast.error("Error while Fetching Data");
    }
  };
  const getStatusColor = (status) => {
    switch (status) {
      case "none":
        return "bg-gray-200";
      case "Confirmed":
        return "bg-green-300";
      case "Completed":
        return "bg-blue-300";
      case "Cancelled":
        return "bg-red-300";
      case "Pending":
        return "bg-orange-300";
      default:
        return "bg-gray-200";
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, []);

  const handlePageChange = (pageNo) => {
    if (pageNo >= 1 && pageNo <= totalPages) {
      fetchData(pageNo);
      setCurrentPage(pageNo);
    }
  };

  function DateTime(data) {
    const date = new Date(data);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() is zero-based, so add 1
    const day = String(date.getDate()).padStart(2, "0");

    return `${month}/${day}/${year}`;
  }

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
  return (
    <div className="w-full h-screen flex ">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 bg-gray-100 p-6">
          <div className="w-full overflow-hidden ">
            <div className="w-full h-[30%]  ">
              <div className="w-full h-8 ">
                <h1 className="font-bold text-3xl">Appointments</h1>
              </div>
              <table className="w-full table-auto">
                <thead>
                  <tr className="h-10">
                    <th className="font-bold p-2 text-left">sr no</th>
                    <th className="font-bold p-2 text-left">Patient Name</th>
                    <th className="font-bold p-2 text-left">Patient Email</th>
                    <th className="font-bold p-2 text-left">Therapist Name</th>
                    <th className="font-bold p-2 text-left">Therapist Email</th>
                    <th className="font-bold p-2 text-left">
                      Therapist Specialty
                    </th>
                    <th className="font-bold p-2 text-left">
                      Therapist Region
                    </th>
                    <th className="font-bold p-2 text-left">Date</th>
                    <th className="font-bold p-2 text-left">Time Slot</th>
                    <th className="font-bold p-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments?.map((data, index) => (
                    <tr key={index} className="border-t">
                      <td className="p-2">{index + 1}</td>
                      <td className="p-2">{data?.patientDetails[0]?.name}</td>
                      <td className="p-2 break-words max-w-xs">
                        {data?.patientDetails[0]?.email}
                      </td>
                      <td className="p-2">{data.therapistDetails[0].name}</td>
                      <td className="p-2 break-words max-w-xs">
                        {data.therapistDetails[0].email}
                      </td>
                      <td className="p-2">
                        {data.therapistDetails[0].specialty}
                      </td>
                      <td className="p-2">{data.therapistDetails[0].region}</td>
                      {/* <td className="p-2">{data.name}</td> */}
                      <td className="p-2">{DateTime(data.date)}</td>
                      <td className="p-2">
                        {data.time}-
                        {timeSlotFunction(data.time, data.appointmentType)}
                      </td>
                      <td className="p-2">
                        {/* Status Label with background color and fixed width */}
                        <span
                          className={`p-2 text-white rounded ${getStatusColor(
                            data.status
                          )} w-32 text-center inline-block`}
                        >
                          {data.status}
                        </span>
                      </td>
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

export default AllApointmentsAdmin;
