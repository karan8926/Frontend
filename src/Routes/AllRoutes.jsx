import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
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
import AvailabilityCalendar from "../components/AvailabilityCalendar";
import ManageAvailability from "../pages/TherapistDashboard/ManageAvailability";
import PatientDetails from "../pages/AdminDashboard/PatientDetails";
import TherapistDetails from "../pages/AdminDashboard/TherapistDetails";
import Profile from "../pages/Profile";
import PatientSigninPage from "../pages/PatientSigninPage";
import ManageAvailabilityByAdmin from "../components/ManageAvailabilityByAdmin";
const AllRoutes = () => {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  const [userType, setUserType] = useState(userDetails?.userType);

  return (
    <Routes>
      <Route path="/" element={<Signup />}></Route>
      {/* different signin routing */}

      <Route path="/signin" element={<Signin />}></Route>
      <Route path="/patient/signin" element={<PatientSigninPage />}></Route>

      <Route
        path="/admin/allAppointment"
        element={
          "admin".match(userType) ? (
            <AllApointmentsAdmin />
          ) : (
            <Navigate to="/signin" />
          )
        }
      ></Route>
      <Route
        path="/admin/patientsList"
        element={
          "admin".match(userType) ? <PatientList /> : <Navigate to="/signin" />
        }
      ></Route>
      <Route
        path="/admin/therapistList"
        element={
          "admin".match(userType) ? (
            <TherapistList />
          ) : (
            <Navigate to="/signin" />
          )
        }
      ></Route>
      <Route
        path="/admin/manageAvailability"
        element={
          "admin".match(userType) ? (
            <ManageAvailabilityByAdmin />
          ) : (
            <Navigate to="/signin" />
          )
        }
      ></Route>

      <Route
        path="/admin/patientDetails/:id"
        element={
          "admin".match(userType) ? (
            <PatientDetails />
          ) : (
            <Navigate to="/signin" />
          )
        }
      ></Route>
      <Route
        path="/admin/therapistDetails/:id"
        element={
          "admin".match(userType) ? (
            <TherapistDetails />
          ) : (
            <Navigate to="/signin" />
          )
        }
      ></Route>

      {/* therapist routing */}

      <Route
        path="/therapist/allAppointment"
        element={
          "therapist".match(userType) ? (
            <AllAppointments />
          ) : (
            <Navigate to="/signin" />
          )
        }
      ></Route>
      <Route
        path="/therapist/myAppointmnet"
        element={
          "therapist".match(userType) ? (
            <TherapistAppointments />
          ) : (
            <Navigate to="/signin" />
          )
        }
      ></Route>
      <Route
        path="/therapist/manageAvailability"
        element={
          "therapist".match(userType) ? (
            <ManageAvailability />
          ) : (
            <Navigate to="/signin" />
          )
        }
      ></Route>

      {/* patient */}
      <Route
        path="/patient/allAppointment"
        element={
          "patient".match(userType) ? (
            <AllAppointment />
          ) : (
            <Navigate to="/signin" />
          )
        }
      ></Route>
      <Route
        path="/patient/myAppointmnet"
        element={
          "patient".match(userType) ? (
            <MyAppointments />
          ) : (
            <Navigate to="/signin" />
          )
        }
      ></Route>
      <Route
        path={`/${userType}/profile/:id`}
        element={
          "patient".match(userType) ? <Profile /> : <Navigate to="/signin" />
        }
      ></Route>
      <Route path="*" element={<Navigate to="/signin" />} />
    </Routes>
  );
};

export default AllRoutes;
