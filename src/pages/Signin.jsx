import React, { useState } from "react";
import UserLoggedin from "../components/UserLoggedin";
import TherapistAndAdminLoggedin from "../components/TherapistAndAdminLoggedin";
import axios from "axios";
import { baseUrl } from "../App";

const Signin = () => {
  const [accessCode, setAccessCode] = useState("");
  const [userType, SetUserType] = useState(null);
 
  return (
    <section className="bg-gray-50 dark:bg-gray-900 w-full h-screen ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[90vh] lg:h-[90vh] lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Access an account
            </h1>
            {!userType ? (
              <div className="flex space-x-2">
                <button
                  onClick={() => SetUserType("patient")}
                  className="w-[8rem] border-2 border-black h-[3rem] rounded-md text-center p-2 text-white bg-gray-900 font-bold"
                >
                  Patient
                </button>
                <button
                  onClick={() => SetUserType("therapist")}
                  className="w-[8rem] border-2 border-black h-[3rem] rounded-md text-center p-2 text-white bg-gray-900 font-bold"
                >
                  Therapist
                </button>
                <button
                  onClick={() => SetUserType("admin")}
                  className="w-[8rem] border-2 border-black h-[3rem] rounded-md text-center p-2 text-white bg-gray-900 font-bold"
                >
                  Admin
                </button>
              </div>
            ) : userType === "patient" ? (
              <UserLoggedin />
            ) : (
              <TherapistAndAdminLoggedin />
            )}

            {/* <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
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
            </form> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;
