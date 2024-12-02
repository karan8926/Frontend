import React, { useEffect, useRef, useState } from "react";
import CardForAppointment from "../../components/CardForAppointment";
import Pagination from "../../components/Pagination";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { baseUrl } from "../../App";
import axios from "axios";

const AllAppointment = () => {
  const [availabilityData, setAvailabilityData] = useState([]);

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
  const [patientNumber,setPatientNumber] = useState(userDetails?.userPhone)
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

  const TherapistAvailability = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}api/getTherapistAvailability?status=none&specialty=${selectedSpecialty}&region=${selectedRegion}&date=${seletectedDateValue}`
      );
      console.log(response, "response from thera");
      setAvailabilityData(response.data.appointmentData);
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

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    if (selectedSpecialty || selectedRegion || seletectedDateValue) {
      TherapistAvailability();
    }
  }, [selectedSpecialty, selectedRegion, seletectedDateValue]);

  useEffect(() => {
    fetchDropdownData();
    const currentDate = new Date().toISOString().split("T")[0];
    setMinDate(currentDate);
  }, []);

  return (
    <div className="w-full h-screen flex ">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 bg-gray-100 p-6">
          <div className="w-full overflow-hidden ">
            <div className="w-full h-full">
              <div className="w-full h-8">
                <h1 className="text-black font-extrabold text-xl">
                  All Appointments
                </h1>
              </div>
              {/* search bar */}
              <div className="w-full p-2 space-x-4 flex items-center relative">
                <select
                  className="w-[15%] h-[2rem] bg-slate-300 rounded-md"
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                >
                  <option value="" disabled>
                    Region
                  </option>
                  {regions.map((region, index) => (
                    <option key={index} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
                {/* <select className="w-[15%] h-[2rem] bg-slate-300 rounded-sm">
                  <option value="" disabled selected>
                    Soonest Availability
                  </option>

                  <option value="12 hours">12 hours</option>
                  <option value="24 hours">24 hours</option>
                </select> */}
                <select
                  className="w-[15%] h-[2rem] bg-slate-300 rounded-md"
                  value={selectedSpecialty}
                  onChange={(e) => setSelectSpecialty(e.target.value)}
                >
                  <option value="" disabled>
                    Specialities
                  </option>
                  {specialty.map((specialty, index) => (
                    <option key={index} value={specialty}>
                      {specialty}
                    </option>
                  ))}
                </select>
                <input
                  type="date"
                  className="w-[15%] pl-4 pr-4 h-[2.3rem] bg-slate-300 text-black rounded-md  focus:outline-none focus:ring-2 focus:ring-slate-400 transition-all duration-300"
                  min={minDate}
                  onChange={(e) => setSelectedDateValue(e.target.value)}
                  value={seletectedDateValue}
                />

                <input
                  type="text"
                  placeholder="search"
                  className="w-[15%] h-[2.5rem] text-center border-2 rounded-md "
                />
              </div>

              {/* show cards here for book appointment */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 pt-4 max-h-[580px] overflow-y-auto">
                {availabilityData.map((item, index) => (
                  <CardForAppointment
                    key={item._id}
                    therapistsId={item.therapistsId}
                    name={item.name || ""}
                    date={new Date(item.date).toLocaleDateString()}
                    status={item.status || "Unknown"}
                    time={item.time || "Unspecified"}
                    userEmail={userEmail}
                    patientNumber={patientNumber}
                  />
                ))}
              </div>

              {/* pagination */}
              <Pagination />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllAppointment;
