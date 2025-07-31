import React, { useEffect, useState } from "react";

function TripList({ onSelectTrip, backendUrl }) {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    fetch(`${backendUrl}/api/trips`)
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Trips loaded:", data);
        setTrips(data);
      })
      .catch((err) => console.error("❌ API Error:", err));
  }, [backendUrl]);

  const getImage = (title) => {
    if (title === "Goa") {
      return "https://images.unsplash.com/photo-1507525428034-b723cf961d3e";
    }
    if (title === "Gokarna") {
      return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSPbEKJNHUzfTxkVGuQyCK0Fs_ixywn1EuFA&s";
    }

    // Optional fallback image
    return "https://via.placeholder.com/300x200?text=Trip";
  };

  return (
    <div className="trip-grid">
      {trips.map((trip) => (
        <div
          key={trip.id}
          className="trip-tile"
          style={{ backgroundImage: `url(${getImage(trip.title)})` }}
        >
          <div className="overlay">
            <h3>{trip.title}</h3>
            <p>{trip.description}</p>
            <p><strong>Price:</strong> ₹{trip.price}</p>
            <p><strong>Duration:</strong> {trip.duration}</p>
            <button onClick={() => onSelectTrip(trip)}>View Details</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TripList;