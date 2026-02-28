import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    revenue: 0,
  });
useEffect(() => {

  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
    return; 
  }

  const fetchUser = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_PORT}/user/dashboard`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 401) {
        // Token invalid → logout automatically
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
      }

    } catch (err) {
      console.log("Dashboard Fetch Error:", err.message);
    }
  };

  fetchUser();

}, [navigate]);


  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-100 flex">

      {/* ================= SIDEBAR ================= */}
      <div className="w-64 bg-indigo-700 text-white p-6 hidden md:block">
        <h2 className="text-2xl font-bold mb-10">MyApp</h2>

        <ul className="space-y-4">
          <li className="hover:bg-indigo-600 p-2 rounded cursor-pointer">
            Dashboard
          </li>
          <li className="hover:bg-indigo-600 p-2 rounded cursor-pointer">
            Users
          </li>
          <li className="hover:bg-indigo-600 p-2 rounded cursor-pointer">
            Settings
          </li>
        </ul>

        <button
          onClick={handleLogout}
          className="mt-10 w-full bg-red-500 hover:bg-red-600 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 p-8">

        {/* TOP BAR */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Dashboard
            </h1>
            <p className="text-slate-500 text-sm">
              Welcome {user?.name || "User"}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>

        {/* ================= STATS CARDS ================= */}
        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-slate-500">Total Users</h3>
            <p className="text-3xl font-bold mt-2">
              {stats.totalUsers}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-slate-500">Total Orders</h3>
            <p className="text-3xl font-bold mt-2">
              {stats.totalOrders}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-slate-500">Revenue</h3>
            <p className="text-3xl font-bold mt-2">
              ${stats.revenue}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;