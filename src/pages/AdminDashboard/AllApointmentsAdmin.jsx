import React, { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../../App";

const AllApointmentsAdmin = () => {
  const [appointments, setAppointments] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}api/getTherapistAvailability`
      );
      console.log(response, "reponse are:----");
      setAppointments(response.data.AvailabilityData);
    } catch (err) {
      console.log(err);
      toast.error("Error while Fetching Data");
    }
  };
  const getStatusColor = (status) => {
    switch (status) {
      case "none":
        return "bg-yellow-300";
      case "Confirmed":
        return "bg-green-300";
      case "Completed":
        return "bg-blue-300";
      case "Cancelled":
        return "bg-red-300";
      default:
        return "bg-gray-200";
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
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
                    {/* <th className="font-bold p-2 text-left">Name</th> */}
                    <th className="font-bold p-2 text-left">Date</th>
                    <th className="font-bold p-2 text-left">Time</th>
                    <th className="font-bold p-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((data, index) => (
                    <tr key={index} className="border-t">
                      <td className="p-2">{index + 1}</td>
                      {/* <td className="p-2">{data.name}</td> */}
                      <td className="p-2">{data.date}</td>
                      <td className="p-2">{data.time}</td>
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

              <Pagination />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllApointmentsAdmin;
