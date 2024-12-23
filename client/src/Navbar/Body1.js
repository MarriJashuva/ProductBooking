import React from "react";
import "./body.css";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const Body1 = () => {
  const img1 = "https://assets.newatlas.com/dims4/default/01e5aaf/2147483647/strip/true/crop/1200x900+0+0/resize/1200x900!/quality/90/?url=http:%2F%2Fnewatlas-brightspot.s3.amazonaws.com%2Fba%2Ff5%2F8e295e944136b5e4a13abf29d91e%2F00-header.jpg";
  const img2 = "https://images-na.ssl-images-amazon.com/images/I/71B-5ZUUl3L._AC_SL1500_.jpg";
  const img3 = "https://laptopmedia.com/wp-content/uploads/2022/07/3-1.jpg";
  const img4="https://miro.medium.com/max/1736/0*6PxAADzstr31By24.jpg";
  return (
    <div className="myclr">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Welcome to Explore Products
            </h1>
            
          </div>
          <Link to="/slotstobook" className="btn explore-venues">
            Explore Products
          </Link>
        </div>
      </section>
      <h1 className="ven">View Products</h1>
      <br/>
      <br/>
      <div className="card-container">
        <div className="card">
          <img src={img1} width={380} height={230} />
          <br />
          <br />
          <button>
            <Link to="/slotstobook" className="nav-link">
            view
            </Link>
          </button>
        </div>
        
        <div className="card">
          <img src={img2} width={380} height={230} />
          <br />
          <br />
          <button>
            <Link to="/slotstobook" className="nav-link">
            view
            </Link>
          </button>
        </div>
        <div className="card">
          <img src={img3} width={380} height={230} />
          <br />
          <br />
          <button>
            <Link to="/slotstobook" className="nav-link">
            view
            </Link>
          </button>
        </div>
        <div className="card">
          <img src={img4} width={380} height={230} />
          <br />
          <br />
          <button>
            <Link to="/slotstobook" className="nav-link">
            view
            </Link>
          </button>
        </div>
      </div>
      <br />
      <br />
      <br/>
      <br/>

      
    <br/>
    <Footer/>
    </div>
  );
};

export default Body1;
