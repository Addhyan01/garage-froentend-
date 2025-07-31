import { Link, Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';


export default function DashboardLayout() {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState({
    jobcard: false,
    settings: false,
  });

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex">
      <aside className="w-64 h-screen bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">🏍 Garage Dashboard</h2>
        <nav className="flex flex-col gap-2">

          <Link
            to="/"
            className={`p-2 rounded ${isActive('/') ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
          >
            Home
          </Link>

          {/* Job Card Menu */}
          <div>
            <button
              className="flex justify-between w-full p-2 rounded hover:bg-gray-700"
              onClick={() => toggleMenu('jobcard')}
            >
              <span>Job Card</span>
              {openMenus.jobcard ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {openMenus.jobcard && (
              <div className="ml-4 flex flex-col gap-1">
                <Link
                  to="/job-card/create-job-card"
                  className={`p-2 rounded ${isActive('/job-card/create-job-card') ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                >
                  Create Job Card
                </Link>
                <Link
                  to="/job-card/view-job-cards"
                  className={`p-2 rounded ${isActive('/job-card/view-job-cards') ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                >
                  Job Card List
                </Link>
              </div>
            )}
          </div>

          <Link
            to="/customers"
            className={`p-2 rounded ${isActive('/customers') ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
          >
            Customers
          </Link>

          <Link
            to="/billing"
            className={`p-2 rounded ${isActive('/billing') ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
          >
            Billing
          </Link>

          <Link
            to="/services"
            className={`p-2 rounded ${isActive('/services') ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
          >
            Services
          </Link>

          <Link
            to="/stock"
            className={`p-2 rounded ${isActive('/stock') ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
          >
            Stock
          </Link>

          <Link
            to="/team"
            className={`p-2 rounded ${isActive('/team') ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
          >
            Team
          </Link>

          {/* Settings Menu */}
          <div>
            <button
              className="flex justify-between w-full p-2 rounded hover:bg-gray-700"
              onClick={() => toggleMenu('settings')}
            >
              <span>Settings</span>
              {openMenus.settings ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {openMenus.settings && (
              <div className="ml-4 flex flex-col gap-1">
                <Link
                  to="/settings/profile"
                  className={`p-2 rounded ${isActive('/settings/profile') ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                >
                  Profile Settings
                </Link>
                <Link
                  to="/settings/password"
                  className={`p-2 rounded ${isActive('/settings/password') ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                >
                  Change Password
                </Link>
              </div>
            )}
          </div>

        </nav>
      </aside>

      <main className="flex-1 p-4  bg-gray-100 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
