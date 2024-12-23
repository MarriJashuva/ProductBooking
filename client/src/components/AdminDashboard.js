import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import for navigation
import "./admin.css";

const AdminDashboard = () => {
  const [hallData, setHallData] = useState([]);
  const [error, setError] = useState(''); // State for error messages
  const navigate = useNavigate(); // Hook to redirect after logout

  // Fetch hall data
  const fetchHalls = async () => {
    try {
      const response = await fetch("http://localhost:8009/gethalls", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch halls");
      }

      const res = await response.json();
      setHallData(res);
    } catch (error) {
      setError("Error fetching halls data. Please try again later.");
    }
  };

  // Fetch hall data on component mount
  useEffect(() => {
    fetchHalls();
  }, []);  // Only run once when the component mounts

  // Handle delete hall
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8009/deletehall/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.status === 200) {
        // Filter out the deleted hall from the state
        const updatedHalls = hallData.filter(hall => hall._id !== id);
        setHallData(updatedHalls);
      } else {
        setError("Failed to delete the hall. Please try again.");
      }
    } catch (error) {
      setError("Error deleting the hall. Please try again later.");
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Example if using localStorage for auth token
    navigate('/login'); // Navigate to login page after logout
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Here you can manage all booked Products efficiently.</p>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>

      {error && <div className="error-message">{error}</div>} {/* Display error messages */}

      <div className="hall-container">
        {hallData.length > 0 ? (
          hallData.map((eachHall) => {
            const { name, capacity, imageUrl, cost, address, _id, username, email } = eachHall;
            return (
              <div key={_id} className="hall-card">
                <div className="image">
                  <img src={imageUrl} alt={name} />
                </div>
                <div className="details">
                  <h2>{name}</h2>
                  <h3>Username: {username}</h3>
                  <h3>Email: {email}</h3>
                  <p>Capacity: {capacity}</p>
                  <p>Cost: ${cost}</p>
                  <p>Warranty and Support: {address}</p>
                  <button className="delete-button" onClick={() => handleDelete(_id)}>
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p>No halls available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
