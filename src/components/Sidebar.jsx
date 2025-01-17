import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const userDetails = JSON.parse(sessionStorage.getItem("userDetails"));
  const [userType, setUserType] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (userDetails === null) {
      if (location.pathname.split("/")[1] === "admin") {
        navigate("/signin");
        window.location.reload();
      } else {
        navigate("/patient/signin");
        window.location.reload();
      }
    }
    setUserType(userDetails.userType);
  }, []);
  const menulist = {
    patient: [
      {
        label: "All Appointment",
        path: "/patient/allAppointment",
      },
      {
        label: "My Appointment",
        path: "/patient/myAppointmnet",
      },
    ],
    therapist: [
      {
        label: "Scheduled Appointment",
        path: "/therapist/allAppointment",
      },
      {
        label: "My Appointment",
        path: "/therapist/myAppointmnet",
      },
      {
        label: "Manage Availability",
        path: "/therapist/manageAvailability",
      },
    ],

    admin: [
      {
        label: "All Appointment",
        path: "/admin/allAppointment",
      },
      {
        label: "Patient",
        path: "/admin/patientsList",
      },
      {
        label: "Therapist",
        path: "/admin/therapistList",
      },
    ],
  };

  const userMenuItems = menulist[userType] || [];

  const handleMenuItemClick = (e, path) => {
    e.preventDefault();
    setActiveItem(path);
    navigate(path);
  };
  useEffect(() => {
    // Set the active item based on the current path
    setActiveItem(location.pathname);
  }, [location]);

  return (
    <div className="w-[15%] border-2 border-gray-300 h-full">
      <div className="w-full h-[6rem] border-2 border-gray-200 p-8 ">
        <h1 className="font-bold text-xl">Schedule</h1>
      </div>
      <div className="p-4 space-y-8">
        {userMenuItems.map((item, index) => (
          <div
            key={index}
            onClick={(e) => handleMenuItemClick(e, item.path)} // Call the click handler with the path
            className={`w-full h-[4rem] p-4 rounded-lg cursor-pointer 
              ${
                activeItem === item.path
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300"
              }
              hover:bg-blue-100`}
          >
            <h3>{item.label}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
