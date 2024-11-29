import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import Pagination from "../../components/Pagination";

const MyAppointments = () => {
  // const dateVA = new Date();
  const [nameval, setName] = useState("adom");
  const [emailval, setEmail] = useState("adom12@gmail");
  const [dateval, setDate] = useState("28-nov-24");
  const [startDate, setStartDate] = useState(new Date());
  const [calenderView, setCalenderView] = useState(false);
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
                <tr className="w-full h-10  flex space-x-80 p-4">
                  <th className="font-bold">sr no</th>
                  <th className="font-bold">Name</th>
                  <th className="font-bold">Date</th>
                  <th className="font-bold">Time</th>
                </tr>
                <tr className="w-full h-10  flex space-x-80 p-4">
                  <td>1</td>
                  <td>Adom</td>
                  <td>29Nov24</td>
                  <td>18:30</td>
                </tr>
                <tr className="w-full h-10  flex space-x-80  p-4">
                  <td>1</td>
                  <td>Adom</td>
                  <td>29Nov24</td>
                  <td>18:30</td>
                </tr>
                <tr className="w-full h-10  flex space-x-80  p-4">
                  <td>1</td>
                  <td>Adom</td>
                  <td>29Nov24</td>
                  <td>18:30</td>
                </tr>
                <tr className="w-full h-10  flex space-x-80 p-4">
                  <td>1</td>
                  <td>Adom</td>
                  <td>29Nov24</td>
                  <td>18:30</td>
                </tr>
                <tr className="w-full h-10  flex space-x-80  p-4">
                  <td>1</td>
                  <td>Adom</td>
                  <td>29Nov24</td>
                  <td>18:30</td>
                </tr>
                <tr className="w-full h-10  flex space-x-80  p-4">
                  <td>1</td>
                  <td>Adom</td>
                  <td>29Nov24</td>
                  <td>18:30</td>
                </tr>
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
