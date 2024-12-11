import React, { useEffect, useRef, useState } from "react";
import { baseUrl } from "../../App";
import axios from "axios";
import { toast } from "react-toastify";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { TiTick } from "react-icons/ti";
import { addDays } from "date-fns";
import Pagination from "../../components/Pagination";
import PatientDashboardCalendar from "../../components/PatientDashboardCalendar";
import Loader from "../../components/Loader";
const AllAppointment = () => {
  const [availabilityData, setAvailabilityData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [startDate, setStartDate] = useState(new Date());
  const [calenderView, setCalenderView] = useState(false);
  const [specialty, setSpecialty] = useState([]);
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedTherapist, setSelectedTherapist] = useState("");
  const [minDate, setMinDate] = useState("");
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const userEmail = userDetails?.userEmail;
  const [selectedSpecialty, setSelectSpecialty] = useState("");
  const [seletectedDateValue, setSelectedDateValue] = useState("");
  const [patientNumber, setPatientNumber] = useState(userDetails?.userPhone);
  const [isLoading, setIsLoading] = useState(false);
  const [dataFound, setDataFound] = useState(false);
  const [toggleModel, setToggleModel] = useState("");

  const currentDate = new Date();
  const hasMounted = useRef(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonthData, setCurrentMonthData] = useState(
    currentDate.getMonth()
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedData, setSelectedData] = useState(null);
  const [appointmentType, setAppointmentType] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPhoneValid, setIsPhoneValid] = useState(true);

  function dayDate(timestamp) {
    const date = new Date(timestamp);
    const day = date.toLocaleString("en-US", { weekday: "long" });
    const month = date.toLocaleString("en-US", { month: "long" });
    const dayOfMonth = date.getDate();
    const year = date.getFullYear();

    return (
      day.slice(0, 3) + "," + month.slice(0, 3) + " " + dayOfMonth + "," + year
    );
  }

  const fetchDropdownData = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}api/getTherapistSpecialtyRegion`
      );
      console.log(response, "response data value");
      if (response.data.success) {
        setSpecialty(response.data.specialty || []);
        setRegions(response.data.region || []);
      }
    } catch (error) {
      console.error("Error fetching dropdown data:", error);
    }
  };

  const TherapistAvailability = async (pageNo) => {
    setIsLoading(true);
    setAvailabilityData(null);
    console.log(
      {
        selectedSpecialty,
        selectedRegion,
        seletectedDateValue,
        currentMonth,
        selectedDate,
      },
      "abcdnlnlnlnl99090"
    );
    try {
      const response = await axios.get(
        `${baseUrl}api/getTherapistAvailability?status=none&specialty=${selectedSpecialty}&region=${selectedRegion}&date=${
          selectedDate !== null ? selectedDate : " "
        }&pageNo=${pageNo}&currentMonth=${currentMonth}&appointmentType=${appointmentType}`
      );
      console.log(response.data.appointmentData, "response from thera");
      setAvailabilityData(response.data.appointmentData);
      setTotalPages(response.data.totalPages);
      setIsLoading(false);
      setDataFound(response.data.appointmentData.length === 0);
    } catch (error) {
      console.error("Error fetching dropdown data:", error);
    }
  };

  function searchButton() {
    if (selectedRegion || appointmentType) {
      TherapistAvailability(currentPage);
    } else {
      toast.error("Add key to Search Data");
    }
  }
  useEffect(() => {
    fetchDropdownData();
    const currentDate = new Date().toISOString().split("T")[0];
    setMinDate(currentDate);
    TherapistAvailability(currentPage);
  }, [selectedDate, currentMonth]);

  const handlePageChange = (pageNo) => {
    if (pageNo >= 1 && pageNo <= totalPages) {
      TherapistAvailability(pageNo);
      setCurrentPage(pageNo);
    }
  };

  const handleDateSelect = (date) => {
    console.log(date, "date is---------=============");
    setSelectedDate(date);
  };

  function showMonth(month) {
    console.log(month, "month999999999999999999999999999");
    const monthVal = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthVal[(month + 12) % 12];
  }

  function handleChange(e) {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === "email") {
      validateEmail(value);
    } else if (name === "phone") {
      validatePhone(value);
    }
  }
  async function handleBookAppointment(e) {
    e.preventDefault();
    console.log(formData, "formData");
    setIsLoading(true);
    try {
      const requestBody = {
        therapistsId: selectedData.therapistsId,
        date: selectedData.date,
        time: selectedData.time,
        patientEmail: userEmail,
        patientNumber: patientNumber,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      };
      console.log(requestBody, "request body");
      const response = await axios.post(
        `${baseUrl}api/book-appointment`,
        requestBody
      );
      if (response.status === 200) {
        toast.success("Appointment booked successfully!");
      } else {
        toast.error("Failed to book the appointment.");
      }
      setFormData({
        name: "",
        email: "",
        phone: "",
      });
      setIsLoading(false);
      TherapistAvailability(currentPage);
      setToggleModel(false);
    } catch (error) {
      toast.error(error);
    }
  }

  // form Validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(email));
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/; // Example: Validate 10 digits
    setIsPhoneValid(phoneRegex.test(phone));
  };

  const isFormValid = () => {
    // Form is valid if both email and phone are valid
    return isEmailValid && isPhoneValid;
  };
  return (
    <div className="w-full h-screen flex ">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 bg-gray-100 p-6">
          <div className="w-full overflow-hidden ">
            <div className="w-full h-full">
              <div className="w-full h-8  ">
                <h1 className="text-gray-600 font-extrabold text-4xl">
                  Schedule Appointment For :
                </h1>
              </div>
              <div className="w-full p-2 flex items-center space-x-4 ">
                <select
                  className="w-[15%] h-[2rem] bg-slate-300 rounded-md pl-4"
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                >
                  <option value="" disabled>
                    Region
                  </option>
                  <option value=" ">All</option>
                  {regions?.map((region, index) => (
                    <option key={index} value={region}>
                      {region}
                    </option>
                  ))}
                </select>

                <select
                  id="appointmentType"
                  name="appointmentType"
                  value={appointmentType}
                  onChange={(e) => setAppointmentType(e.target.value)}
                  className="w-[15%] h-[2rem] bg-slate-300 rounded-md pl-4"
                >
                  <option value="" disabled>
                    Appointment Type
                  </option>
                  <option value=" ">All</option>
                  <option value="Consultation(45min)">
                    Consultation (45min)
                  </option>
                  <option value="Follow-up(30min)">Follow-up (30min)</option>
                </select>
                <div className="flex justify-end">
                  <button
                    onClick={() => searchButton()}
                    className="ml-auto h-[2.5rem] bg-blue-500 text-white rounded-md px-4"
                  >
                    Search
                  </button>
                </div>
              </div>
              <div className="w-full mb-[2rem]  flex">
                <div className="w-[35%]   h-auto">
                  <h2 className="font-medium text-center text-gray-600 text-xl">
                    All Appointments In :
                  </h2>
                  <div className="space-x-2 w-full text-center mt-6  h-auto">
                    <button
                      onClick={() =>
                        setCurrentMonth((prev) => addDays(prev, -30))
                      }
                      className="w-[30%]   bg-purple-800 text-white text-lg h-12 rounded-md"
                    >
                      {showMonth(currentMonth.getMonth() - 1)}
                    </button>
                    <button className="w-[30%]  bg-green-300 text-black text-lg h-12 rounded-md">
                      {showMonth(currentMonth.getMonth())}
                    </button>
                    <button
                      onClick={() =>
                        setCurrentMonth((prev) => addDays(prev, 30))
                      }
                      className="w-[30%]  bg-purple-800 text-white text-lg h-12 rounded-md"
                    >
                      {showMonth(currentMonth.getMonth() + 1)}
                    </button>
                  </div>
                  <h3 className="font-medium text-center text-gray-600 text-xl p-4">
                    Or Select Date:
                  </h3>
                  <div>
                    <PatientDashboardCalendar
                      selectedDate={selectedDate}
                      onDateSelect={handleDateSelect}
                      currentMonth={currentMonth}
                      setCurrentMonth={setCurrentMonth}
                    />
                  </div>
                </div>

                {/* right */}
                <div className="w-[65%] pl-[3rem] ">
                  <h2 className="font-medium text-center text-gray-600 text-xl">
                    All Times in{" "}
                    <span className="font-semibold text-gray-800 text-xl">
                      America
                    </span>{" "}
                    Timezone
                  </h2>
                  <div className="mt-2 h-[32rem]">
                    <table className="table-auto w-full">
                      <thead>
                        <tr className="h-10 text-lg">
                          <th className="font-bold p-4 pl-[2rem] w-[30%] text-left">
                            Date
                          </th>
                          <th className="font-bold p-4 text-left w-[20%]">
                            Time
                          </th>
                          <th className="font-bold p-4 text-left w-[25%]">
                            Length
                          </th>
                          <th className="font-bold p-4 text-left"></th>
                        </tr>
                      </thead>
                    </table>
                    <div className="overflow-y-auto h-[32rem]">
                      <table className="table-auto w-full">
                        <tbody>
                          {isLoading && <Loader />}
                          {availabilityData && !isLoading ? (
                            availabilityData.length > 0 ? (
                              availabilityData?.map((data, index) => (
                                <tr
                                  key={index}
                                  className="border-2 odd:bg-gray-200 text-lg"
                                >
                                  <td className="font-normal p-4 pl-[2rem] w-[30%]">
                                    {dayDate(data?.date)}
                                  </td>
                                  <td className="font-normal p-4 w-[20%]">
                                    {data?.time}
                                  </td>
                                  <td className="font-normal p-4 w-[25%]">
                                    {data?.appointmentType}
                                  </td>
                                  <td
                                    className="font-normal p-4 pr-[4rem] w-[25%] "
                                    onClick={() => {
                                      setToggleModel(true),
                                        setSelectedData({
                                          date: data?.date,
                                          time: data?.time,
                                          therapistsId:
                                            data?.therapistDetails[0]._id,
                                        });
                                    }}
                                  >
                                    <button className="bg-green-300 flex items-center w-full p-4 rounded-md text-gray-700 h-10">
                                      <TiTick />
                                      Select
                                    </button>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <h1 className="text-center">No data Available</h1>
                            )
                          ) : null}

                          <tr></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </div>

        {toggleModel && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            {isLoading ? (
              <Loader />
            ) : (
              <div className="w-[40%] max-w-lg bg-white p-6 rounded-md flex flex-col">
                <h2 className="text-xl font-semibold text-center ">
                  Book Appointment
                </h2>

                <form onSubmit={handleBookAppointment} className="space-y-4">
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
                      htmlFor="name"
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
                        isEmailValid ? "border-gray-300" : "border-red-500"
                      } rounded-md`}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone
                    </label>
                    <input
                      type="number"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`mt-1 block w-full px-3 py-2 border ${
                        isPhoneValid ? "border-gray-300" : "border-red-500"
                      } rounded-md`}
                    />
                  </div>
                  <div className="flex justify-end mt-4">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                      disabled={isLoading || !isFormValid()}
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
      </div>
    </div>
  );
};

export default AllAppointment;
