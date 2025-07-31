// import {Routes, Route} from "react-router-dom"
// import DashboardLayout from "./layouts/DashboardLayout"
// import Home from "./pages/Home";
// import Customer from "./pages/Customer";
// import Billing from "./pages/Billing";
// import Dashboard from "./components/Dashboard";
// import CreateJobCard from "./components/JobCard/createJobCard";
// import ViewAllJobCards from "./components/JobCard/viewAllJobCard";
// import Login from "./pages/Login";
// import PrivateRoute from "./routes/PrivateRoutes";

// function App() {
//   return (


//      <Routes>
//       <Route path="/login" element={<Login />} />
//       <Route path="/dashboard/*" element={<DashboardLayout />} />
//     </Routes>
//     // <Routes>
//     //   <Route path="/login" element={<Login />} />
//     //   <Route path="/dashboard" element={<PrivateRoute />}>
//     //    <Route path="" element={<DashboardLayout />} />
//     //   </Route>




//     //   <Route path="/" element={<DashboardLayout />}>
//     //     <Route path="dashboard" element={<Dashboard />} />
//     //     <Route index element={<Dashboard />} />
//     //     <Route path="/jobcard/createJob" element={<CreateJobCard />} />
//     //     <Route path="/jobcard/viewAll" element={<ViewAllJobCards />} />

        
//     //   </Route>
//     // </Routes>
//   );
// }


// export default App



import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoutes"; // your custom auth guard
import DashboardLayout from "./layouts/DashboardLayout";
import Login from "./pages/Login";
import CreateJobCard from "./components/JobCard/createJobCard";
import ViewAllJobCards from "./components/JobCard/viewAllJobCard";
import Dashboard from "./components/Dashboard";


function App() {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/login" element={<Login />} />

      {/* Protected route */}
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/" element={<DashboardLayout />}>
          <Route path="/" element={<Dashboard />} /> 
          <Route path="/job-card/create-job-card" element={<CreateJobCard />} />
          <Route path="/job-card/view-job-cards" element={<ViewAllJobCards />} />
          {/* Add more nested routes */}
        </Route>
      </Route>

      {/* Optional: redirect unknown route */}
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default App;
