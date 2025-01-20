import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import AvailabilityCalendar from "../../components/AvailabilityCalendar";
import axios from "axios";
import { baseUrl } from "../../App";
import { toast } from "react-toastify";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useDisableButton from "../../hooks/useDisableButton";

const ManageAvailability = () => {
  const { isDisableButton, handleButtonDisability, handleResetButton } =
    useDisableButton();
  const [toggleModel, setToggleModel] = useState(false);
  const [minDate, setMinDate] = useState("");
  const [eventListData, setEventListData] = useState([]);
  const userDetails = JSON.parse(sessionStorage.getItem("userDetails"));
  const userId = userDetails.userId;
  const [formData, setFormData] = useState({
    availability: "",
    startTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    therapistId: userId,
  });
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function formateDateTime(startTime) {
    const year = startTime.getFullYear();
    const month = String(startTime.getMonth() + 1).padStart(2, "0");
    const day = String(startTime.getDate()).padStart(2, "0");
    const hours = String(startTime.getHours()).padStart(2, "0");
    const minutes = String(startTime.getMinutes()).padStart(2, "0");
    const seconds = String(startTime.getSeconds()).padStart(2, "0");
    const milliseconds = String(startTime.getMilliseconds()).padStart(3, "0");

    const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
    return formattedDateTime;
  }
  async function handleSubmit(e) {
    e.preventDefault();
    handleButtonDisability();
    const { startTime, endTime, availability, therapistId } = formData;
    try {
      const response = await axios.post(
        `${baseUrl}api/addCalendarAvailability`,
        {
          startTime: formateDateTime(startTime),
          endTime: formateDateTime(endTime),
          availability,
          therapistId,
        }
      );
      setFormData({
        availability: "",
        startTime: "",
        endTime: "",
      });
      setToggleModel(false);
      getCalendarData();
      toast.success("Availbility Added Successfully");
    } catch (error) {
      toast.error(error);
    }
    handleResetButton();
  }
  async function getCalendarData() {
    try {
      const response = await axios.get(
        `${baseUrl}api/getCalendarAvailabilityById?therapistId=${userId}`
      );
      // const {title,start,end}=
      const mappedData = response?.data?.data.map((data) => ({
        title: data.availability,
        start: moment(data.startTime).toDate(),
        end: moment(data.endTime).toDate(),
      }));
      setEventListData(mappedData);
    } catch (error) {
      toast.error(error);
    }
  }
  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];
    const formattedTime = currentDate
      .toISOString()
      .split("T")[1]
      .substring(0, 5); // Get HH:mm
    setMinDate(`${formattedDate}T${formattedTime}`);

    getCalendarData();
  }, []);
  return (
    <div className="w-full h-screen flex ">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 bg-gray-100 p-6">
          <div className="w-full overflow-hidden ">
            <div className="w-full h-[30%]  ">
              <div className="w-full h-8 mb-14 justify-between">
                <div>
                  <h1 className="font-bold text-3xl">Manage Availability</h1>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => setToggleModel(true)}
                    className="bg-blue-600 rounded-md px-4 py-2 text-white"
                  >
                    Add Availability
                  </button>
                </div>
              </div>
              {toggleModel && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
                  <div className="w-[40%] max-w-lg bg-white p-6 rounded-md flex flex-col">
                    <h2 className="text-xl font-semibold text-center mb-4">
                      Add Availability
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label
                          htmlFor="availability"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Availability
                        </label>

                        <select
                          value={formData.availability}
                          name="availability"
                          onChange={handleChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        >
                          <option value="">Select Availability</option>
                          <option value="Available">Available</option>
                          <option value="NotAvailable">Not Available</option>
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="startTime"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Start Date and Time:
                        </label>
                        {/* <input
                          type="datetime-local"
                          id="startTime"
                          name="startTime"
                          min={minDate}
                          value={formData.startTime}
                          onChange={handleChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        /> */}
                        <DatePicker
                          selected={new Date(formData.startTime)}
                          onChange={(date) =>
                            setFormData({ ...formData, startTime: date })
                          }
                          showTimeSelect
                          dateFormat="Pp"
                          timeIntervals={60}
                          minDate={new Date()}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="endTime"
                          className="block text-sm font-medium text-gray-700"
                        >
                          End Date and Time:
                        </label>
                        {/* <input
                          type="datetime-local"
                          id="endTime"
                          name="endTime"
                          min={minDate}
                          value={formData.endTime}
                          onChange={handleChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        /> */}
                        <DatePicker
                          selected={new Date(formData.endTime)}
                          onChange={(date) =>
                            setFormData({ ...formData, endTime: date })
                          }
                          showTimeSelect
                          dateFormat="Pp"
                          timeIntervals={60}
                          minDate={new Date()}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md "
                        />
                      </div>
                      <div className="flex justify-end mt-4">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                          disabled={isDisableButton}
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
              <div className="">
                <AvailabilityCalendar eventListData={eventListData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageAvailability;
