import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import TherapistAndAdminLoggedin from "../components/TherapistAndAdminLoggedin";
import AllAppointment from "../pages/PatientDashboard/AllAppointment";
import MyAppointments from "../pages/PatientDashboard/MyAppointments";
import AllApointmentsAdmin from "../pages/AdminDashboard/AllApointmentsAdmin";
import PatientList from "../pages/AdminDashboard/PatientList";
import TherapistList from "../pages/AdminDashboard/TherapistList";
import AllAppointments from "../pages/TherapistDashboard/AllAppointments";
import TherapistAppointments from "../pages/TherapistDashboard/TherapistAppointments";

const AllRoutes = () => {
  // const [userType, setUserType] = useState("thera");
  return (
    <Routes>
      <Route path="/" element={<Signup />}></Route>
      <Route path="/signin" element={<Signin />}></Route>
      <Route
        path="/admin/allAppointment"
        element={<AllApointmentsAdmin />}
      ></Route>
      <Route path="/admin/patientsList" element={<PatientList />}></Route>
      <Route path="/admin/therapistList" element={<TherapistList />}></Route>

      {/* therapist */}
      <Route
        path="/therapist/allAppointment"
        element={<AllAppointments />}
      ></Route>
      <Route
        path="/therapist/myAppointmnet"
        element={<TherapistAppointments />}
      ></Route>

      {/* patient */}
      <Route
        path="/patient/allAppointment"
        element={<AllAppointment />}
      ></Route>
      <Route path="/patient/myAppointmnet" element={<MyAppointments />}></Route>
    </Routes>
  );
};

export default AllRoutes;
