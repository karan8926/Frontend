import React, { useEffect, useState } from 'react';
import Pagination from '../../components/Pagination';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import axios from 'axios';
import { baseUrl } from '../../App';
import { toast } from 'react-toastify';
import useDisableButton from '../../hooks/useDisableButton';

const TherapistAppointments = () => {
  const therapistDetails = JSON.parse(sessionStorage.getItem('userDetails'));
  const { isDisableButton, handleButtonDisability, handleResetButton } =
    useDisableButton();
  const [toggleModel, setToggleModel] = useState(false);
  const [email, setEmail] = useState(therapistDetails.userEmail);
  const [userId, setUserId] = useState(therapistDetails.userId);
  const [appointments, setAppointments] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    availableDate: '',
    timeSlot: '',
    // name: "",
    // email: "",
    appointmentType: 'Consultation(45min)',
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      handleButtonDisability();
      const { availableDate, timeSlot, appointmentType, specialty } = formData;
      const data = await axios.post(`${baseUrl}api/AddTherapistAvailability`, {
        email: email,
        date: availableDate,
        time: timeSlot,
        appointmentType,
        specialty,
      });
      getTherapistData();
      handleResetButton();
      toast.success('Appointment Added SuccessFully');
    } catch (error) {
      console.log(error, 'error');
    }

    setToggleModel(false);
  };
  function DateTime(data) {
    const date = new Date(data);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based, so add 1
    const day = String(date.getDate()).padStart(2, '0');

    return `${month}/${day}/${year}`;
  }
  const getTherapistData = async (pageNo) => {
    try {
      const response = await axios.get(
        `${baseUrl}api/getTherapistDetailsById?therapistId=${userId}&pageNo=${pageNo}`
      );
      setAppointments(response.data.result);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      console.log(err);
      toast.error('Error while Fetching Data');
    }
  };

  useEffect(() => {
    getTherapistData(currentPage);
  }, []);

  function timeSlotFunction(startTime, appointmentType) {
    const [hours, minutes] = startTime.split(':').map(Number);

    let duration = 30;
    if (appointmentType === 'Consultation(45min)') {
      duration = 45;
    }

    let endMinutes = minutes + duration;
    let endHours = hours + Math.floor(endMinutes / 60);
    endMinutes = endMinutes % 60;

    const endTimeFormatted = `${endHours}:${
      endMinutes < 10 ? '0' : ''
    }${endMinutes}`;

    return endTimeFormatted;
  }

  const handlePageChange = (pageNo) => {
    if (pageNo >= 1 && pageNo <= totalPages) {
      getTherapistData(pageNo);
      setCurrentPage(pageNo);
    }
  };
  return (
    <div className='w-full h-screen flex '>
      <Sidebar />
      <div className='flex-1 flex flex-col'>
        <Navbar />
        <div className='flex-1 bg-gray-100 p-6'>
          <div className='w-full overflow-hidden '>
            <div className='w-full h-[30%]  '>
              <div className='flex flex-grow'>
                <h1 className='font-bold text-3xl'>Appointment List</h1>
              </div>
              <div className='flex justify-end '>
                <button
                  onClick={() => setToggleModel(true)}
                  className='bg-blue-600 rounded-md px-4 py-2 text-white'
                >
                  CREATE APPOINTMENT
                </button>
              </div>
              {toggleModel && (
                <div className='fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50'>
                  <div className='w-[40%] max-w-lg bg-white p-6 rounded-md flex flex-col'>
                    <h2 className='text-xl font-semibold text-center mb-4'>
                      CREATE APPOINTMENT
                    </h2>

                    <form onSubmit={handleSubmit} className='space-y-4'>
                      <div>
                        <label
                          htmlFor='availableDate'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Available Date
                        </label>
                        <input
                          type='date'
                          id='availableDate'
                          name='availableDate'
                          value={formData.availableDate}
                          onChange={handleChange}
                          className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md'
                        />
                      </div>

                      <div>
                        <label
                          htmlFor='timeSlot'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Available Time Slots
                        </label>
                        <input
                          type='time'
                          id='timeSlot'
                          name='timeSlot'
                          value={formData.timeSlot}
                          onChange={handleChange}
                          className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md'
                        />
                      </div>

                      {/* <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div> */}

                      <div>
                        <label
                          htmlFor='appointmentType'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Appointment Type
                        </label>
                        <select
                          id='appointmentType'
                          name='appointmentType'
                          value={formData.appointmentType}
                          onChange={handleChange}
                          className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md'
                        >
                          <option value='Consultation(45min)'>
                            Consultation (45min)
                          </option>
                          <option value='Follow-up(30min)'>
                            Follow-up (30min)
                          </option>
                        </select>
                      </div>

                      <div className='flex justify-end mt-4'>
                        <button
                          type='submit'
                          className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700'
                          disabled={isDisableButton}
                        >
                          Submit
                        </button>
                        <button
                          type='button'
                          onClick={() => setToggleModel(false)}
                          className='ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700'
                        >
                          Close
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              <table className='w-full table-auto'>
                <thead>
                  <tr className='h-10'>
                    <th className='font-bold p-2 text-left'>sr no</th>
                    <th className='font-bold p-2 text-left'>Name</th>
                    <th className='font-bold p-2 text-left'>Email</th>
                    <th className='font-bold p-2 text-left'>Date</th>
                    <th className='font-bold p-2 text-left'>Time Slot</th>
                    <th className='font-bold p-2 text-left'>
                      Appointment Type
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {appointments?.length > 0
                    ? appointments?.map((data, index) => (
                        <tr key={index} className='border-t'>
                          <td className='p-2'>{index + 1}</td>
                          <td className='p-2'>{data?.therapistName}</td>
                          <td className='p-2'>{data?.therapistEmail}</td>
                          <td className='p-2'>{DateTime(data?.date)}</td>
                          <td className='p-2'>
                            {data?.time}-
                            {timeSlotFunction(
                              data?.time,
                              data?.appointmentType
                            )}
                          </td>
                          <td className='p-2'>{data?.appointmentType}</td>
                        </tr>
                      ))
                    : 'No Data Available'}
                </tbody>
              </table>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TherapistAppointments;
