import React, { useState, useEffect } from "react";
import Pagination from "../../components/Pagination";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../../App";
import { useNavigate } from "react-router-dom";

const TherapistList = () => {
  const navigate = useNavigate();
  const [toggleModel, setToggleModel] = useState(false);
  const [therapistList, setTherapistList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalNoOfTherapist, setTotalTherapist] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    region: "",
    name: "",
    specialty: "",
    number: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // post api add therapist here
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    try {
      const therapistData = await axios.post(
        `${baseUrl}api/AddTherapist`,
        formData
      );
      console.log("therapistData", therapistData);
      setToggleModel(false);
      toast.success("Therapist added successfully");
    } catch (error) {
      toast.error(error.response.data.error, "failed to add");
      console.log(error, "error value");
      setToggleModel(true);
    }
    fetchData(searchTherapist, currentPage);
    setFormData({
      region: "",
      name: "",
      number: "",
      email: "",
      password: "",
    });
  };

  const handlePageChange = (pageNo) => {
    if (pageNo >= 1 && pageNo <= totalPages) {
      fetchData(searchTherapist, pageNo);
      setCurrentPage(pageNo);
    }
  };
  const fetchData = async (searchTherapist, pageNo) => {
    try {
      const response = await axios.get(
        `${baseUrl}api/getTherapist/?pageNo=${pageNo}&searchTherapist=${searchTherapist}`
      );
      // console.log("response--", response.data.availability)
      setTherapistList(response.data.availability);
      setTotalPages(response.data.noOfPages);
    } catch (err) {
      console.log(err);
      toast.error("Error while Fetching Data");
    }
  };

  useEffect(() => {
    fetchData(searchTherapist, currentPage);
  }, [currentPage]);

  function showTherapistDetails(id) {
    navigate(`/admin/therapistDetails/${id}`);
    console.log(id, "abcd");
  }

  function manageAvailability(id) {
    navigate("/admin/manageAvailability", { state: { id } });
  }

  const [searchTherapist, setSearchTherapist] = useState("");
  const handleSearch = (e) => {
    setSearchTherapist((prev) => {
      return e.target.value;
    });
    fetchData(e.target.value, currentPage);
    // console.log(searchPatient, "patient");
  };
  return (
    <div className="w-full h-screen flex ">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 bg-gray-100 p-6">
          <div className="w-full overflow-hidden ">
            <div className="w-full h-[30%]  ">
              <div className="flex flex-grow">
                <h1 className="font-bold text-3xl">Therapist</h1>
              </div>
              <div className="w-full flex justify-between">
                <div className="w-full p-2 flex items-center space-x-4 ">
                  <label htmlFor="region" className="text-black font-bold">
                    Search Therapist
                  </label>
                  <input
                    className="w-[15%] h-[2rem] bg-slate-200 outline-none text-black rounded-md pl-4"
                    id="region"
                    onChange={handleSearch}
                  ></input>
                </div>
                <div className="">
                  <button
                    onClick={() => setToggleModel(true)}
                    className="bg-blue-600 rounded-md px-4 py-2 text-white"
                  >
                    ADD
                  </button>
                </div>
              </div>
              {toggleModel && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
                  <div className="w-[40%] max-w-lg bg-white p-6  rounded-md flex flex-col">
                    <h2 className="text-xl font-semibold text-center mb-4">
                      Add Therapist
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label
                          htmlFor="region"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Region
                        </label>
                        <select
                          id="region"
                          name="region"
                          value={formData.region}
                          onChange={handleChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        >
                          <option value="">Select</option>
                          <option value="Northeast">Northeast</option>
                          <option value="Midwest">Midwest</option>
                          <option value="South">South</option>
                          <option value="West">West</option>
                          <option value="Southeast">Southeast</option>
                          <option value="PacificNorthwest">
                            Pacific Northwest
                          </option>
                          <option value="GreatPlains">Great Plains</option>
                          <option value="RockyMountainRegion">
                            Rocky Mountain Region
                          </option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="specialty"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Specialty
                        </label>
                        <select
                          id="specialty"
                          name="specialty"
                          value={formData.specialty}
                          onChange={handleChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        >
                          <option value="">Select</option>
                          <option value="CognitiveBehavioralTherapy(CBT)">
                            Cognitive Behavioral Therapy (CBT)
                          </option>
                          <option value="TraumaTherapy">Trauma Therapy</option>
                          <option value="MarriageandFamilyTherapy(MFT)">
                            Marriage and Family Therapy (MFT)
                          </option>
                          <option value="BehaviorTherapy(DBT)">
                            Behavior Therapy (DBT)
                          </option>
                        </select>
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
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="number"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="number"
                          name="number"
                          value={formData.number}
                          onChange={handleChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="flex justify-end mt-4">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
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
                </div>
              )}
              <table className="w-full table-auto">
                <thead>
                  <tr className="h-10">
                    <th className="font-bold p-2 text-left">sr no</th>
                    <th className="font-bold p-2 text-left">Name</th>
                    <th className="font-bold p-2 text-left">Email</th>
                    <th className="font-bold p-2 text-left">Specialty</th>
                    <th className="font-bold p-2 text-left">Phone</th>
                    <th className="font-bold p-2 text-left">Region</th>
                  </tr>
                </thead>
                <tbody>
                  {therapistList.map((data, index) => (
                    <tr
                      key={data._id}
                      className="border-t cursor-pointer hover:bg-slate-200"
                    >
                      <td
                        className="p-2"
                        onClick={() => showTherapistDetails(data._id)}
                      >
                        {index + 1}
                      </td>
                      <td
                        className="p-2"
                        onClick={() => showTherapistDetails(data._id)}
                      >
                        {data.name}
                      </td>
                      <td
                        className="p-2"
                        onClick={() => showTherapistDetails(data._id)}
                      >
                        {data.email}
                      </td>
                      <td
                        className="p-2"
                        onClick={() => showTherapistDetails(data._id)}
                      >
                        {data.specialty}
                      </td>
                      <td
                        className="p-2"
                        onClick={() => showTherapistDetails(data._id)}
                      >
                        {data.number}
                      </td>
                      <td
                        className="p-2"
                        onClick={() => showTherapistDetails(data._id)}
                      >
                        {data.region}
                      </td>
                      <td
                        className="p-2"
                        onClick={() => manageAvailability(data._id)}
                      >
                        <button className="bg-blue-500 text-white rounded-md p-[0.4rem]">
                          Manage Availability
                        </button>
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

export default TherapistList;
