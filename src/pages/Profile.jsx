import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    region: "",
    specialty: "",
    password: "",
  });

  function handleSubmit() {}
  function handleChange() {}
  return (
    <div className="w-full h-screen flex ">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 bg-gray-100 p-6">
          <div className="w-full overflow-hidden ">
            <div className="w-full h-[30%]  ">
              <div className="w-full flex-grow mb-4">
                <h1 className="font-bold text-3xl">User settings</h1>
              </div>
              <div className="flex justify-center">
                <div className="p-4 w-[60%]  mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2  sm:p-6 ">
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-10">
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block mb-2 text-sm font-medium  dark:text-black"
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          id="first-name"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-600 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="Bonnie"
                          required
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="last-name"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          id="last-name"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-600 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="Green"
                          required
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="last-name"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          id="last-name"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-600 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="Green"
                          required
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="last-name"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          id="last-name"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-600 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="Green"
                          required
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="last-name"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          id="last-name"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-600 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="Green"
                          required
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="last-name"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          id="last-name"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-600 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="Green"
                          required
                        />
                      </div>

                      <div className="col-span-6 sm:col-full justify-center flex">
                        <button
                          className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                          type="submit"
                        >
                          Save all
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
