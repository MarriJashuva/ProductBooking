import React, { useContext, useEffect, useState } from "react";
import Header from "./components/Header";
import Login from "./components/Login";
import { Routes, Route, useNavigate } from "react-router";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Error from "./components/Error";
import { LoginContext } from "./components/ContextProvider/Context";
import SlotsToBook from "./Navbar/SlotsToBook";
import BookedSlots from "./Navbar/BookedSlots";
import Home1 from "./Navbar/Home1";
import AdminDashboard from "./components/AdminDashboard"; // Import Admin Page

function App() {
  const [data, setData] = useState(false);
  const { logindata, setLoginData } = useContext(LoginContext);
  const history = useNavigate();

  const DashboardValid = async () => {
    let token = localStorage.getItem("usersdatatoken");
    const res = await fetch("http://localhost:8009/validuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      },
    });

    const data = await res.json();
    if (data.status === 401 || !data) {
      console.log("user not valid");
    } else {
      console.log("user verify");
      setLoginData(data.ValidUserOne.email);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      DashboardValid();
      setData(true);
    }, 2000);
  }, []);

  return (
    <>
      {data ? (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dash" element={<Dashboard />} />
            <Route path="/home" element={<Home1 />} />
            <Route path="/admin-dashboard" element={<AdminDashboard/>} />
            <Route path="/bookedslots" element={<BookedSlots />} />
            <Route path="/slotstobook" element={<SlotsToBook />} />
            
            {/* Admin Route */}
            <Route 
              path="/admin-dashboard" 
              element={<AdminDashboard />} 
            />

            <Route path="*" element={<Error />} />
          </Routes>
        </>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh" }}>
          Loading... &nbsp;
          <CircularProgress />
        </Box>
      )}
    </>
  );
}

export default App;
