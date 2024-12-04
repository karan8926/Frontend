import React, { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../../App";
import { useNavigate } from "react-router-dom";
const PatientList = () => {
  const [patientList, setPatientList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalNoOfPatient, setTotalNoOfPatient] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const fetchData = async (pageNo) => {
    try {
      const response = await axios.get(
        `${baseUrl}api/getpatient/?pageNo=${pageNo}`
      );
      setPatientList(response.data.patients);
      setTotalPages(response.data.noOfPages);
      setTotalNoOfPatient(response.data.noOfPatient);
    } catch (err) {
      console.log(err);
      toast.error("Error while Fetching Data");
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);
  const handlePageChange = (pageNo) => {
    if (pageNo >= 1 && pageNo <= totalPages) {
      fetchData(pageNo);
      setCurrentPage(pageNo);
    }
  };
  function showPatientDetails(id) {
    navigate(`/admin/patientDetails/${id}`);
    console.log(id, "abcd");
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
                <h1 className="font-bold text-3xl">Patients</h1>
              </div>
              <table className="w-full table-auto">
                <thead>
                  <tr className="h-10">
                    <th className="font-bold p-2 text-left">sr no</th>
                    <th className="font-bold p-2 text-left">Name</th>
                    <th className="font-bold p-2 text-left">Email</th>
                    <th className="font-bold p-2 text-left">Number</th>
                    <th className="font-bold p-2 text-left">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {patientList.map((data, index) => (
                    <tr
                      key={data._id}
                      className="border-t cursor-pointer hover:bg-slate-200"
                      onClick={() => showPatientDetails(data._id)}
                    >
                      <td className="p-2">{index + 1}</td>
                      <td className="p-2">{data.name}</td>
                      <td className="p-2">{data.email}</td>
                      <td className="p-2">{data.phone_number}</td>
                      <td className="p-2">{data.type}</td>
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

export default PatientList;
