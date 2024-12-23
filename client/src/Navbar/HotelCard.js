import React from 'react';
import "./hotelcard.css";

const HotelCard = ({ imageUrl, name, capacity, cost, address }) => {
    let token = localStorage.getItem("usersdatatoken");
  const bookHotel = async() => {
    // Implement your booking logic here
    const data = await fetch("http://localhost:8009/hotel",{
               method:"POST",
               headers:{
                  "Content-Type":"application/json",
                  "Authorization":token
               },
               body: JSON.stringify({
                name,
                capacity,
                imageUrl,
                cost,
                address
              })
              
              
            });
            const res = await data.json();
           if(res.error){
            alert(res.error);
           }
           else{
            alert("sucessfully booked");
           }
  };

  

  return (
    <div className="hotel-card">
      <div className="image">
        <img src={imageUrl} alt={name} />
      </div>
      <div className="details">
        <h2>{name}</h2><br/>
        <p>Capacity: {capacity}</p><br/>
        <p>Cost: {cost}</p><br/>
        <p>Warranty and Support: {address}</p><br/>
        <button onClick={bookHotel}>Book</button>
      </div>
    </div>
  );
};

export default HotelCard;
