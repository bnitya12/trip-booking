import React, { useState } from "react";
import TripList from "./components/TripList";
import AdminPanel from "./components/AdminPanel";
import "./styles.css";

function App() {
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const [available, setAvailable] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    return date.toISOString().split("T")[0];
  };

  const checkAvailability = async () => {
    if (!date) {
      alert("Please select a date!");
      return;
    }

    const formattedDate = formatDate(date);

    try {
      const response = await fetch("https://trip-booking-ni0w.onrender.com/api/check-availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: formattedDate }),
      });

      const result = await response.json();

      if (!result.available) {
        setAvailable(false);
        setStatus("❌ No vans available on selected date. Try another one.");
      } else {
        setAvailable(true);
        setStatus("✅ Van available on selected date.");
      }
    } catch (error) {
      console.error("Availability check error:", error);
      setStatus("❌ Something went wrong while checking availability.");
    }
  };

  const handleBooking = async () => {
    if (!available || !date) {
      alert("Please check availability before booking.");
      return;
    }

    const formattedDate = formatDate(date);

    try {
      const bookRes = await fetch("https://trip-booking-ni0w.onrender.com/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "TestUser",
          tripId: selectedTrip.id,
          date: formattedDate,
        }),
      });

      const bookResult = await bookRes.json();
      setStatus(`✅ ${bookResult.message}`);
    } catch (error) {
      console.error("Booking error:", error);
      setStatus("❌ Something went wrong. Please try again.");
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>✈️ Trip Booking.com</h1>
        <div className="auth-buttons" style={{ textAlign: "right" }}>
          <button>Sign In</button>
          <button>Login</button>
          <button onClick={() => setShowAdmin(!showAdmin)}>Admin Login</button>
        </div>
      </header>

      {showAdmin && (
        <AdminPanel
          backendUrl="https://trip-booking-ni0w.onrender.com"
          onBack={() => setShowAdmin(false)}
        />
      )}

      {!selectedTrip && !showAdmin && (
        <TripList
          onSelectTrip={setSelectedTrip}
          backendUrl="https://trip-booking-ni0w.onrender.com"
        />
      )}

      {selectedTrip && !showAdmin && (
        <div className="booking-card">
          <h2>Booking: {selectedTrip.title}</h2>

          <label>Select Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <div className="booking-buttons">
            <button onClick={checkAvailability}>Check Availability</button>
            <button onClick={handleBooking}>Book Now</button>
          </div>

          <p className="status-message">{status}</p>

          <div className="booking-plan">
            <h3>Itinerary:</h3>
            <ul>
              {selectedTrip.title === "Goa" && (
                <>
                  <li><strong>Day 1:</strong> Arrival and Beach Exploration</li>
                  <li><strong>Day 2:</strong> Water Sports and Cruise Dinner</li>
                  <li><strong>Day 3:</strong> Old Goa Churches & Departure</li>
                </>
              )}
              {selectedTrip.title === "Gokarna" && (
                <>
                  <li><strong>Day 1:</strong> Temple Visit</li>
                  <li><strong>Day 2:</strong> Beach Hike & Sunset</li>
                  <li><strong>Day 3:</strong> Trek to Paradise Beach</li>
                  <li><strong>Day 4:</strong> Local Exploration</li>
                </>
              )}
              
            </ul>
          </div>

          <button
            onClick={() => {
              setSelectedTrip(null);
              setDate("");
              setStatus("");
              setAvailable(false);
            }}
          >
            ← Back
          </button>
        </div>
      )}
    </div>
  );
}

export default App;