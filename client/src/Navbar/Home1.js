import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Error from '../components/Error';
import Body1 from './Body1';


const Home1 = () => {

 const img1 = "https://tse3.mm.bing.net/th?id=OIP.RjxRjPz9tlX7ZB41DHGEkwHaEK&pid=Api&P=0&h=180";
 
 let token = localStorage.getItem("usersdatatoken");


 return (
  <div>
    {(() => {
      if (token) {
        return (
          <>
            <Navbar />
            <Body1/>
          </>
          );
        } else {
          return <Error />;
        }
      })()}
    </div>
  );
}

export default Home1
