import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../App";
import { toast } from "react-toastify";

const TherapistAndAdminLoggedin = (props) => {
  const userType = props?.userType;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const reqbody = {
        name: email,
        email: email,
        password: password,
      };

      let Result;
      if (userType === "admin") {
        Result = await axios.post(`${baseUrl}api/admin-login`, reqbody);
      } else {
        Result = await axios.post(`${baseUrl}api/therapist-login`, reqbody);
      }

      console.log(Result, "result data");

      localStorage.setItem(
        "userDetails",
        JSON.stringify({
          userType: Result.data.data.type,
          userEmail: Result.data.data.email,
          userName: Result.data.data.name,
          data: Result.data.token,
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
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="flex items-start"></div>
      <button
        type="submit"
        className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        Signin
      </button>
      {/* <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        Don't have an account?{" "}
        <a
          href="/"
          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
        >
          Register here
        </a>
      </p> */}
    </form>
  );
};

export default TherapistAndAdminLoggedin;
