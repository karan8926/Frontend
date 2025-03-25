import React, { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../../App";
import useDisableButton from "../../hooks/useDisableButton";
import Loader from "../../components/Loader";
import { checkExpireDateTime } from "../../utils/checkExpireDateTime";

// link,
//       emailId,
//       patientName,
//       therapistName,
//       appointementDate,
//       appointementTime
const AllApointmentsAdmin = () => {
  const [updateDataId, setUpdateDataId] = useState("");
  const [patientEmail, setPatientEmail] = useState(null);
  const [showModalForUpdateStatus, setShowModalForUpdateStatus] =
    useState(false);
  const [loadingUpdateStatus, setLoadingUpdateStatus] = useState(false);
  const [triggerMailLoader, setTriggerMailLoadder] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [triggerLinkModel, setTriggerLinkModel] = useState(false);
  const [videoChatLink, setVideoChatLink] = useState("");
  const [updateData, setUpdateData] = useState({
    emailId: "",
    patientName: "",
    therapistName: "",
    appointementDate: "",
    appointementTime: "",
  });
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [appointments, setAppointments] = useState([]);
  const [searchQuery, setSearchQuery] = useState(" ");
  const [specialtyVal, setSpecialityVal] = useState([]);
  const [regions, setRegions] = useState([]);
  const [selectedSpeciality, setSelectedSpeciality] = useState("all");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const { isDisableButton, handleButtonDisability, handleResetButton } =
    useDisableButton();
  const fetchData = async (pageNo) => {
    try {
      const response = await axios.get(
        `${baseUrl}api/allAppointment?pageNo=${pageNo}&searchType=${searchType}&searchQuery=${searchQuery}&region=${selectedRegion}&speciality=${selectedSpeciality}`
      );
      setAppointments(response.data.AppointmentData);
      setTotalPages(response.data.noOfPages);
    } catch (err) {
      setAppointments([]);
      setTotalPages(1);
      // toast.error(err.response.data.message);
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

  const triggerLinkOnMail = async () => {
    setTriggerMailLoadder(true);
    const {
      emailId,
      patientName,
      therapistName,
      appointementDate,
      appointementTime,
    } = updateData;
    try {
      const data = await axios.post(`${baseUrl}api/triggerMail`, {
        link: videoChatLink,
        emailId,
        patientName,
        therapistName,
        appointementDate,
        appointementTime,
      });
      setTriggerLinkModel(false);
      setShowModalForUpdateStatus(true);
      setTriggerMailLoadder(false);
      toast.success("Sent Video Chat Link");
    } catch (error) {
      console.error(error);
      setTriggerMailLoadder(false);
      toast.error("Error while sending link on mail");
      setTriggerLinkModel(false);
    }
  };
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
        setShowModalForUpdateStatus(false);
        handleResetButton();
        return;
      }
      toast.success("Status Updated SuccessFully");
      setLoadingUpdateStatus(false);
      setShowModalForUpdateStatus(false);
      handleResetButton();
      fetchData(currentPage);
    } catch (error) {
      console.error(error);
      toast.error("Error updating appointment status");
      setLoadingUpdateStatus(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
    fetchDropdownData();
  }, [selectedSpeciality, selectedRegion]);

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

  function handleSearch() {
    fetchData(currentPage);
  }
  const [searchType, setSearchType] = useState("patient");
  function handleSearchTypeChange(e) {
    setSearchType(e.target.value);
  }

  const fetchDropdownData = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}api/getTherapistSpecialtyRegion`
      );
      if (response.data.success) {
        setSpecialityVal(response?.data?.specialty || []);
        setRegions(response?.data?.region || []);
      }
    } catch (error) {
      console.error("Error fetching dropdown data:", error);
    }
  };
  return (
    <div className="w-full h-screen flex  ">
      <Sidebar />
      <div className="flex-1 flex flex-col w-[85%]">
        <Navbar />
        <div className="flex-1 bg-gray-100 p-6 ">
          <div className="w-full ">
            <div className="w-full h-[30%]  ">
              <div className="w-full h-8 ">
                <h1 className="font-bold text-3xl">Appointments</h1>
              </div>
              <div className="flex w-full ">
                <div className="w-full p-2 flex items-center space-x-4 ">
                  <label htmlFor="region" className="text-black font-bold">
                    <select
                      id="search-type"
                      className="block w-[90%] px-3 py-1 border border-gray-300 rounded-md"
                      value={searchType}
                      onChange={handleSearchTypeChange}
                    >
                      <option value="patient">Search Patient</option>
                      <option value="therapist">Search Therapist</option>
                    </select>
                  </label>
                  <input
                    className="w-[40%] h-[2rem] bg-slate-200 outline-none text-black rounded-md pl-4"
                    id="search-type"
                    placeholder={
                      searchType === "patient"
                        ? "Enter Patient Name"
                        : "Enter Therapist Name"
                    }
                    onChange={(e) =>
                      setSearchQuery((prev) => e.target.value || " ")
                    }
                  ></input>

                  <div className="flex justify-end">
                    <button
                      onClick={handleSearch}
                      className="ml-auto h-[2rem] bg-blue-500 text-white rounded-md px-4"
                    >
                      Search
                    </button>
                  </div>
                </div>
                <div className="flex w-full">
                  <div className="w-full p-2 flex items-center space-x-4 ">
                    <label
                      htmlFor="speciality"
                      className="text-black font-bold"
                    >
                      <select
                        id="speciality"
                        className="block w-full px-3 py-1 border border-gray-300 rounded-md"
                        value={selectedSpeciality}
                        onChange={(e) => setSelectedSpeciality(e.target.value)}
                      >
                        <option value="all">Therapist Speciality(All)</option>
                        {specialtyVal?.map((data, index) => (
                          <option key={index} value={data?.specialty}>
                            {data?.specialty}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <div className="w-full p-2 flex items-center space-x-4 ">
                    <label htmlFor="region" className="text-black font-bold">
                      <select
                        id="region"
                        className="block w-full px-3 py-1 border border-gray-300 rounded-md"
                        value={selectedRegion}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                      >
                        <option value="all">Therapist Region(All)</option>
                        {regions?.map((data, index) => (
                          <option key={index} value={data?.region}>
                            {data?.region}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                </div>
              </div>

              <div className="min-w-[64rem] w-full  overflow-x-scroll">
                <table className="w-full  table-auto ">
                  <thead>
                    <tr className="h-10">
                      <th className="font-bold p-2 text-left whitespace-nowrap  pr-4">
                        sr no
                      </th>
                      <th className="font-bold p-2 text-left whitespace-nowrap pr-4">
                        Patient Name
                      </th>
                      <th className="font-bold p-2 text-left whitespace-nowrap pr-4">
                        Patient Email
                      </th>
                      <th className="font-bold p-2 text-left whitespace-nowrap pr-4">
                        Therapist Name
                      </th>
                      <th className="font-bold p-2 text-left whitespace-nowrap pr-4">
                        Therapist Email
                      </th>
                      <th className="font-bold p-2 text-left whitespace-nowrap pr-4">
                        Therapist Specialty
                      </th>
                      <th className="font-bold p-2 text-left whitespace-nowrap pr-4">
                        Therapist Region
                      </th>
                      <th className="font-bold p-2 text-left">Date</th>
                      <th className="font-bold p-2 text-left whitespace-nowrap pr-4">
                        Time Slot
                      </th>
                      <th className="font-bold p-2 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments?.length ? (
                      appointments?.map((data, index) => (
                        <tr key={index} className="border-t">
                          <td className="p-2 pr-4">{index + 1}</td>
                          <td className="p-2 pr-4">{data?.appointment_name}</td>
                          <td className="p-2 pr-4 break-words max-w-xs">
                            {data?.appointment_email}
                          </td>
                          <td className="p-2 pr-4">{data?.therapistName}</td>
                          <td className="p-2 pr-4 break-words max-w-xs">
                            {data?.therapistEmail}
                          </td>
                          <td className="p-2 pr-4">
                            {data?.therapistSpeciality}
                          </td>
                          <td className="p-2 pr-4">{data?.therapistRegion}</td>
                          <td className="p-2 pr-4">{DateTime(data?.date)}</td>
                          <td className="p-2 pr-4">
                            {data?.time}-
                            {timeSlotFunction(
                              data?.time,
                              data?.appointmentType
                            )}
                          </td>
                          <td className="p-2 pr-4">
                            <span
                              className={`p-2 pr-4 text-white rounded ${
                                checkExpireDateTime(data?.date,data?.time) === true &&
                                data?.status === "Confirmed"
                                  ? "bg-red-300"
                                  : getStatusColor(data?.status)
                              } w-32 text-center inline-block`}
                            >
                              {data?.status}
                            </span>
                          </td>
                          <td className="p-2">
                            <button
                              onClick={() => {
                                data?.status !== "Pending"
                                  ? setShowModalForUpdateStatus(true)
                                  : setTriggerLinkModel(true);
                                setUpdateDataId(data.id);
                                setPatientEmail(data?.appointment_email);
                                setUpdateData({
                                  emailId: data?.appointment_email,
                                  patientName: data?.appointment_name,
                                  therapistName: data?.therapistName,
                                  appointementDate: data?.date,
                                  appointementTime: data?.time,
                                });
                              }}
                              className="p-2 bg-blue-500 text-white rounded"
                            >
                              Update Status
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <h1>No Data Available</h1>
                    )}
                  </tbody>
                </table>
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
      {showModalForUpdateStatus && (
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
                  onClick={() => setShowModalForUpdateStatus(false)}
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
      {triggerLinkModel && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          {triggerMailLoader ? (
            <Loader />
          ) : (
            <div className="bg-white p-6 rounded-md w-96 flex flex-col gap-4">
              <h3 className="font-bold text-xl mb-4">
                Add Video Chat Room Link
              </h3>
              <div>
                <label className="block mb-2 font-medium">Add Link</label>
                <input
                  type="text"
                  value={videoChatLink}
                  onChange={(e) => setVideoChatLink(e.target.value)}
                  className="p-2 w-full border-2 outline-none rounded-md"
                />
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => setTriggerLinkModel(false)}
                  className="p-2 bg-gray-400 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={triggerLinkOnMail}
                  className="p-2 bg-blue-500 text-white rounded"
                  disabled={isDisableButton}
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AllApointmentsAdmin;
