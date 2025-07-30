import React, { useState } from "react";
import TripList from "./components/TripList";
import AdminPanel from "./components/AdminPanel";
import "./styles.css";

function App() {
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");

  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    return date.toISOString().split("T")[0];
  };

  const handleBooking = async () => {
    if (!date) {
      alert("Please select a date!");
      return;
    }

    const formattedDate = formatDate(date);

    try {
      // ✅ Backend URL from Render
      const response = await fetch("https://trip-booking-ni0w.onrender.com/api/check-availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: formattedDate }),
      });

      const result = await response.json();

      if (!result.available) {
        setStatus("❌ No vans available on selected date. Try another one.");
        return;
      }

      const bookRes = await fetch("https://trip-booking-ni0w.onrender.com/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "TestUser", // You can later replace this with real name input
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
        <h1>Trip Booking App</h1>
        <div className="auth-buttons">
          <button>Sign In</button>
          <button>Login</button>
        </div>
      </header>

      <AdminPanel backendUrl="https://trip-booking-ni0w.onrender.com" />

      {!selectedTrip && <TripList onSelectTrip={setSelectedTrip} backendUrl="https://trip-booking-ni0w.onrender.com" />}

      {selectedTrip && (
        <div style={{ marginTop: "30px" }}>
          <h2>Booking: {selectedTrip.title}</h2>

          <label>Select Date: </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <br />
          <button onClick={handleBooking} style={{ padding: "8px 16px" }}>
            Check Availability & Book
          </button>

          <p className="status-message">{status}</p>

          <button
            onClick={() => {
              setSelectedTrip(null);
              setDate("");
              setStatus("");
            }}
            style={{ marginTop: "10px" }}
          >
            ← Back
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
