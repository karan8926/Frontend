import React, { useEffect, useState } from "react";
import CardForAppointment from "../../components/CardForAppointment";
import Pagination from "../../components/Pagination";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { baseUrl } from "../../App";
import axios from "axios";


const AllAppointment = () => {
  // const dateVA = new Date();
  const [nameval, setName] = useState("adom");
  const [emailval, setEmail] = useState("adom12@gmail");
  const [dateval, setDate] = useState("28-nov-24");
  const [startDate, setStartDate] = useState(new Date());
  const [calenderView, setCalenderView] = useState(false);
  const [therapists, setTherapists] = useState([]);
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedTherapist, setSelectedTherapist] = useState("");

  console.log(startDate, "seleted date is");
  const currentDate = new Date();

  const fetchDropdownData = async () => {
    try {
      const response = await axios.get(`${baseUrl}api/getTherapistNameRegion`);
      if (response.data.success) {
        setTherapists(response.data.name || []);
        setRegions(response.data.region || []);
      }
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
    fetchDropdownData()
  }, [])

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
                  className="w-[15%] h-[2rem] bg-slate-300 rounded-sm"
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
                  className="w-[15%] h-[2rem] bg-slate-300 rounded-sm"
                  value={selectedTherapist}
                  onChange={(e) => setSelectedTherapist(e.target.value)}
                >
                  <option value="" disabled>
                    Therapist
                  </option>
                  {therapists.map((therapist, index) => (
                    <option key={index} value={therapist}>
                      {therapist}
                    </option>
                  ))}
                </select>
                {/* <button
                  className="w-[15%] h-[2rem] bg-slate-300 rounded-sm"
                  onClick={() => setCalenderView(!calenderView)}
                >
                  Calendar
                </button>

                {calenderView && (
                  <div className="absolute top-[3rem] left-0 z-10">
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => {
                        setStartDate(date);
                        setCalenderView(!calenderView);
                      }}
                      minDate={currentDate}
                    />
                  </div>
                )} */}

                <button
                  className="w-[15%] h-[2.5rem] bg-slate-500 text-white rounded-md hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-400 transition-all duration-300"
                  onClick={() => setCalenderView(!calenderView)}
                >
                  Calendar
                </button>

                {calenderView && (
                  <>
                    <div
                      className="fixed inset-0 bg-gray-500 bg-opacity-50 z-20"
                      onClick={() => setCalenderView(false)}
                    ></div>

                    <div className="fixed inset-0 flex justify-center items-center z-30">
                      <div className="w-[90%] sm:w-[350px] bg-white shadow-xl rounded-lg p-6">
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => {
                            setStartDate(date);
                            setCalenderView(false);
                          }}
                          minDate={currentDate}
                          calendarClassName="rounded-lg shadow-lg"
                          dayClassName={(date) =>
                            date.getDate() === startDate?.getDate()
                              ? "bg-blue-500 text-white"
                              : "text-gray-700"
                          }
                        />
                      </div>
                    </div>
                  </>
                )}
                <input
                  type="text"
                  placeholder="search"
                  className="w-[15%] h-[2.5rem] text-center border-2 rounded-md "
                />
              </div>

              {/* show cards here for book appointment */}
              <div className="flex flex-row flex-1 space-x-2 h-full pt-4">
                <CardForAppointment
                  name={nameval}
                  email={emailval}
                  date={dateval}
                />
                <CardForAppointment
                  name={nameval}
                  email={emailval}
                  date={dateval}
                />
                <CardForAppointment
                  name={nameval}
                  email={emailval}
                  date={dateval}
                />
                <CardForAppointment
                  name={nameval}
                  email={emailval}
                  date={dateval}
                />
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
