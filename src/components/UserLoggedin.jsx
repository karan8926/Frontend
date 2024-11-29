import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../App";
import { toast } from "react-toastify";

const UserLoggedin = () => {
  const navigate = useNavigate();
  const [accessCode, setAccessCode] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const reqbody = {
        accessCode : accessCode
      }
      const PatientResult = await axios.post(`${baseUrl}api/patient-signin`, reqbody);
      localStorage.setItem(
        "userDetails",
        JSON.stringify({
          userType: "patient",
          accessToken: PatientResult.data.accessToken,
        })
      );
      toast.success("logged in successfully");
      navigate("/patient/allAppointment");
    } catch (error) {
      toast.error("Authentication failed");
      console.log(error);
    }
  };
  return (
    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="accessCode"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Access Code
        </label>
        <input
          type="text"
          name="accessCode"
          id="accessCode"
          placeholder="••••••••"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={accessCode}
          onChange={(e) => setAccessCode(e.target.value)}
          required
        />
      </div>
      <div className="flex items-start">
        {/* <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    required
                  />
                </div> */}
        {/* <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    I accept the{" "}
                    <a
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div> */}
      </div>
      <button
        type="submit"
        className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        Singin
      </button>
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        Don't have an account?{" "}
        <a
          href="/"
          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
        >
          Register here
        </a>
      </p>
    </form>
  );
};

export default UserLoggedin;
