import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { LoginContext } from './ContextProvider/Context';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Navbar from '../Navbar/Navbar';
import Home1 from '../Navbar/Home1';

const Dashboard = () => {

  const {logindata,setLoginData} = useContext(LoginContext);
  const [data,setData] = useState(false);
  // console.log(logindata);

  const history = useNavigate();

    const DashboardValid = async()=>{
        let token = localStorage.getItem("usersdatatoken");
        const res = await fetch("http://localhost:8009/validuser", {
          method: "GET",
          headers: {
            "Content-Type":"application/json",
            "Authorization":token
          }
        });
        

         const data = await res.json();
        //  console.log(data);

        if(data.status === 401 || !data){
               history("*");
        }else{
          console.log("user verify");
          setLoginData(data.ValidUserOne.email);
          history("/dash");
        }
        
    } 

    useEffect(()=>{
      setTimeout(()=>{
        DashboardValid();
        setData(true);
      },2000)
    },[]);



  return (
   <>
   {
    data ?  <Home1/> : <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh" }}>
          Loading... &nbsp;
          <CircularProgress />
        </Box>
   }
   
   </>
  )
}

export default Dashboard
