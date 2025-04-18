import React, { useEffect, useRef, useState } from "react";
import Pagination from "../../components/Pagination";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../../App";
import { useNavigate } from "react-router-dom";
import { TbRefresh } from "react-icons/tb";
import Loader from "../../components/Loader";
const PatientList = () => {
  const [patientList, setPatientList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalNoOfPatient, setTotalNoOfPatient] = useState(0);
  const [toggleModel, setToggleModel] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [accessCode, setAccessCode] = useState("");
  const [addPatientLoader, setAddPatientLoader] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPhoneValid, setIsPhoneValid] = useState(true);
  const [showRegions, setShowRegions] = useState([]);
  const [showTherapist, setShowTherapist] = useState([]);
  const inputRef = useRef(null);
  const [formData, setFormData] = useState({
    accessCode: "",
    name: "",
    phone_number: "",
    email: "",
    addRegion: "All",
    addTherapistName: "All",
  });
  const navigate = useNavigate();
  const fetchData = async (pageNo) => {
    try {
      const response = await axios.get(
        `${baseUrl}api/getpatient/?pageNo=${pageNo}&searchPatient=${searchPatient}`
      );
      console.log(response, "res12");
      setPatientList(response.data.patients);
      setTotalPages(response.data.noOfPages);
      setTotalNoOfPatient(response.data.noOfPatient);
    } catch (err) {
      console.log(err, "error is");
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
  const handleChange = (e) => {
    const { value, name } = e.target;
    console.log({ value, name });
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === "email") {
      validateEmail(value);
    } else if (name === "phone_number") {
      validatePhone(value);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData, "formData-----");
    setAddPatientLoader(true);
    try {
      const { name, email, phone_number, addRegion, addTherapistName } =
        formData;
      const createPatient = await axios.post(`${baseUrl}api/patient-signup`, {
        name,
        email,
        phone_number,
        accessCode,
        regionAddedByAdmin: addRegion,
        therapistNameAddedByAdmin: addTherapistName,
      });
      setToggleModel(false);
      setAddPatientLoader(false);
      fetchData(currentPage);
      inputRef.current.focus();
      toast.success("Access code generated successfully");
    } catch (error) {
      toast.error(error.response.data.error, "failed to add");
      console.log(error, "error value");
      setToggleModel(true);
      setAddPatientLoader(false);
    }
    setFormData({
      accessCode: "",
      name: "",
      number: "",
      email: "",
      addRegion: "",
      addTherapistName: "",
    });
  };
  function showPatientDetails(id) {
    navigate(`/admin/patientDetails/${id}`);
  }

  async function generateAccessCode() {
    try {
      const accessCode = await axios.get(`${baseUrl}api/getUniqueAccessCode`);
      setAccessCode(accessCode?.data?.accessToken);
    } catch (error) {
      console.log(error, "error value");
    }
  }

  const fetchDropdownData = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}api/getTherapistSpecialtyRegion`
      );
      if (response.data.success) {
        setShowRegions(response.data.region || []);
      }
    } catch (error) {
      console.error("Error fetching dropdown data:", error);
    }
  };
  const fetchTherapistData = async () => {
    try {
      const response = await axios.get(`${baseUrl}api/showAllTherapistsNames`);
      console.log(response.data.therapistaData, "res99");
      setShowTherapist(response.data.therapistaData);
    } catch (err) {
      console.log(err);
      toast.error("Error while Fetching Data");
    }
  };
  useEffect(() => {
    generateAccessCode();
    fetchDropdownData();
    fetchTherapistData();
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [toggleModel]);
  // form Validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(email));
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{11}$/; // Example: Validate 10 digits
    setIsPhoneValid(phoneRegex.test(phone));
  };

  const isFormValid = () => {
    // Form is valid if both email and phone are valid
    return isEmailValid && isPhoneValid;
  };

  const [searchPatient, setSearchPatient] = useState("");
  const handleSearch = () => {
    fetchData(currentPage);
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
                <h1 className="font-bold text-3xl">Patients</h1>
              </div>
              <div className="w-full p-2 flex items-center space-x-4 ">
                <label htmlFor="region" className="text-black font-bold">
                  Search Patient
                </label>
                <input
                  className="w-[15%] h-[2rem] bg-slate-200 outline-none text-black rounded-md pl-4"
                  id="region"
                  onChange={(e) => setSearchPatient(e.target.value)}
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
              <div className="flex justify-end ">
                <button
                  onClick={() => setToggleModel(true)}
                  className="bg-blue-600 rounded-md px-4 py-2 text-white"
                >
                  ADD PATIENT
                </button>
              </div>
              {toggleModel && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
                  {addPatientLoader ? (
                    <Loader />
                  ) : (
                    <div className="w-[40%] max-w-lg bg-white p-6  rounded-md flex flex-col">
                      <h2 className="text-xl font-semibold text-center mb-4">
                        Add Patient
                      </h2>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Access Code
                          </label>
                          <div className="flex items-center border border-gray-300 rounded-md w-full h-10 px-3 py-2">
                            <h3 className="flex-grow">{accessCode}</h3>
                            <TbRefresh
                              className="text-gray-600 size-8 cursor-pointer"
                              onClick={() => generateAccessCode()}
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`mt-1 block w-full px-3 py-2 border ${
                              isEmailValid
                                ? "border-gray-300"
                                : "border-red-500"
                            } rounded-md`}
                            required
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="addRegion"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Select Region
                          </label>
                          <select
                            className="w-full h-[2rem]  rounded-md pl-4 outline-none"
                            value={formData.addRegion}
                            id="region"
                            name="addRegion"
                            onChange={handleChange}
                          >
                            <option value="All">All</option>
                            {showRegions?.map((region, index) => (
                              <option key={index} value={region?.region}>
                                {region?.region}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label
                            htmlFor="addTherapistName"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Select Therapist
                          </label>
                          <select
                            className="w-full h-[2rem]  rounded-md pl-4 outline-none"
                            value={formData.addTherapistName}
                            id="addTherapistName"
                            name="addTherapistName"
                            onChange={handleChange}
                          >
                            <option value="All">All</option>
                            {showTherapist?.map((region, index) => (
                              <option key={index} value={region?.name}>
                                {region?.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="flex justify-end mt-4">
                          <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                            disabled={addPatientLoader || !isFormValid()}
                          >
                            Submit
                          </button>
                          <button
                            type="button"
                            onClick={() => setToggleModel(false)}
                            className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
                          >
                            Close
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              )}
              <table className="w-full table-auto">
                <thead>
                  <tr className="h-10">
                    <th className="font-bold p-2 text-left">sr no</th>
                    <th className="font-bold p-2 text-left">Name</th>
                    <th className="font-bold p-2 text-left">Access</th>
                    <th className="font-bold p-2 text-left">Email</th>
                    <th className="font-bold p-2 text-left">Number</th>
                  </tr>
                </thead>
                <tbody>
                  {patientList.map((data, index) => (
                    <tr
                      key={data.id}
                      className="border-t cursor-pointer hover:bg-slate-200"
                      onClick={() => showPatientDetails(data?.id)}
                    >
                      <td className="p-2">{index + 1}</td>
                      <td className="p-2">{data.name}</td>
                      <td className="p-2">{data.accessCode}</td>
                      <td className="p-2">{data.email}</td>
                      <td className="p-2">{data.phone_number}</td>
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
