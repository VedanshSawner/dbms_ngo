// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './admin-dashboard.css';  // Ensure your custom styling is in this file
// // import Statistics from './Statistics'; // Import the new Statistics component

// const AdminDashboard = () => {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState('Volunteers');  // Track active tab
//   const [volunteers, setVolunteers] = useState([]);          // State to store volunteers
//   const [searchQuery, setSearchQuery] = useState('');        // Search query state
//   const [assignedShifts, setAssignedShifts] = useState([]);  // State to store assigned shifts
//   const [selectedDate, setSelectedDate] = useState('');      // State for the selected date
//   const [dates, setDates] = useState([]);                    // Available dates for the dropdown
//   const [selectedLocation, setSelectedLocation] = useState(''); // State for the selected location
//   const [locations, setLocations] = useState([]); // Available locations based on selected date
//   const [allAssignedShifts, setAllAssignedShifts] = useState([]);
//   const [shiftDate, setShiftDate] = useState('');
//   const [shiftStartTime, setShiftStartTime] = useState('');
//   const [shiftEndTime, setShiftEndTime] = useState('');
//   const [shiftLocation, setShiftLocation] = useState('');
//   const [shiftTask, setShiftTask] = useState('');
//   const [availableShifts, setAvailableShifts] = useState([]); // Store shifts


//   useEffect(() => {
//     const role = localStorage.getItem('role');

//     // Redirect to login if not an organizer
//     if (role !== 'organizer') {
//       navigate('/login');
//     }
    
//     // Fetch volunteers and shifts (mock data for now)
//     fetchVolunteers();
//     fetchAssignedShifts();
//     fetchAvailableShifts();
//     fetchAllAssignedShifts();
//   }, [navigate]);

//   const fetchAllAssignedShifts = async () => {
//     const token = localStorage.getItem('token');
//     if(!token)
//         console.log("fbwjeb")
      
//     try {
//       const res = await fetch('http://localhost:5000/api/shifts/assigned/all', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },

//       });
//       const data = await res.json();
//       setAllAssignedShifts(data);
//     } catch (error) {
//       console.error('Error fetching all assigned shifts:', error);
//     }
//   };

//   const fetchAvailableShifts = async () => {
//     const token = localStorage.getItem('token');
//     console.log(token);
//     try {
//       const response = await fetch('http://localhost:5000/api/shifts/available', {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         }
//       }); // Your backend endpoint
//       const data = await response.json();

//       // Optional: Filter shifts available until 5 days before today
//       const today = new Date();
//       const fiveDaysLater = new Date();
//       fiveDaysLater.setDate(today.getDate() + 5);

//       const filteredShifts = data.filter((shift) => {
//         const shiftDate = new Date(shift.shift_date);
//         return shiftDate >= today && shiftDate <= fiveDaysLater;
//       });

//       setAvailableShifts(filteredShifts);
//     } catch (error) {
//       console.error('Error fetching shifts:', error);
//     }
//   };

//   // Mock data for volunteers
//   const fetchVolunteers = () => {
//     const mockVolunteers = [
//       {
//         id: 1,
//         name: 'Vedansh Sawner',
//         email: 'abc@gmail.com',
//         contact: '+91 7912734567',
//         categories: ['Feeding', 'Shop'],
//         hours: 20,
//         profilePicture: 'https://via.placeholder.com/50',
//       },
//       {
//         id: 2,
//         name: 'Aryan Pandey',
//         email: 'xyz@yahoo.com',
//         contact: '+91 7998576543',
//         categories: ['Bar/Service', 'Accreditation'],
//         hours: 35,
//         profilePicture: 'https://via.placeholder.com/50',
//       },
//       {
//         id: 3,
//         name: 'Shaksham Sharma',
//         email: 'def@hotmail.com',
//         contact: '+91 7915554321',
//         categories: ['Accomodation', 'Technical Support'],
//         hours: 15,
//         profilePicture: 'https://via.placeholder.com/50',
//       },
//     ];
//     setVolunteers(mockVolunteers);
//   };


