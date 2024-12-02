import React, { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const AllAppointments = () => {
  const [appointments, setAppointments] = useState([
    {
      srNo: 1,
      name: "John Doe",
      date: "2024-12-01",
      time: "10:00 AM",
      status: "Confirmed",
    },
    {
      srNo: 2,
      name: "Jane Smith",
      date: "2024-12-02",
      time: "01:30 PM",
      status: "Pending",
    },
    {
      srNo: 3,
      name: "Michael Johnson",
      date: "2024-12-03",
      time: "11:00 AM",
      status: "Confirmed",
    },
    {
      srNo: 4,
      name: "Emily Davis",
      date: "2024-12-04",
      time: "02:15 PM",
      status: "Cancelled",
    },
    {
      srNo: 5,
      name: "Sarah Lee",
      date: "2024-12-05",
      time: "03:30 PM",
      status: "Confirmed",
    },
    {
      srNo: 6,
      name: "David Brown",
      date: "2024-12-06",
      time: "09:00 AM",
      status: "Pending",
    },
    {
      srNo: 7,
      name: "Olivia Green",
      date: "2024-12-07",
      time: "12:45 PM",
      status: "Confirmed",
    },
    {
      srNo: 8,
      name: "Liam White",
      date: "2024-12-08",
      time: "04:00 PM",
      status: "Cancelled",
    },
    {
      srNo: 9,
      name: "Ava Clark",
      date: "2024-12-09",
      time: "10:30 AM",
      status: "Confirmed",
    },
    {
      srNo: 10,
      name: "James Taylor",
      date: "2024-12-10",
      time: "02:00 PM",
      status: "Pending",
    },
  ]);
  const updateAppointmentStatus = async (appointmentId, newStatus) => {
    try {
      const response = await fetch("/api/updateAppointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ appointmentId, newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update appointment status");
      }

      return await response.json(); // If successful, return the updated data
    } catch (error) {
      console.error(error);
      alert("Error updating appointment status");
    }
  };
  const fetchAppointments = async () => {
    try {
      const response = await fetch("/api/getAppointments");
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments", error);
      alert("Error fetching appointments");
    }
  };
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-300";
      case "Confirmed":
        return "bg-green-300";
      case "Completed":
        return "bg-blue-300";
      case "Cancelled":
        return "bg-red-300";
      default:
        return "bg-gray-200";
    }
  };

  const handleStatusChange = async () => {
    if (!selectedAppointment || !newStatus) return;

    const updatedAppointment = { ...selectedAppointment, status: newStatus };

    // Optimistically update the UI with the new status
    const updatedAppointments = appointments.map((appointment) =>
      appointment.id === selectedAppointment.id
        ? { ...appointment, status: newStatus }
        : appointment
    );
    setAppointments(updatedAppointments);

    // Update status in the backend API
    const result = await updateAppointmentStatus(
      updatedAppointment.id,
      newStatus
    );
    if (result) {
      // If successful, close the modal
      setShowModal(false);
      alert("Status updated successfully");
    } else {
      alert("Failed to update status");
    }
  };

  // useEffect(() => {
  //   fetchAppointments();
  // }, []);
  return (
    <div className="w-full h-screen flex ">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 bg-gray-100 p-6">
          <div className="w-full overflow-hidden ">
            <div className="w-full h-[30%]  ">
              <div className="w-full h-8 ">
                <h1 className="font-bold text-3xl">Scheduled Appointments</h1>
              </div>
              <table className="w-full table-auto">
                <thead>
                  <tr className="h-10">
                    <th className="font-bold p-2 text-left">sr no</th>
                    <th className="font-bold p-2 text-left">Name</th>
                    <th className="font-bold p-2 text-left">Date</th>
                    <th className="font-bold p-2 text-left">Time</th>
                    <th className="font-bold p-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((data, index) => (
                    <tr key={index} className="border-t">
                      <td className="p-2">{data.srNo}</td>
                      <td className="p-2">{data.name}</td>
                      <td className="p-2">{data.date}</td>
                      <td className="p-2">{data.time}</td>
                      <td className="p-2">
                        {/* Status Label with background color and fixed width */}
                        <span
                          className={`p-2 text-white rounded ${getStatusColor(
                            data.status
                          )} w-32 text-center inline-block`}
                        >
                          {data.status}
                        </span>
                      </td>
                      <td className="p-2">
                        <button
                          onClick={() => {
                            setSelectedAppointment(data);
                            setNewStatus(data.status); // Default to current status
                            setShowModal(true); // Open the modal
                          }}
                          className="p-2 bg-blue-500 text-white rounded"
                        >
                          Update Status
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <Pagination />
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
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
                <option value="Confirmed">Confirmed</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => setShowModal(false)} 
                className="p-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleStatusChange} 
                className="p-2 bg-blue-500 text-white rounded"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllAppointments;
