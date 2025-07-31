

// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import Api from '../../services/Api';

// export default function ViewJobCards() {
//   const [jobCards, setJobCards] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchJobCards = async () => {
//       try {
//         const token = localStorage.getItem('token');
        

//         const response = await Api.get('/jobcards', {
//         headers: {
//           Authorization: `Bearer ${token}`, // set token in header
//         },
//       });
      
//         console.log(response.data);
//         setJobCards(response.data); // Adjust according to your backend response
//       } catch (error) {
//         console.error('Failed to fetch job cards:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchJobCards();
//   }, []);

//   if (loading) return <p>Loading...</p>;




//   return (
//     <div className="p-6 bg-white rounded-xl shadow-md">
//       <h2 className="text-2xl font-bold mb-4">All Job Cards List</h2>

//       <div className="overflow-y-auto max-h-[550px]">
//         <table className="w-full text-center table-auto border-collapse">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-2 border">Job ID</th>
//               <th className="p-2 border">Customer Name</th>
//               <th className="p-2 border">Contact No</th>

//               <th className="p-2 border">Bike Model</th>
//               <th className="p-2 border">Bike Number</th>
//               <th className="p-2 border">Job Status</th>
//               <th className="p-2 border">Asig Mechanic</th>
//               <th className="p-2 border">Date</th>
              
//               <th className="p-2 border">Action</th>
//             </tr>
//           </thead>
//           <tbody className='text-center' >
//             {jobCards.map((job) => (
//         <tr key={job._id}  >
//             <td >{job.jobId}</td>        
//             <td >{job.customerName}</td>
//             <td>{job.contact}</td>
//             <td>{job.bikeModel}</td>
//             <td>{job.bikeNumber}</td>
//             <td>
//   <span
//     className={`px-2 py-1 rounded text-white text-sm font-medium ${
//       job.jobStatus === "Delivered"
//         ? "bg-blue-500"
//         : job.jobStatus === "completed"
//         ? "bg-green-500"
//         : job.jobStatus === "inprogress"
//         ? "bg-yellow-500"
//         : job.jobStatus === "pending"
//         ? "bg-red-500"
//         : "bg-gray-400"
//     }`}
//   >
//     {job.jobStatus}
//   </span>
// </td>
//             <td>{job.assignedMechanic?.name }</td>
//             <td>{new Date(job.createdAt).toLocaleDateString()}</td>
        
//                 <td className="p-2 border">
//                   <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2">
//                     View
//                   </button>
//                   <button className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 mr-2">
//                     Edit
//                   </button>
//                   <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             {jobCards.length === 0 && (
//               <tr>
//                 <td colSpan="7" className="p-4 text-center text-gray-500">
//                   No job cards found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }






import { useEffect, useState } from 'react';
import Api from '../../services/Api';

export default function ViewJobCards() {
  const [jobCards, setJobCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchJobCards = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await Api.get('/jobcards', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setJobCards(response.data);
      } catch (error) {
        console.error('Failed to fetch job cards:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobCards();
  }, []);

  if (loading) return <p>Loading...</p>;

  // 🔍 Filter logic based on multiple fields
  const filteredJobs = jobCards.filter((job) => {
    const date = new Date(job.createdAt).toLocaleDateString();
    return (
      job.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.bikeNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      date.includes(searchTerm)
    );
  });

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      {/* 🔝 Heading + Search box in flex */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">All Job Cards List</h2>
        <input
          type="text"
          placeholder="Search by name, bike, contact, date"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Table with scrollable area */}
      <div className="overflow-y-auto max-h-[550px]">
        <table className="w-full text-center table-auto border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Job ID</th>
              <th className="p-2 border">Customer Name</th>
              <th className="p-2 border">Contact No</th>
              <th className="p-2 border">Bike Model</th>
              <th className="p-2 border">Bike Number</th>
              <th className="p-2 border">Job Status</th>
              <th className="p-2 border">Assigned Mechanic</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {filteredJobs.map((job) => (
              <tr key={job._id}>
                <td>{job.jobId}</td>
                <td>{job.customerName}</td>
                <td>{job.contact}</td>
                <td>{job.bikeModel}</td>
                <td>{job.bikeNumber}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded text-white text-sm font-medium ${
                      job.jobStatus === 'Delivered'
                        ? 'bg-blue-500'
                        : job.jobStatus === 'completed'
                        ? 'bg-green-500'
                        : job.jobStatus === 'inprogress'
                        ? 'bg-yellow-500'
                        : job.jobStatus === 'pending'
                        ? 'bg-red-500'
                        : 'bg-gray-400'
                    }`}
                  >
                    {job.jobStatus}
                  </span>
                </td>
                <td>{job.assignedMechanic?.name}</td>
                <td>{new Date(job.createdAt).toLocaleDateString()}</td>
                <td className="p-2 border">
                  <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2">
                    View
                  </button>
                  <button className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 mr-2">
                    Edit
                  </button>
                  <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredJobs.length === 0 && (
              <tr>
                <td colSpan="9" className="p-4 text-center text-gray-500">
                  No matching job cards found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