//   // Mock data for assigned shifts
//   const fetchAssignedShifts = () => {
//     const mockAssignedShifts = [
//       {
//         id: 1,
//         volunteerId: 1,
//         date: '2024-10-21',
//         time: '10:00-14:00',
//         location: 'Indore',
//         task: 'Feeding',
//       },
//       {
//         id: 2,
//         volunteerId: 2,
//         date: '2024-10-22',
//         time: '12:00-16:00',
//         location: 'Hyderabad',
//         task: 'Ticketing',
//       },
//       {
//         id: 3,
//         volunteerId: 3,
//         date: '2024-10-21',
//         time: '12:00-10:00',
//         location: 'Baswara',
//         task: 'Cloakroom',
//       },
//     ];
//     const availableDates = [...new Set(mockAssignedShifts.map(shift => shift.date))];  // Extract unique dates
//     setAssignedShifts(mockAssignedShifts);
//     setDates(availableDates);  // Set the available dates for the dropdown
//   };


//   // Handle volunteer deletion
//   const handleDelete = (volunteerId) => {
//     const updatedVolunteers = volunteers.filter(v => v.id !== volunteerId);
//     setVolunteers(updatedVolunteers);
//   };

//   // Handle search input change
//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   // Filter volunteers based on search query
//   const filteredVolunteers = volunteers.filter(volunteer =>
//     volunteer.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );


//   // Handle shift cancellation
//   const handleCancelShift = (shiftId) => {
//     const updatedShifts = assignedShifts.filter(shift => shift.id !== shiftId);
//     setAssignedShifts(updatedShifts);
//   };

//   // Handle date change
//   const handleDateChange = (e) => {
//     const selectedDate = e.target.value;
//     setSelectedDate(selectedDate);
  
//     // Get unique locations for the selected date
//     const availableLocations = [
//       ...new Set(assignedShifts.filter(shift => shift.date === selectedDate).map(shift => shift.location)),
//     ];
//     setLocations(availableLocations); // Populate locations dropdown
//     setSelectedLocation(''); // Reset location selection when a new date is selected
//   };

//   // Handle location change
//   const handleLocationChange = (e) => {
//     setSelectedLocation(e.target.value); // Update the selected location
//   };
  
//   // Filter assigned shifts based on selected date and location
//   const filteredShifts = assignedShifts.filter(shift => {
//     return shift.date === selectedDate && (selectedLocation === '' || shift.location === selectedLocation);
//   });
  
    
//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('role');
//     navigate('/login');
//   };


//   const handleCreateShift = async (e) => {
//     e.preventDefault();
  
//     const token = localStorage.getItem('token');
  
//     const newShift = {
//       shift_date: shiftDate,
//       start_time: shiftStartTime,
//       end_time: shiftEndTime,
//       location: shiftLocation,
//       task: shiftTask,
//       user_id: null, // or current user id if needed
//     };
  
//     try {
//       const response = await fetch('http://localhost:5000/api/shifts', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(newShift),
//       });
  
//       const data = await response.json();
  
//       if (!response.ok) {
//         console.error('Server Response:', data);
//         throw new Error(data.message || 'Failed to create shift');
//       }
  
//       // Add new shift to availableShifts list (if using)
//       setAvailableShifts(prev => [...prev, data]);
  
//       // Clear form
//       setShiftDate('');
//       setShiftStartTime('');
//       setShiftEndTime('');
//       setShiftLocation('');
//       setShiftTask('');
  
//       alert('✅ Shift Created Successfully!');
//     } catch (error) {
//       console.error('❌ Error creating shift:', error);
//       alert('Failed to create shift');
//     }
//   };      

//   // Content to display based on active tab
//   const renderContent = () => {
//     switch (activeTab) {
//       case 'Volunteers':
//         return renderVolunteers();
//       case 'Assigned Shifts':
//         return renderAllAssignedShifts();  // New tab for Assigned Shifts
//         case 'Available Shifts':
//           return renderAvailableShifts();        
//       case 'Feedback':
//         return <div><h1>Feedback</h1><p>View and manage feedback from volunteers.</p></div>;
//         case 'Make Shift':
//           return (
//             <div className="make-shift-section">
//               <h1>Create a New Shift</h1>
              
