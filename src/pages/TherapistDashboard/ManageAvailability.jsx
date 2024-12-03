import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import AvailabilityCalendar from "../../components/AvailabilityCalendar";

const ManageAvailability = () => {
  const [toggleModel, setToggleModel] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    startTime: "",
    endTime: "",
  });
  function handleChange() {}
  function handleSubmit() {
    console.log("add");
  }
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
                      CREATE APPOINTMENT
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label
                          htmlFor="availableDate"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Available Date
                        </label>
                        <input
                          type="date"
                          id="availableDate"
                          name="availableDate"
                          value={formData.availableDate}
                          onChange={handleChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="timeSlot"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Available Time Slots
                        </label>
                        <input
                          type="time"
                          id="timeSlot"
                          name="timeSlot"
                          value={formData.timeSlot}
                          onChange={handleChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="appointmentType"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Appointment Type
                        </label>
                        <select
                          id="appointmentType"
                          name="appointmentType"
                          value={formData.appointmentType}
                          onChange={handleChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        >
                          <option value="Consultation(45min)">
                            Consultation (45min)
                          </option>
                          <option value="Follow-up(30min)">
                            Follow-up (30min)
                          </option>
                        </select>
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
              <div className="">
                <AvailabilityCalendar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageAvailability;
