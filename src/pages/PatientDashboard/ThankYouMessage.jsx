import React from "react";

const ThankYouMessage = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 w-full h-screen ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[90vh] lg:h-[90vh] lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className=" w-full p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"></h1>
            <div className="w-full p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-2xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-3xl dark:text-white mb-6">
                🌟 Appointment Confirmed! 🌟
              </h1>
              <div className="flex flex-col items-center justify-center space-y-4">
                <p className="text-lg text-center text-gray-700 dark:text-gray-200">
                  Thank you for scheduling your appointment with us. Your health
                  is our priority, and we’re looking forward to providing you
                  with the care you deserve. 🩺
                </p>
                <p className="text-xl text-center text-gray-800 font-semibold dark:text-gray-200">
                  We’ll see you soon — stay healthy! 💙
                </p>
              </div>
              <div className="flex justify-center mt-8 space-x-8">
                {/* Icons */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-white animate-bounce"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 4v16M5 12l7 7 7-7"></path>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-white animate-bounce"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 4v16M5 12l7 7 7-7"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThankYouMessage;