//               {/* Shift Form */}
//           <form onSubmit={handleCreateShift} className="shift-form">
//           <label>Date:</label>
//           <input
//             type="date"
//             value={shiftDate}
//             onChange={(e) => setShiftDate(e.target.value)}
//             required/>
//           <label>Start Time:</label>
//           <input
//             type="time"
//             value={shiftStartTime}
//             onChange={(e) => setShiftStartTime(e.target.value)}
//             required
//           />

//           <label>End Time:</label>
//           <input
//             type="time"
//             value={shiftEndTime}
//             onChange={(e) => setShiftEndTime(e.target.value)}
//             required
//           />

//           <label>Location:</label>
//           <input
//             type="text"
//             placeholder="Enter location"
//             value={shiftLocation}
//             onChange={(e) => setShiftLocation(e.target.value)}
//             required
//           />

//           <label>Task:</label>
//           <input
//             type="text"
//             placeholder="Enter task"
//             value={shiftTask}
//             onChange={(e) => setShiftTask(e.target.value)}
//             required
//           />

//       <button type="submit" className="create-shift-btn">
//         Create Shift
//       </button>
//     </form>
        
//               {/* Display Available Shifts */}
//               <h2>Available Shifts</h2>
//               <ul>
//                 {availableShifts.map((shift, index) => (
//                   <li key={index}>
//                     <strong>{shift.date}</strong> - {shift.time} at {shift.location} ({shift.task})
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ); 
//       default:
//         return null;
//     }
//   };

//   // Render volunteers list with search bar and delete button
//   const renderVolunteers = () => (
//     <div className="volunteers-section">
//       <h1>Volunteers Management</h1>

//       {/* Search Bar */}
//       <input
//         type="text"
//         placeholder="Search by name"
//         value={searchQuery}
//         onChange={handleSearchChange}
//         className="search-bar"
//       />

//       {/* Volunteer List */}
//       <div className="volunteer-list">
//         {filteredVolunteers.map(volunteer => (
//           <div key={volunteer.id} className="volunteer-item">
//             <img src={volunteer.profilePicture} alt={volunteer.name} className="volunteer-img" />
//             <div className="volunteer-details">
//               <p><strong>Name:</strong> {volunteer.name}</p>
//               <p><strong>Email:</strong> {volunteer.email}</p>
//               <p><strong>Contact:</strong> {volunteer.contact}</p>
//               <p><strong>Categories:</strong> {volunteer.categories.join(', ')}</p>
//               <p><strong>Hours Volunteered:</strong> {volunteer.hours} hours</p> {/* New field for hours */}             
//             </div>
//             <button onClick={() => handleDelete(volunteer.id)} className="delete-btn">Delete</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   const renderAllAssignedShifts = () => (
//     <div className="assigned-shifts-section">
//       <h1>All Assigned Shifts</h1>
//       {allAssignedShifts.length === 0 ? (
//         <p>No shifts have been assigned yet.</p>
//       ) : (
//         allAssignedShifts.map((shift) => (
//           <div key={shift.shift_id} className="shift-card">
//             <p><strong>Date:</strong> {new Date(shift.shift_date).toLocaleDateString()}</p>
//             <p><strong>Time:</strong> {shift.start_time} - {shift.end_time}</p>
//             <p><strong>Task:</strong> {shift.task}</p>
//             <p><strong>Location:</strong> {shift.location}</p>
//             <p><strong>Assigned Volunteer:</strong> {shift.volunteer_name}</p>
//           </div>
//         ))
//       )}
//     </div>
//   );
  
  

//   // const renderAssignedShifts = () => (
//   //   <div className="assigned-shifts-section">
//   //     <h1>Assigned Shifts</h1>

