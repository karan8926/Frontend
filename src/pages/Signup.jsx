import React, { useEffect, useState } from "react";
import { baseUrl } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [accessCode, setAccessCode] = useState("");
  const navigate = useNavigate();
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPhoneValid, setIsPhoneValid] = useState(true);
  const [formSubmitted, isFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    accessCode: "",
  });
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(email));
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{11}$/; // Example: Validate 10 digits
    setIsPhoneValid(phoneRegex.test(phone));
  };
  // access code creation
  async function generateAccessCode() {
    try {
      const accessCode = await axios.get(`${baseUrl}api/getUniqueAccessCode`);
      console.log(accessCode.data.accessToken, "accessCode");
      setFormData({ ...formData, accessCode: accessCode?.data?.accessToken });
    } catch (error) {
      console.log(error, "error value");
    }
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    isFormSubmitted(true);
    // Handle form submission logic here
    try {
      const response = await axios.post(
        `${baseUrl}api/patient-signup`,
        formData
      );
      toast.success("Access code sent on Your Email");
      navigate("/patient/signin");
    } catch (error) {
      toast.error(error.response.data.error);
      console.log(error.response.data.error);
    }
  };
  useEffect(() => {
    generateAccessCode();
  }, []);

  function handleOnChange(e) {
    const { name, value } = e.target;
    console.log({ name, value }, "name + value");
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === "email") {
      validateEmail(value);
    } else if (name === "phone_number") {
      validatePhone(value);
    }
  }
  const isFormValid = () => {
    // Form is valid if both email and phone are valid
    return isEmailValid && isPhoneValid;
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-900 w-full h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[90vh] lg:h-[90vh] lg:py-0">
        {/* <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
        </a> */}
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="adom"
                  value={formData.name}
                  onChange={handleOnChange}
                  required
                />
                <div>
                  <label
                    htmlFor="phone_number"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your Number
                  </label>
                  <input
                    type="number"
                    name="phone_number"
                    id="phone_number"
                    className={`mt-1 bg-gray-50 text-black block w-full px-3 py-2 border-4 ${
                      isPhoneValid ? "border-gray-300" : "border-red-500"
                    } rounded-md`}
                    placeholder="1234567890"
                    value={formData.phone_number}
                    onChange={handleOnChange}
                    required
                  />
                </div>
              </div>
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
                  className={`mt-1 bg-gray-50 text-black block w-full border-4 px-3 py-2 border ${
                    isEmailValid ? "border-gray-300" : "border-red-500"
                  } rounded-md`}
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={handleOnChange}
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
                </div>
                <div className="ml-3 text-sm">
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
                disabled={!isFormValid() || formSubmitted}
              >
                Request Access Code{" "}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <a
                  href="/patient/signin"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
