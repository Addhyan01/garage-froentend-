// import React, {useState, useEffect} from 'react'
// import axios from 'axios'
// import Api from '../services/Api'       

// const Dashboard = () => {

//     const [summary, setSummary] = useState({
//         todayEarnings: 0,
//         todayTotalBills: 0,
//         ongoingServices: 0,
//         todayDeliveries: 0,
//         todayAvailableStaff: 0,
//         todayBookings: 0,
//         completedServices: 0,
//     })


//     useEffect(() => {
//     const fetchDashboardSummary = async () => {
//       try {
//         const res = await Api.get('/dashboard/summary'); // change path if needed
//         console.log(res.data);
//         setSummary(res.data);
//       } catch (error) {
//         console.error('Error fetching dashboard data:', error);
//       }
//     };

//     fetchDashboardSummary();
//   }, []);


//     return (
//          <div>
//       <h2>Dashboard</h2>
//       <ul>
        
//         <li>Today’s Earnings: ₹{summary.todayEarnings}</li>
//         <li>Today’s No of Bill's: ₹{summary.todayTotalBills}</li>
//         <li>In-Progress Services: {summary.ongoingServices}</li>
//         <li>Today's Completed Services Services: {summary.completedServices}</li>
//         <li>Today’s Deliveries: {summary.todayDeliveries}</li>
//         <li>Today Available Staff: {summary.todayAvailableStaff}</li>
//         <li>Today No of Bookings : {summary.todayBookings}</li>
        
        



       
      
//       </ul>
//     </div>
//     )
// }

// export default Dashboard;

import React, { useEffect, useState } from 'react';
import API from '../services/Api';
import { FaMoneyBillWave, FaTools, FaFileInvoice, FaTruck, FaUserCheck } from 'react-icons/fa';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [data, setData] = useState({
    totalBills: 0,
    todayEarnings: 0,
    ongoingServices: 0,
    todayDeliveries: 0,
    todayBookings:0,
    todayAvailableStaff: 0,
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await API.get('/dashboard/summary');
        setData(res.data);
      } catch (error) {
        console.error('Error fetching dashboard:', error);
      }
    };

    fetchDashboard();
  }, []);

  const cards = [
  {
    title: "Today's Earnings",
    value: `₹${data.todayEarnings}`,
    icon: <FaMoneyBillWave className="text-white text-3xl" />,
    color: 'bg-green-500',
  },
  {
    title: "Today's Bookings",
    value: data.todayBookings,
    icon: <FaUserCheck className="text-white text-3xl" />,
    color: 'bg-pink-500',
  },
  {
    title: 'Pending Services',
    value: data.pendingServices,
    icon: <FaFileInvoice className="text-white text-3xl" />,
    color: 'bg-blue-500',
  },
  {
    title: 'Ongoing Services',
    value: data.ongoingServices,
    icon: <FaTools className="text-white text-3xl" />,
    color: 'bg-yellow-500',
  },
  {
    title: "Completed Services",
    value: data.completedServices,
    icon: <FaUserCheck className="text-white text-3xl" />,
    color: 'bg-red-500', // 🔁 changed from pink-500
  },
  {
    title: "Today's Deliveries",
    value: data.todayDeliveries,
    icon: <FaTruck className="text-white text-3xl" />,
    color: 'bg-purple-500',
  },
  {
    title: 'Total Bills',
    value: data.todayTotalBills,
    icon: <FaFileInvoice className="text-white text-3xl" />,
    color: 'bg-blue-500',
  },
  {
    title: "Available Staff",
    value: data.todayAvailableStaff,
    icon: <FaUserCheck className="text-white text-3xl" />,
    color: 'bg-indigo-500', // 🔁 changed from pink-500
  },
];

const pieData = [
  { name: 'Ongoing', value: data.ongoingServices },
  { name: 'Completed', value: data.completedServices },
  { name: 'Delivered', value: data.todayDeliveries },
  { name: 'Pending', value: data.pendingServices },
];
const COLORS = ['#FACC15', '#22C55E', '#8B5CF6', '#EF4444'];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`rounded-xl p-4 shadow-lg text-white flex items-center gap-4 ${card.color}`}
          >
            <div className="p-3 bg-white/20 rounded-full">{card.icon}</div>
            <div>
              <p className="text-lg font-semibold">{card.title}</p>
              <p className="text-xl font-bold">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="col-span-1 md:col-span-2 bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-4">Service Status Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
    </div>
  );
};

export default Dashboard;
