import React, { useState } from "react";
import Pagination from "../../components/Pagination";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

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
  // return (
  //   <div className="w-full h-full p-0 m-0 border-2 border-black overflow-hidden ">
  //     <div className="flex h-[50%]">
  //       <div className="w-[50%] h-full border-2 border-black  ">
  //         <div className="w-full h-8 border-2 border-black dark:bg-gray-900">
  //           <h1 className="text-white">Appointments</h1>
  //         </div>
  //         {/* header */}
  //         <div className="w-full h-10  flex space-x-28">
  //           <h3 className="font-bold">sr no</h3>
  //           <h3 className="font-bold">Name</h3>
  //           <h3 className="font-bold">Date</h3>
  //           <h3 className="font-bold">Time</h3>
  //         </div>
  //         <div className="w-full h-10 border-2 border-black flex space-x-28">
  //           <h3>1</h3>
  //           <h3>Adom</h3>
  //           <h3>29Nov24</h3>
  //           <h3>18:30</h3>
  //         </div>
  //         <div className="w-full h-10 border-2 border-black flex space-x-28">
  //           <h3>2</h3>
  //           <h3>Alice</h3>
  //           <h3>30Nov24</h3>
  //           <h3>14:30</h3>
  //         </div>
  //         <div className="w-full h-10 border-2 border-black flex space-x-28">
  //           <h3>1</h3>
  //           <h3>Adom</h3>
  //           <h3>29Nov24</h3>
  //           <h3>18:30</h3>
  //         </div>
  //         <div className="w-full h-10 border-2 border-black flex space-x-28">
  //           <h3>1</h3>
  //           <h3>Adom</h3>
  //           <h3>29Nov24</h3>
  //           <h3>18:30</h3>
  //         </div>
  //         <div className="w-full h-10 border-2 border-black flex space-x-28">
  //           <h3>1</h3>
  //           <h3>Adom</h3>
  //           <h3>29Nov24</h3>
  //           <h3>18:30</h3>
  //         </div>
  //         <div className="w-full h-10 border-2 border-black flex space-x-28">
  //           <h3>1</h3>
  //           <h3>Adom</h3>
  //           <h3>29Nov24</h3>
  //           <h3>18:30</h3>
  //         </div>

  //         <Pagination />
  //       </div>
  //       <div className="w-[50%] h-[30%] border-2 border-black  ">
  //         <div className="w-full h-8 border-2 border-black dark:bg-gray-900">
  //           <h1 className="text-white">Users</h1>
  //         </div>
  //         {/* header */}
  //         <table className="w-full h-10  flex space-x-28">
  //           <tr>
  //             <th className="font-bold">sr no</th>
  //             <th className="font-bold">Name</th>
  //             <th className="font-bold">Date</th>
  //             <th className="font-bold">Time</th>
  //           </tr>
  //           <tr className="w-full h-10 border-2 border-black flex space-x-28">
  //             <td>1</td>
  //             <td>Adom</td>
  //             <td>29Nov24</td>
  //             <td>18:30</td>
  //           </tr>
  //           <tr className="w-full h-10 border-2 border-black flex space-x-28">
  //             <td>2</td>
  //             <td>Alice</td>
  //             <td>30Nov24</td>
  //             <td>14:30</td>
  //           </tr>
  //           <tr className="w-full h-10 border-2 border-black flex space-x-28">
  //             <td>1</td>
  //             <td>Adom</td>
  //             <td>29Nov24</td>
  //             <td>18:30</td>
  //           </tr>
  //         </table>

  //         <Pagination />
  //       </div>
  //     </div>
  //     <div className="w-full h-[50%] border-2 border-black  mt-10">
  //       <div className="w-full h-16 border-2 border-black dark:bg-gray-900 flex items-center justify-between">
  //         <div className="flex justify-center flex-grow">
  //           <h1 className="text-white">Therapist</h1>
  //         </div>
  //         <div className="flex justify-end ">
  //           <button className="bg-blue-600 rounded-md px-4 py-2">ADD</button>
  //         </div>
  //       </div>

  //       <table className="w-full h-10  flex space-x-60">
  //         <tr>
  //           <th className="font-bold">sr no</th>
  //           <th className="font-bold">Name</th>
  //           <th className="font-bold">Date</th>
  //           <th className="font-bold">Time</th>
  //         </tr>
  //         <tr className="w-full h-10 border-2 border-black flex space-x-60">
  //           <td>1</td>
  //           <td>Adom</td>
  //           <td>29Nov24</td>
  //           <td>18:30</td>
  //         </tr>
  //         <tr className="w-full h-10 border-2 border-black flex space-x-60">
  //           <td>2</td>
  //           <td>Alice</td>
  //           <td>30Nov24</td>
  //           <td>14:30</td>
  //         </tr>
  //         <tr className="w-full h-10 border-2 border-black flex space-x-60">
  //           <td>2</td>
  //           <td>Alice</td>
  //           <td>30Nov24</td>
  //           <td>14:30</td>
  //         </tr>
  //         <tr className="w-full h-10 border-2 border-black flex space-x-60">
  //           <td>2</td>
  //           <td>Alice</td>
  //           <td>30Nov24</td>
  //           <td>14:30</td>
  //         </tr>
  //       </table>

  //       <Pagination />
  //     </div>
  //   </div>
  // );
};

export default AllApointmentsAdmin;
