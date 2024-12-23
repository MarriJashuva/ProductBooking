import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Error from '../components/Error';

const BookedSlots = () => {

  let token = localStorage.getItem("usersdatatoken");

  const [hotelData, setHotelData] = useState([]);
  const img1 = "https://tse3.mm.bing.net/th?id=OIP.RjxRjPz9tlX7ZB41DHGEkwHaEK&pid=Api&P=0&h=180";
  const [data,setData] = useState(false);
  const bookHotel = async () => {
    // Implement your booking logic here
    const data = await fetch("http://localhost:8009/gethotel", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization":token
      }
    });
    const res = await data.json();
    console.log(res);
    setHotelData(res);

    // Update state with fetched data

  };

  
  

  // Fetch hotel data when the component mounts
  useEffect(() => {
    bookHotel();
  }, []);

  useEffect(() => {
    // This useEffect will run whenever hotelData changes.
    // You can use hotelData here or perform any actions you need
    console.log(hotelData);
  }, [hotelData]);


  const handleDelete = async (_id) => {
    try {
      const response = await fetch(`http://localhost:8009/deletehotel/${_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });
  
      if (response.status === 200) {
        // If the server responds with success, filter out the deleted hotel
        const filterData = hotelData.filter((eachItem) => eachItem._id !== _id);
        setHotelData(filterData);
      } else if (response.status === 404) {
        console.error("Hotel not found");
      } else {
        console.error("Failed to delete hotel");
      }
    } catch (error) {
      console.error("Error deleting hotel:", error);
    }
  };
 

  return (
    <div>
      {(() => {
        if (token) {
          return (
            <>
              <Navbar />

 

  <div>
        {
            hotelData.map((eachItem,index)=>{
                const {name,capacity,imageUrl,cost,address,_id} = eachItem;
                return(
             <div key={index}>
              
    
    <div className="hotel-card">
    <div className="image">
          <img src={imageUrl} alt={name} />
    </div>
     <div className="details">
        <h2>Name : {name}</h2><br/>
        <p>Capacity: {capacity}</p><br/>
        <p>cost: {cost}</p><br/>
        <p>address: {address}</p><br/>
        <button onClick={()=>handleDelete(_id)}>delete</button>
      </div>
      </div>
    
           </div>
                );
            })
        }
    </div>


    </>
          );
        } else {
          return <Error />;
        }
      })()}
    </div>
  );
}

export default BookedSlots
