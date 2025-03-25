import React, { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { toast } from "react-toastify";
import { baseUrl } from "../../App";
import axios from "axios";
import useDisableButton from "../../hooks/useDisableButton";
import Loader from "../../components/Loader";

const AllAppointments = () => {
  const userDetails = JSON.parse(sessionStorage.getItem("userDetails"));
  const userId = userDetails.userId;
  const [appointments, setAppointments] = useState([]);
  const [updateDataId, setUpdateDataId] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [patientEmail, setPatientEmail] = useState(null);
  const [loadingUpdateStatus, setLoadingUpdateStatus] = useState(false);
  const { isDisableButton, handleButtonDisability, handleResetButton } =
    useDisableButton();
  const updateAppointmentStatus = async () => {
    try {
      handleButtonDisability();
      setLoadingUpdateStatus(true);

      const response = await axios.post(
        `${baseUrl}api/updateAppointmentStatus`,
        { id: updateDataId, status: newStatus, emailId: patientEmail }
      );
      if (response.data === "Phone Number is Invalid") {
        toast.error(response.data);
        setLoadingUpdateStatus(false);
        setShowModal(false);
        handleResetButton();
        return;
      }
      toast.success("Status Updated SuccessFully");
      setLoadingUpdateStatus(false);
      setShowModal(false);
      handleResetButton();
      fetchAppointments();
    } catch (error) {
      console.error(error);
      toast.error("Error updating appointment status");
      setLoadingUpdateStatus(false);
    }
  };
  const fetchAppointments = async (pageNo) => {
    try {
      const response = await axios.get(
        `${baseUrl}api/getTherapistDetailsByIdAndStatus?therapistId=${userId}&pageNo=${pageNo}`
      );

      setAppointments(response.data.result);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching appointments", error.data.error);
      toast.error(error.data);
    }
  };
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [newStatus, setNewStatus] = useState("");
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

  useEffect(() => {
    fetchAppointments(currentPage);
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

  function DateTime(data) {
    const date = new Date(data);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() is zero-based, so add 1
    const day = String(date.getDate()).padStart(2, "0");

    return `${month}/${day}/${year}`;
  }

  const handlePageChange = (pageNo) => {
    if (pageNo >= 1 && pageNo <= totalPages) {
      fetchAppointments(pageNo);
      setCurrentPage(pageNo);
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
              <div className="w-full flex-grow mb-4">
                <h1 className="font-bold text-3xl">Scheduled Appointments</h1>
              </div>
              <table className="w-full table-auto">
                <thead>
                  <tr className="h-10">
                    <th className="font-bold p-2 text-left">sr no</th>
                    <th className="font-bold p-2 text-left">Patient Name</th>
                    <th className="font-bold p-2 text-left">Patient Email</th>
                    <th className="font-bold p-2 text-left">
                      Appointment Type
                    </th>
                    <th className="font-bold p-2 text-left">Specialty</th>
                    <th className="font-bold p-2 text-left">Date</th>
                    <th className="font-bold p-2 text-left">Time Slot</th>
                    <th className="font-bold p-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments
                    ?.filter((data) => data.status !== "Cancelled")
                    ?.map((data, index) => (
                      <tr key={index} className="border-t">
                        <td className="p-2">{index + 1}</td>
                        <td className="p-2">{data?.appointment_name}</td>
                        <td className="p-2">{data?.appointment_email}</td>
                        <td className="p-2">{data?.appointmentType}</td>
                        <td className="p-2">{data?.specialty}</td>
                        <td className="p-2">{DateTime(data?.date)}</td>
                        <td className="p-2">
                          {data.time}-
                          {timeSlotFunction(data?.time, data?.appointmentType)}
                        </td>
                        <td className="p-2">
                          {/* Status Label with background color and fixed width */}
                          <span
                            className={`p-2 text-white rounded ${getStatusColor(
                              data.status
                            )} w-32 text-center inline-block`}
                          >
                            {data?.status}
                          </span>
                        </td>
                        {/* <td className='p-2'>
                        <button
                          onClick={() => {
                            setShowModal(true); // Open the modal
                            setUpdateDataId(data.id);
                            setPatientEmail(data?.appointment_email);
                          }}
                          className='p-2 bg-blue-500 text-white rounded'
                        >
                          Update Status
                        </button>
                      </td> */}
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
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          {loadingUpdateStatus ? (
            <Loader />
          ) : (
            <div className="bg-white p-6 rounded-md w-96">
              <h3 className="font-bold text-xl mb-4">
                Update Appointment Status
              </h3>
              <div>
                <label className="block mb-2">Select Status:</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="p-2 border rounded w-full mb-4"
                >
                  <option value="">Select a status</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 bg-gray-400 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={updateAppointmentStatus}
                  className="p-2 bg-blue-500 text-white rounded"
                  disabled={isDisableButton}
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AllAppointments;
