import React, { useEffect, useRef, useState } from "react";
import CardForAppointment from "../../components/CardForAppointment";
import Pagination from "../../components/Pagination";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { baseUrl } from "../../App";
import axios from "axios";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";

const AllAppointment = () => {
  const [availabilityData, setAvailabilityData] = useState(null);
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
  console.log(startDate, "seleted date is");
  const currentDate = new Date();
  const hasMounted = useRef(false);

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
      { selectedSpecialty, selectedRegion, seletectedDateValue },
      "abcdnlnlnlnl99090"
    );
    try {
      const response = await axios.get(
        `${baseUrl}api/getTherapistAvailability?status=none&specialty=${selectedSpecialty}&region=${selectedRegion}&date=${seletectedDateValue}&pageNo=${pageNo}`
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

  // Function to format the date
  const formatDate = (date) => {
    if (!date) return "Select Date"; // Default text if no date is selected
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options); // Format as "Month Day, Year"
  };

  // useEffect(() => {
  //   if (!hasMounted.current) {
  //     hasMounted.current = true;
  //     return;
  //   }

  //   if (selectedSpecialty || selectedRegion || seletectedDateValue) {
  //     TherapistAvailability();
  //   }
  // }, [selectedSpecialty, selectedRegion, seletectedDateValue]);

  function searchButton() {
    if (selectedSpecialty || selectedRegion || seletectedDateValue) {
      TherapistAvailability(currentPage);
    } else {
      toast.error("Add key to Search Data");
    }
  }
  useEffect(() => {
    fetchDropdownData();
    const currentDate = new Date().toISOString().split("T")[0];
    setMinDate(currentDate);
  }, []);

  const handlePageChange = (pageNo) => {
    if (pageNo >= 1 && pageNo <= totalPages) {
      TherapistAvailability(pageNo);
      setCurrentPage(pageNo);
    }
  };

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
  return (
    <div className="w-full h-screen flex ">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 bg-gray-100 p-6">
          <div className="w-full overflow-hidden ">
            <div className="w-full h-full">
              <div className="w-full h-8 ">
                <h1 className="text-black font-extrabold text-xl">
                  All Appointments
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
                  className="w-[15%] h-[2rem] bg-slate-300 rounded-md pl-4"
                  value={selectedSpecialty}
                  onChange={(e) => setSelectSpecialty(e.target.value)}
                >
                  <option value="" disabled>
                    Specialities
                  </option>
                  <option value=" ">All</option>

                  {specialty?.map((specialty, index) => (
                    <option key={index} value={specialty}>
                      {specialty}
                    </option>
                  ))}
                </select>

                <input
                  type="date"
                  className="w-[15%] pl-4 pr-4 h-[2.3rem] bg-slate-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400 transition-all duration-300"
                  min={minDate}
                  onChange={(e) => setSelectedDateValue(e.target.value)}
                  value={seletectedDateValue}
                />

                <div className="flex justify-end">
                  <button
                    onClick={() => searchButton()}
                    className="ml-auto h-[2.5rem] bg-blue-500 text-white rounded-md px-4"
                  >
                    Search
                  </button>
                </div>
              </div>

              {/* show cards here for book appointment */}
              {isLoading && <Loader />}
              {availabilityData && !isLoading ? (
                availabilityData.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 pt-4 max-h-[580px] overflow-y-auto flex-wrap">
                    {availabilityData?.map((item, index) => (
                      <CardForAppointment
                        key={item._id}
                        therapistsId={item.therapistsId}
                        name={item.therapistDetails[0].name || ""}
                        date={item.date}
                        status={item.status || "Unknown"}
                        startTime={item.time}
                        endTime={timeSlotFunction(
                          item.time,
                          item.appointmentType
                        )}
                        region={item?.therapistDetails[0]?.region}
                        therapistEmail={item?.therapistDetails[0]?.email}
                        userEmail={userEmail}
                        patientNumber={patientNumber}
                        specialty={item?.therapistDetails[0]?.specialty}
                      />
                    ))}
                  </div>
                ) : (
                  <div>
                    <h1>Data is Not Available</h1>
                  </div>
                )
              ) : null}

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

export default AllAppointment;
