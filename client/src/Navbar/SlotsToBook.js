import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Error from '../components/Error';
import HotelCard from './HotelCard';
import Footer from './Footer';

const SlotsToBook = () => {

  let token = localStorage.getItem("usersdatatoken");
 


  return (
    <div>
      {(() => {
        if (token) {
          return (
            <>
              <Navbar />
<div className="App">
      {/* 1 */}
   
      <HotelCard
        imageUrl="https://cdn.mos.cms.futurecdn.net/t8DxZU65K3rL3Me6sxQUAA-1920-80.jpg"
        name="Apple, iPhone 15"
        capacity="A16 Bionic chip, 6.1-inch Super Retina XDR display, 128GB storage, 20-hour battery life."
        cost="$10000"
        address="1-year limited warranty, 90 days technical support"
      />
      {/* 2 */}
      <HotelCard
        imageUrl="https://m.media-amazon.com/images/I/61VfL-aiToL._SL1500_.jpg"
        name="Samsung, Galaxy S23"  
        capacity="Snapdragon 8 Gen 2, 6.1-inch AMOLED display, 256GB storage, 25W fast charging."  
        cost="$849"  
         address="1-year manufacturer warranty, free software updates for 4 years" 
      />
      {/* 3 */}
      <HotelCard
        imageUrl="https://paidfreedroid.com/wp-content/uploads/2020/12/Dell-XPS-13-9310-scaled.jpg"
        name="Dell, XPS 13 9310"  
        capacity="Intel i7, 16GB RAM, 512GB SSD, 13.3-inch InfinityEdge touchscreen."  
        cost="$1,199"  
        address="1-year premium support with accidental damage service"
      />
      {/* 4 */}
      <HotelCard
        imageUrl="https://www.uboncomputer.co.th/pub/media/catalog/product/cache/566bac40c34e1b79304197de40a22c99/i/p/ipad_pro_wi-fi_11_in_4th_gen_silver_8_1.jpg"
        name="Apple, iPad Pro 11-inch (2024)"  
        capacity="M2 chip, 11-inch Liquid Retina display, 256GB storage, Pencil and Magic Keyboard support."  
        cost="$899"  
        address="1-year limited warranty, optional AppleCare+"  

      />
      {/* 5 */}
      <HotelCard
        imageUrl="https://highxtar.com/wp-content/uploads/2023/06/IMG_5175-1200x675.jpg"
        name="Sony, WH-1000XM5"  
        capacity="Noise cancellation, 30-hour battery life, Bluetooth 5.2, 40mm drivers."  
        cost="$399"  
        address="1-year limited warranty, customer care support"  

      />
      {/* 6 */}
      <HotelCard
        imageUrl="https://cdn.mos.cms.futurecdn.net/RsAZMsVDJxqSWbdPRP43kh.jpg"
        name="LG, OLED C3 Series"  
        capacity="55-inch 4K OLED display, HDR10 Pro, Dolby Atmos, webOS smart platform."  
        cost="$1,499"  
        address="1-year parts and labor warranty" 
      />
      {/* 7 */}
      <HotelCard
        imageUrl="https://sm.pcmag.com/t/pcmag_uk/review/c/canon-eos-/canon-eos-r6-mark-ii_uehs.3840.jpg"
        name="Canon, EOS R6 Mark II"  
        capacity="24.2 MP full-frame sensor, 4K video recording, 20 fps burst mode, Dual Pixel AF."  
        cost="$2,499"  
        address="1-year limited warranty, free firmware updates"
      />
      {/* 8 */}
      <HotelCard
        imageUrl="https://cdn.mos.cms.futurecdn.net/QWRX5D22ak5rgDhWPZ9o7Q.jpg"
        name="Samsung Galaxy S23"  
        capacity="Snapdragon 8 Gen 2, 6.1-inch AMOLED display, 256GB storage, 25W fast charging"  
        cost="$849"  
        address="1-year manufacturer warranty, free software updates for 4 years" 
      />
      <br/>
      <br/>

      <Footer/>
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

export default SlotsToBook