//   //     {/* Date Dropdown */}
//   //     {/* <label htmlFor="date-select"><strong>Select Date: </strong></label>
//   //     <select id="date-select" value={selectedDate} onChange={handleDateChange} className="date-dropdown">
//   //       <option value="">Select a date</option>
//   //       {dates.map(date => (
//   //         <option key={date} value={date}>{date}</option>
//   //       ))}
//   //     </select> */}
//   //     <label htmlFor="date-select"><strong>Select Date: </strong></label>
//   //     <input 
//   //       type="date" 
//   //       id="date-select" 
//   //       value={selectedDate} 
//   //       onChange={handleDateChange} 
//   //       className="date-picker"
//   //     />

//   //     {/* Location Dropdown */}
//   //     {selectedDate && (
//   //       <>
//   //         <label htmlFor="location-select"><strong>Select Location: </strong></label>
//   //         <input 
//   //           type="text" 
//   //           id="location-input" 
//   //           value={selectedLocation} 
//   //           onChange={handleLocationChange} 
//   //           className="location-input"
//   //           placeholder="Enter location"
//   //         /> 
//   //         {/* <label htmlFor="location-select"><strong>Select Location: </strong></label>
//   //         <select id="location-select" value={selectedLocation} onChange={handleLocationChange} className="location-dropdown">
//   //           <option value="">All locations</option>
//   //           {locations.map(location => (
//   //             <option key={location} value={location}>{location}</option>
//   //           ))}
//   //         </select> */}
//   //       </>
//   //     )}

//   //     <div className="assigned-shifts-list">
//   //       {filteredShifts.length > 0 ? (
//   //         filteredShifts.map(shift => {
//   //           const volunteer = volunteers.find(v => v.id === shift.volunteerId);
//   //           return (
//   //             <div key={shift.id} className="shift-item-admin">
//   //               <p><strong>Volunteer:</strong> {volunteer ? volunteer.name : 'Unknown'}</p>
//   //               <p><strong>Time:</strong> {shift.time}</p>
//   //               <p><strong>Location:</strong> {shift.location}</p>
//   //               <p><strong>Task:</strong> {shift.task}</p>
//   //               <button onClick={() => handleCancelShift(shift.id)} className="cancel-btn">Cancel Shift</button>
//   //             </div>
//   //           );
//   //         })
//   //       ) : (
//   //         <p>No shifts assigned for this date.</p>
//   //       )}
//   //     </div>
//   //   </div>
//   // );

//   const renderAvailableShifts = () => (
//     <div className="available-shifts-section">
//       <h1>Available Shifts</h1>
  
//       {availableShifts.length === 0 ? (
//         <p>No available shifts at the moment.</p>
//       ) : (
//         availableShifts.map((shift) => (
//           <div key={shift.id} className="shift-card">
//             <p><strong>Date:</strong> {shift.shift_date}</p>
//             <p><strong>Time:</strong> {shift.start_time} - {shift.end_time}</p>
//             <p><strong>Location:</strong> {shift.location}</p>
//             <p><strong>Task:</strong> {shift.task}</p>
//             {/* <button onClick={() => applyToShift(shift.id)}>Apply</button> */}
//           </div>
//         ))
//       )}
//     </div>
//   );
  

//   // const renderAssignedShifts = () => (
//   //   <div className="assigned-shifts-section">
//   //     <h1>Assigned Shifts</h1>

//   //     {/* Date Dropdown */}
//   //     <label htmlFor="date-select"><strong>Select Date: </strong></label>
//   //     <select id="date-select" value={selectedDate} onChange={handleDateChange} className="date-dropdown">
//   //       <option value="">Select a date</option>
//   //       {dates.map(date => (
//   //         <option key={date} value={date}>{date}</option>
//   //       ))}
//   //     </select>

//   //     {/* Location Dropdown */}
//   //     {selectedDate && (
//   //       <>
//   //         <label htmlFor="location-select"><strong>Select Location: </strong></label>
//   //         <select id="location-select" value={selectedLocation} onChange={handleLocationChange} className="location-dropdown">
//   //           <option value="">All locations</option>
//   //           {locations.map(location => (
//   //             <option key={location} value={location}>{location}</option>
//   //           ))}
//   //         </select>
//   //       </>
//   //     )}

