import React, { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { baseUrl } from "../../App";
import { toast } from "react-toastify";

const TherapistAppointments = () => {
  const therapistDetails = JSON.parse(localStorage.getItem("userDetails"));
  console.log(therapistDetails, "ther data=33333333333333333333");
  const [toggleModel, setToggleModel] = useState(false);
  const [email, setEmail] = useState(therapistDetails.userEmail);
  const [userId, setUserId] = useState(therapistDetails.userId);
  const [appointments, setAppointments] = useState([]);
  const [formData, setFormData] = useState({
    availableDate: "",
    timeSlot: "",
    // name: "",
    // email: "",
    appointmentType: "setup",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(email, "email da data");
      const { availableDate, timeSlot, appointmentType, specialty } = formData;
      const data = await axios.post(`${baseUrl}api/AddTherapistAvailability`, {
        email: email,
        date: availableDate,
        time: timeSlot,
        appointmentType,
        specialty,
      });
      toast.success("Appointment Added SuccessFully");
    } catch (error) {
      console.log(error, "error");
    }

    console.log(formData);
    setToggleModel(false);
  };
  function DateTime(data) {
    const date = new Date(data);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() is zero-based, so add 1
    const day = String(date.getDate()).padStart(2, "0");

    return `${month}/${day}/${year}`;
  }
  const getTherapistData = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}api/getTherapistAvailability?therapistsId=${userId}`
      );
      console.log(response, "reponse are:----");
      setAppointments(response.data.appointmentData);
    } catch (err) {
      console.log(err);
      toast.error("Error while Fetching Data");
    }
  };
  // const appointments = [
  //   {
  //     srNo: 1,
  //     name: "Alice Green",
  //     email: "alice.green@example.com",
  //     date: "2024-12-01",
  //     timeSlot: "10:00 AM",
  //     appointmentType: "Consultation",
  //   },
  //   {
  //     srNo: 2,
  //     name: "Bob White",
  //     email: "bob.white@example.com",
  //     date: "2024-12-02",
  //     timeSlot: "01:30 PM",
  //     appointmentType: "Follow-up",
  //   },
  //   {
  //     srNo: 3,
  //     name: "Charlie Brown",
  //     email: "charlie.brown@example.com",
  //     date: "2024-12-03",
  //     timeSlot: "11:00 AM",
  //     appointmentType: "Consultation",
  //   },
  //   {
  //     srNo: 4,
  //     name: "Daisy Blue",
  //     email: "daisy.blue@example.com",
  //     date: "2024-12-04",
  //     timeSlot: "02:15 PM",
  //     appointmentType: "Consultation",
  //   },
  //   {
  //     srNo: 5,
  //     name: "Ethan Black",
  //     email: "ethan.black@example.com",
  //     date: "2024-12-05",
  //     timeSlot: "03:30 PM",
  //     appointmentType: "Consultation",
  //   },
  //   {
  //     srNo: 6,
  //     name: "Fiona Pink",
  //     email: "fiona.pink@example.com",
  //     date: "2024-12-06",
  //     timeSlot: "09:00 AM",
  //     appointmentType: "Consultation",
  //   },
  //   {
  //     srNo: 7,
  //     name: "Greg Yellow",
  //     email: "greg.yellow@example.com",
  //     date: "2024-12-07",
  //     timeSlot: "12:45 PM",
  //     appointmentType: "Consultation",
  //   },
  //   {
  //     srNo: 8,
  //     name: "Hannah Red",
  //     email: "hannah.red@example.com",
  //     date: "2024-12-08",
  //     timeSlot: "04:00 PM",
  //     appointmentType: "Follow-up",
  //   },
  //   {
  //     srNo: 9,
  //     name: "Ian Purple",
  //     email: "ian.purple@example.com",
  //     date: "2024-12-09",
  //     timeSlot: "10:30 AM",
  //     appointmentType: "Consultation",
  //   },
  //   {
  //     srNo: 10,
  //     name: "Julia Orange",
  //     email: "julia.orange@example.com",
  //     date: "2024-12-10",
  //     timeSlot: "02:00 PM",
  //     appointmentType: "Consultation",
  //   },
  // ];

  useEffect(() => {
    getTherapistData();
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
  return (
    <div className="w-full h-screen flex ">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 bg-gray-100 p-6">
          <div className="w-full overflow-hidden ">
            <div className="w-full h-[30%]  ">
              <div className="flex flex-grow">
                <h1 className="font-bold text-3xl">Appointment List</h1>
              </div>
              <div className="flex justify-end ">
                <button
                  onClick={() => setToggleModel(true)}
                  className="bg-blue-600 rounded-md px-4 py-2 text-white"
                >
                  CREATE APPOINTMENT
                </button>
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

                      {/* <div>
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
                      </div> */}

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
                    <th className="font-bold p-2 text-left">Date</th>
                    <th className="font-bold p-2 text-left">Time Slot</th>
                    <th className="font-bold p-2 text-left">
                      Appointment Type
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((data, index) => (
                    <tr key={index} className="border-t">
                      <td className="p-2">{index + 1}</td>
                      <td className="p-2">{data.therapistDetails[0].name}</td>
                      <td className="p-2">{data.therapistDetails[0].email}</td>
                      <td className="p-2">{DateTime(data.date)}</td>
                      <td className="p-2">
                        {data.time}-
                        {timeSlotFunction(data.time, data.appointmentType)}
                      </td>
                      <td className="p-2">{data.appointmentType}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <Pagination />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TherapistAppointments;
