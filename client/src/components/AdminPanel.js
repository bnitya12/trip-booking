import React, { useEffect, useState } from "react";

function AdminPanel({ backendUrl }) {
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
    <div>
      <h2>📋 Admin Panel – All Bookings</h2>
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
