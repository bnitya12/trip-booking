import React, { useEffect, useState } from "react";

function AdminPanel({ backendUrl, onBack }) {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch(`${backendUrl}/api/bookings`)
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
      })
      .catch((err) => console.error("❌ Admin fetch error:", err));
  }, [backendUrl]);

  return (
    <div className="admin-panel" style={{ padding: "20px", background: "#f0f0f0", borderRadius: "10px" }}>
      <h2>📋 Admin Panel – All Bookings</h2>

      <button onClick={onBack} style={{ marginBottom: "20px", background: "#2275e8ff", color: "#fff", padding: "8px 16px", border: "none", borderRadius: "5px", cursor: "pointer" }}>
        ← Back to Home
      </button>

      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>User Name</th>
              <th>Trip</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b, index) => (
              <tr key={index}>
                <td>{b.name}</td>
                <td>{b.trip}</td>
                <td>{b.date}</td>
                <td>{b.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminPanel;
