import React, { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { toast } from "react-toastify";

const PatientList = () => {
  const [patientList, setPatientList] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get("https://api.example.com/data");
      setPatientList(response.data);
    } catch (err) {
      console.log(err);
      toast.error("Error while Fetching Data");
    }
  };

  // useEffect(()=>{
  //  fetchData()
  // },[])
  return (
    <div className="w-full h-screen flex ">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 bg-gray-100 p-6">
          <div className="w-full overflow-hidden ">
            <div className="w-full h-[30%]  ">
              <div className="w-full h-8 ">
                <h1 className="font-bold text-3xl">Patients</h1>
              </div>
              <table className="w-full table-auto">
                <thead>
                  <tr className="h-10">
                    <th className="font-bold p-2 text-left">sr no</th>
                    <th className="font-bold p-2 text-left">Name</th>
                    <th className="font-bold p-2 text-left">Date</th>
                    <th className="font-bold p-2 text-left">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {patientList.map((data, index) => (
                    <tr key={index} className="border-t">
                      <td className="p-2">{data.srNo}</td>
                      <td className="p-2">{data.name}</td>
                      <td className="p-2">{data.date}</td>
                      <td className="p-2">{data.time}</td>
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

export default PatientList;
