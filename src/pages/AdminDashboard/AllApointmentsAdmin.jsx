import React, { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { toast } from "react-toastify";

const AllApointmentsAdmin = () => {
  const [appointments, setAppointments] = useState([
    {
      srNo: 1,
      name: "John Doe",
      date: "2024-12-01",
      time: "10:00 AM",
      status: "Confirmed",
    },
    {
      srNo: 2,
      name: "Jane Smith",
      date: "2024-12-02",
      time: "01:30 PM",
      status: "Pending",
    },
    {
      srNo: 3,
      name: "Michael Johnson",
      date: "2024-12-03",
      time: "11:00 AM",
      status: "Confirmed",
    },
    {
      srNo: 4,
      name: "Emily Davis",
      date: "2024-12-04",
      time: "02:15 PM",
      status: "Cancelled",
    },
    {
      srNo: 5,
      name: "Sarah Lee",
      date: "2024-12-05",
      time: "03:30 PM",
      status: "Confirmed",
    },
    {
      srNo: 6,
      name: "David Brown",
      date: "2024-12-06",
      time: "09:00 AM",
      status: "Pending",
    },
    {
      srNo: 7,
      name: "Olivia Green",
      date: "2024-12-07",
      time: "12:45 PM",
      status: "Confirmed",
    },
    {
      srNo: 8,
      name: "Liam White",
      date: "2024-12-08",
      time: "04:00 PM",
      status: "Cancelled",
    },
    {
      srNo: 9,
      name: "Ava Clark",
      date: "2024-12-09",
      time: "10:30 AM",
      status: "Confirmed",
    },
    {
      srNo: 10,
      name: "James Taylor",
      date: "2024-12-10",
      time: "02:00 PM",
      status: "Pending",
    },
  ]);
  const fetchData = async () => {
    try {
      const response = await axios.get("https://api.example.com/data");
      setAppointments(response.data);
    } catch (err) {
      console.log(err);
      toast.error("Error while Fetching Data");
    }
  };
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
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

  // useEffect(() => {
  //   fetchData();
  // }, []);
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
                    <th className="font-bold p-2 text-left">Name</th>
                    <th className="font-bold p-2 text-left">Date</th>
                    <th className="font-bold p-2 text-left">Time</th>
                    <th className="font-bold p-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((data, index) => (
                    <tr key={index} className="border-t">
                      <td className="p-2">{data.srNo}</td>
                      <td className="p-2">{data.name}</td>
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