//   //     <div className="assigned-shifts-list">
//   //       {filteredShifts.length > 0 ? (
//   //         filteredShifts.map(shift => {
//   //           const volunteer = volunteers.find(v => v.id === shift.volunteerId);
//   //           return (
//   //             <div key={shift.id} className="shift-item-admin">
//   //               <p><strong>Volunteer:</strong> {volunteer ? volunteer.name : 'Unknown'}</p>
//   //               <p><strong>Time:</strong> {shift.time}</p>
//   //               <p><strong>Location:</strong> {shift.location}</p>
//   //               <p><strong>Task:</strong> {shift.task}</p>
//   //               <button onClick={() => handleCancelShift(shift.id)} className="cancel-btn">Cancel Shift</button>
//   //             </div>
//   //           );
//   //         })
//   //       ) : (
//   //         <p>No shifts assigned for this date.</p>
//   //       )}
//   //     </div>
//   //   </div>
//   // );

//   return (
//     <div className="admin-dashboard">
//       {/* Sidebar Navigation */}
//       <div className="sidebar">
//         <h2>Admin Panel</h2>
//         <ul>
//           <li className={activeTab === 'Volunteers' ? 'active' : ''} onClick={() => setActiveTab('Volunteers')}>Volunteers Management</li>
//           <li className={activeTab === 'Assigned Shifts' ? 'active' : ''} onClick={() => setActiveTab('Assigned Shifts')}>Assigned Shifts</li>
//           <li className={activeTab === 'Available Shifts' ? 'active' : ''} onClick={() => setActiveTab('Available Shifts')}>Available Shifts</li>
//           <li className={activeTab === 'Make Shift' ? 'active' : ''} onClick={() => setActiveTab('Make Shift')}>Make Shift</li>
//           <li className={activeTab === 'Feedback' ? 'active' : ''} onClick={() => setActiveTab('Feedback')}>Feedback</li>
//         </ul>
//         <button onClick={handleLogout} className="logout-btn">Logout</button>
//       </div>

