import React, { useState } from "react";
import UserLoggedin from "../components/UserLoggedin";
import TherapistAndAdminLoggedin from "../components/TherapistAndAdminLoggedin";
import axios from "axios";
import { baseUrl } from "../App";

const therapistSigninPage = () => {
  const [accessCode, setAccessCode] = useState("");
  const [userType, SetUserType] = useState(null);

  return (
    <section className="bg-gray-50 dark:bg-gray-900 w-full h-screen ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[90vh] lg:h-[90vh] lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Access an account
            </h1>
            {!userType ? (
              <div className="flex justify-center space-x-8">
                <button
                  onClick={() => SetUserType("therapist")}
                  className="w-[8rem] border-2 border-black h-[3rem] rounded-md text-center p-2 text-white bg-gray-900 font-bold"
                >
                  Therapist
                </button>
              </div>
            ) : userType === "patient" ? (
              <UserLoggedin />
            ) : (
              <TherapistAndAdminLoggedin userType={userType} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default therapistSigninPage;
