import React, { useEffect, useState } from "react";
import axios from "axios";

function TripList({ onSelectTrip, backendUrl }) {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    axios.get(`${backendUrl}/api/trips`)
      .then(res => {
        console.log("✅ Trips loaded:", res.data);
        setTrips(res.data);
      })
      .catch(err => console.error("❌ API Error:", err));
  }, [backendUrl]);

  return (
    <div>
      <h2>Available Trips</h2>
      {trips.map(trip => (
        <div
          key={trip.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
            color: "black",
          }}
        >
          <h3>{trip.title}</h3>
          <p>{trip.description}</p>
          <p>Price: ₹{trip.price}</p>
          <p>Duration: {trip.duration}</p>
          <button onClick={() => onSelectTrip(trip)}>Select</button>
        </div>
      ))}
    </div>
  );
}

export default TripList;