//       {/* Main Content Area */}
//       <div className="main-content">
//         {renderContent()}  {/* Display content based on active tab */}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './admin-dashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Volunteers');
  const [volunteers, setVolunteers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [assignedShifts, setAssignedShifts] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [dates, setDates] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [locations, setLocations] = useState([]);
  const [allAssignedShifts, setAllAssignedShifts] = useState([]);
  const [shiftDate, setShiftDate] = useState('');
  const [shiftStartTime, setShiftStartTime] = useState('');
  const [shiftEndTime, setShiftEndTime] = useState('');
  const [shiftLocation, setShiftLocation] = useState('');
  const [shiftTask, setShiftTask] = useState('');
  const [availableShifts, setAvailableShifts] = useState([]);

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'organizer') {
      navigate('/login');
    }
    fetchVolunteers();
    fetchAssignedShifts();
    fetchAvailableShifts();
    fetchAllAssignedShifts();
  }, [navigate]);

  const fetchAllAssignedShifts = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:5000/api/shifts/assigned/all', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setAllAssignedShifts(data);
    } catch (error) {
      console.error('Error fetching all assigned shifts:', error);
    }
  };

  const fetchAvailableShifts = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:5000/api/shifts/available', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
      // Optional: Filter shifts to show those available until 5 days from today
      const today = new Date();
      const fiveDaysLater = new Date();
      fiveDaysLater.setDate(today.getDate() + 5);

      const filteredShifts = data.filter((shift) => {
        const sDate = new Date(shift.shift_date);
        return sDate >= today && sDate <= fiveDaysLater;
      });
      setAvailableShifts(filteredShifts);
    } catch (error) {
      console.error('Error fetching available shifts:', error);
    }
  };

  const fetchVolunteers = () => {
    const mockVolunteers = [
      {
        id: 1,
        name: 'Vedansh Sawner',
        email: 'abc@gmail.com',
        contact: '+91 7912734567',
        categories: ['Feeding', 'Shop'],
        hours: 20,
        profilePicture: 'https://via.placeholder.com/50',
      },
      {
        id: 2,
        name: 'Aryan Pandey',
        email: 'xyz@yahoo.com',
        contact: '+91 7998576543',
        categories: ['Bar/Service', 'Accreditation'],
        hours: 35,
        profilePicture: 'https://via.placeholder.com/50',
      },
      {
        id: 3,
        name: 'Shaksham Sharma',
        email: 'def@hotmail.com',
        contact: '+91 7915554321',
        categories: ['Accomodation', 'Technical Support'],
        hours: 15,
        profilePicture: 'https://via.placeholder.com/50',
      },
    ];
    setVolunteers(mockVolunteers);
  };

  const fetchAssignedShifts = () => {
    const mockAssignedShifts = [
      {
        id: 1,
        volunteerId: 1,
        date: '2024-10-21',
        time: '10:00-14:00',
        location: 'Indore',
        task: 'Feeding',
      },
      {
        id: 2,
        volunteerId: 2,
        date: '2024-10-22',
        time: '12:00-16:00',
        location: 'Hyderabad',
        task: 'Ticketing',
      },
      {
        id: 3,
        volunteerId: 3,
        date: '2024-10-21',
        time: '12:00-10:00',
        location: 'Baswara',
        task: 'Cloakroom',
      },
    ];
    const availableDates = [...new Set(mockAssignedShifts.map(shift => shift.date))];
    setAssignedShifts(mockAssignedShifts);
    setDates(availableDates);
  };

  const handleDelete = (volunteerId) => {
    const updatedVolunteers = volunteers.filter(v => v.id !== volunteerId);
    setVolunteers(updatedVolunteers);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredVolunteers = volunteers.filter(volunteer =>
    volunteer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCancelShift = (shiftId) => {
    const updatedShifts = assignedShifts.filter(shift => shift.id !== shiftId);
    setAssignedShifts(updatedShifts);
  };

  const handleDateChange = (e) => {
    const selected = e.target.value;
    setSelectedDate(selected);
    const availableLocations = [
      ...new Set(assignedShifts.filter(shift => shift.date === selected).map(shift => shift.location))
    ];
    setLocations(availableLocations);
    setSelectedLocation('');
  };

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  const filteredShifts = assignedShifts.filter(shift => {
    return shift.date === selectedDate && (selectedLocation === '' || shift.location === selectedLocation);
  });

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const handleCreateShift = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const newShift = {
      shift_date: shiftDate,
      start_time: shiftStartTime,
      end_time: shiftEndTime,
      location: shiftLocation,
      task: shiftTask,
      user_id: null,
    };
    try {
      const response = await fetch('http://localhost:5000/api/shifts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newShift),
      });
      const data = await response.json();
      if (!response.ok) {
        console.error('Server Response:', data);
        throw new Error(data.message || 'Failed to create shift');
      }
      setAvailableShifts(prev => [...prev, data]);
      setShiftDate('');
      setShiftStartTime('');
      setShiftEndTime('');
      setShiftLocation('');
      setShiftTask('');
      alert('✅ Shift Created Successfully!');
    } catch (error) {
      console.error('❌ Error creating shift:', error);
      alert('Failed to create shift');
    }
  };

  const renderVolunteers = () => (
    <div className="volunteers-section">
      <h1>Volunteers Management</h1>
      <input
        type="text"
        placeholder="Search by name"
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-bar"
      />
      <div className="volunteer-list">
        {filteredVolunteers.map(volunteer => (
          <div key={volunteer.id} className="volunteer-item">
            <img src={volunteer.profilePicture} alt={volunteer.name} className="volunteer-img" />
            <div className="volunteer-details">
              <p><strong>Name:</strong> {volunteer.name}</p>
              {/* <p><strong>Email:</strong> {volunteer.email}</p>
              <p><strong>Contact:</strong> {volunteer.contact}</p>
              <p><strong>Categories:</strong> {volunteer.categories.join(', ')}</p>
              <p><strong>Hours Volunteered:</strong> {volunteer.hours} hours</p> */}
            </div>
            <button onClick={() => handleDelete(volunteer.id)} className="delete-btn">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAllAssignedShifts = () => (
    <div className="assigned-shifts-section">
      <h1>All Assigned Shifts</h1>
      {allAssignedShifts.length === 0 ? (
        <p>No shifts have been assigned yet.</p>
      ) : (
        allAssignedShifts.map((shift) => (
          <div key={shift.shift_id} className="shift-card">
            <p><strong>Date:</strong> {new Date(shift.shift_date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> {shift.start_time} - {shift.end_time}</p>
            <p><strong>Task:</strong> {shift.task}</p>
            <p><strong>Location:</strong> {shift.location}</p>
            <p><strong>Assigned Volunteer:</strong> {shift.volunteer_name}</p>
          </div>
        ))
      )}
    </div>
  );

  const renderAvailableShifts = () => (
    <div className="available-shifts-section">
      <h1>Available Shifts</h1>
      {availableShifts.length === 0 ? (
        <p>No available shifts at the moment.</p>
      ) : (
        availableShifts.map((shift) => (
          <div key={shift.id} className="shift-card">
            <p><strong>Date:</strong> {shift.shift_date}</p>
            <p><strong>Time:</strong> {shift.start_time} - {shift.end_time}</p>
            <p><strong>Location:</strong> {shift.location}</p>
            <p><strong>Task:</strong> {shift.task}</p>
          </div>
        ))
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'Volunteers':
        return renderVolunteers();
      case 'Assigned Shifts':
        return renderAllAssignedShifts();
      case 'Available Shifts':
        return renderAvailableShifts();
      case 'Feedback':
        return (
          <div>
            <h1>Feedback</h1>
            <p>View and manage feedback from volunteers.</p>
          </div>
        );
      case 'Make Shift':
        return (
          <div className="make-shift-section">
            <h1>Create a New Shift</h1>
            <form onSubmit={handleCreateShift} className="shift-form">
              <label>Date:</label>
              <input
                type="date"
                value={shiftDate}
                onChange={(e) => setShiftDate(e.target.value)}
                required
              />
              <label>Start Time:</label>
              <input
                type="time"
                value={shiftStartTime}
                onChange={(e) => setShiftStartTime(e.target.value)}
                required
              />
              <label>End Time:</label>
              <input
                type="time"
                value={shiftEndTime}
                onChange={(e) => setShiftEndTime(e.target.value)}
                required
              />
              <label>Location:</label>
              <input
                type="text"
                placeholder="Enter location"
                value={shiftLocation}
                onChange={(e) => setShiftLocation(e.target.value)}
                required
              />
              <label>Task:</label>
              <input
                type="text"
                placeholder="Enter task"
                value={shiftTask}
                onChange={(e) => setShiftTask(e.target.value)}
                required
              />
              <button type="submit" className="create-shift-btn">Create Shift</button>
            </form>
            <h2>Available Shifts</h2>
            <ul>
              {availableShifts.length === 0 ? (
                <li>No available shifts at the moment.</li>
              ) : (
                availableShifts.map((shift, index) => (
                  <li key={index}>
                    <strong>{shift.shift_date}</strong> - {shift.start_time} to {shift.end_time} at {shift.location} ({shift.task})
                  </li>
                ))
              )}
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li className={activeTab === 'Volunteers' ? 'active' : ''} onClick={() => setActiveTab('Volunteers')}>
            Volunteers Management
          </li>
          <li className={activeTab === 'Assigned Shifts' ? 'active' : ''} onClick={() => setActiveTab('Assigned Shifts')}>
            Assigned Shifts
          </li>
          <li className={activeTab === 'Available Shifts' ? 'active' : ''} onClick={() => setActiveTab('Available Shifts')}>
            Available Shifts
          </li>
          <li className={activeTab === 'Make Shift' ? 'active' : ''} onClick={() => setActiveTab('Make Shift')}>
            Make Shift
          </li>
          {/* <li className={activeTab === 'Feedback' ? 'active' : ''} onClick={() => setActiveTab('Feedback')}>
            Feedback
          </li> */}
        </ul>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
      <div className="main-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;

