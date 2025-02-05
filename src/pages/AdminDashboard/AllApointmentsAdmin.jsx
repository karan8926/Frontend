import React, { useEffect, useState } from 'react';
import Pagination from '../../components/Pagination';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import axios from 'axios';
import { toast } from 'react-toastify';
import { baseUrl } from '../../App';

const AllApointmentsAdmin = () => {
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [appointments, setAppointments] = useState([]);
  const [searchQuery, setSearchQuery] = useState(' ');
  const [specialtyVal, setSpecialityVal] = useState([]);
  const [regions, setRegions] = useState([]);
  const [selectedSpeciality, setSelectedSpeciality] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const fetchData = async (pageNo) => {
    try {
      const response = await axios.get(
        `${baseUrl}api/allAppointment?pageNo=${pageNo}&searchType=${searchType}&searchQuery=${searchQuery}&region=${selectedRegion}&speciality=${selectedSpeciality}`
      );
      setAppointments(response.data.AppointmentData);
      setTotalPages(response.data.noOfPages);
    } catch (err) {
      setAppointments([]);
      setTotalPages(1);
      // toast.error(err.response.data.message);
    }
  };
  const getStatusColor = (status) => {
    switch (status) {
      case 'none':
        return 'bg-gray-200';
      case 'Confirmed':
        return 'bg-green-300';
      case 'Completed':
        return 'bg-blue-300';
      case 'Cancelled':
        return 'bg-red-300';
      case 'Pending':
        return 'bg-orange-300';
      default:
        return 'bg-gray-200';
    }
  };

  useEffect(() => {
    fetchData(currentPage);
    fetchDropdownData();
  }, [selectedSpeciality, selectedRegion]);

  const handlePageChange = (pageNo) => {
    if (pageNo >= 1 && pageNo <= totalPages) {
      fetchData(pageNo);
      setCurrentPage(pageNo);
    }
  };

  function DateTime(data) {
    const date = new Date(data);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based, so add 1
    const day = String(date.getDate()).padStart(2, '0');

    return `${month}/${day}/${year}`;
  }

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

  function handleSearch() {
    fetchData(currentPage);
  }
  const [searchType, setSearchType] = useState('patient');
  function handleSearchTypeChange(e) {
    setSearchType(e.target.value);
  }

  const fetchDropdownData = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}api/getTherapistSpecialtyRegion`
      );
      if (response.data.success) {
        setSpecialityVal(response?.data?.specialty || []);
        setRegions(response?.data?.region || []);
      }
    } catch (error) {
      console.error('Error fetching dropdown data:', error);
    }
  };
  return (
    <div className='w-full h-screen flex  '>
      <Sidebar />
      <div className='flex-1 flex flex-col w-[85%]'>
        <Navbar />
        <div className='flex-1 bg-gray-100 p-6 '>
          <div className='w-full '>
            <div className='w-full h-[30%]  '>
              <div className='w-full h-8 '>
                <h1 className='font-bold text-3xl'>Appointments</h1>
              </div>
              <div className='flex w-full '>
                <div className='w-full p-2 flex items-center space-x-4 '>
                  <label htmlFor='region' className='text-black font-bold'>
                    <select
                      id='search-type'
                      className='block w-[90%] px-3 py-1 border border-gray-300 rounded-md'
                      value={searchType}
                      onChange={handleSearchTypeChange}
                    >
                      <option value='patient'>Search Patient</option>
                      <option value='therapist'>Search Therapist</option>
                    </select>
                  </label>
                  <input
                    className='w-[40%] h-[2rem] bg-slate-200 outline-none text-black rounded-md pl-4'
                    id='search-type'
                    placeholder={
                      searchType === 'patient'
                        ? 'Enter Patient Name'
                        : 'Enter Therapist Name'
                    }
                    onChange={(e) =>
                      setSearchQuery((prev) => e.target.value || ' ')
                    }
                  ></input>

                  <div className='flex justify-end'>
                    <button
                      onClick={handleSearch}
                      className='ml-auto h-[2rem] bg-blue-500 text-white rounded-md px-4'
                    >
                      Search
                    </button>
                  </div>
                </div>
                <div className='flex w-full'>
                  <div className='w-full p-2 flex items-center space-x-4 '>
                    <label
                      htmlFor='speciality'
                      className='text-black font-bold'
                    >
                      <select
                        id='speciality'
                        className='block w-full px-3 py-1 border border-gray-300 rounded-md'
                        value={selectedSpeciality}
                        onChange={(e) => setSelectedSpeciality(e.target.value)}
                      >
                        <option value='all'>Therapist Speciality(All)</option>
                        {specialtyVal?.map((data, index) => (
                          <option key={index} value={data?.specialty}>
                            {data?.specialty}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <div className='w-full p-2 flex items-center space-x-4 '>
                    <label htmlFor='region' className='text-black font-bold'>
                      <select
                        id='region'
                        className='block w-full px-3 py-1 border border-gray-300 rounded-md'
                        value={selectedRegion}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                      >
                        <option value='all'>Therapist Region(All)</option>
                        {regions?.map((data, index) => (
                          <option key={index} value={data?.region}>
                            {data?.region}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                </div>
              </div>

              <div className='min-w-[64rem] w-full  overflow-x-scroll'>
                <table className='w-full  table-auto '>
                  <thead>
                    <tr className='h-10'>
                      <th className='font-bold p-2 text-left whitespace-nowrap  pr-4'>
                        sr no
                      </th>
                      <th className='font-bold p-2 text-left whitespace-nowrap pr-4'>
                        Patient Name
                      </th>
                      <th className='font-bold p-2 text-left whitespace-nowrap pr-4'>
                        Patient Email
                      </th>
                      <th className='font-bold p-2 text-left whitespace-nowrap pr-4'>
                        Therapist Name
                      </th>
                      <th className='font-bold p-2 text-left whitespace-nowrap pr-4'>
                        Therapist Email
                      </th>
                      <th className='font-bold p-2 text-left whitespace-nowrap pr-4'>
                        Therapist Specialty
                      </th>
                      <th className='font-bold p-2 text-left whitespace-nowrap pr-4'>
                        Therapist Region
                      </th>
                      <th className='font-bold p-2 text-left'>Date</th>
                      <th className='font-bold p-2 text-left whitespace-nowrap pr-4'>
                        Time Slot
                      </th>
                      <th className='font-bold p-2 text-left'>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments?.length ? (
                      appointments?.map((data, index) => (
                        <tr key={index} className='border-t'>
                          <td className='p-2 pr-4'>{index + 1}</td>
                          <td className='p-2 pr-4'>{data?.appointment_name}</td>
                          <td className='p-2 pr-4 break-words max-w-xs'>
                            {data?.appointment_email}
                          </td>
                          <td className='p-2 pr-4'>{data?.therapistName}</td>
                          <td className='p-2 pr-4 break-words max-w-xs'>
                            {data?.therapistEmail}
                          </td>
                          <td className='p-2 pr-4'>
                            {data?.therapistSpeciality}
                          </td>
                          <td className='p-2 pr-4'>{data?.therapistRegion}</td>
                          <td className='p-2 pr-4'>{DateTime(data?.date)}</td>
                          <td className='p-2 pr-4'>
                            {data?.time}-
                            {timeSlotFunction(
                              data?.time,
                              data?.appointmentType
                            )}
                          </td>
                          <td className='p-2 pr-4'>
                            <span
                              className={`p-2 pr-4 text-white rounded ${getStatusColor(
                                data?.status
                              )} w-32 text-center inline-block`}
                            >
                              {data?.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <h1>No Data Available</h1>
                    )}
                  </tbody>
                </table>
              </div>

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

export default AllApointmentsAdmin;
