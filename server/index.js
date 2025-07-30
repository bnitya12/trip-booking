const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5500;

app.use(cors());
app.use(express.json());

console.log("\u{1F525} Starting backend...");

const trips = [
  {
    id: 1,
    title: "Goa",
    description: "Relax on the beach, enjoy parties and shacks",
    price: 2500,
    duration: "3 Days"
  },
  {
    id: 2,
    title: "Gokarna",
    description: "Peaceful beach town with temples and treks",
    price: 1800,
    duration: "4 Days"
  }
];

const bookings = [];

app.get("/api/trips", (req, res) => {
  console.log("\u{2705} /api/trips route HIT");
  res.json(trips);
});

app.post("/api/check-availability", (req, res) => {
  const { date } = req.body;

  if (!date) {
    console.log("\u{274C} No date received");
    return res.status(400).json({ message: "Date is required" });
  }

  const count = bookings.filter(b => b.date === date).length;
  res.json({ available: count < 5 });
});

app.post("/api/book", (req, res) => {
  console.log("\u{1F4E5} Booking request:", req.body);

  const { name, tripId, date } = req.body;

  if (!name || !tripId || !date) {
    return res.status(400).json({ message: "Missing booking details" });
  }

  const count = bookings.filter(b => b.date === date).length;
  if (count >= 5) {
    return res.status(400).json({ message: "No vans available" });
  }

  const booking = { name, tripId, date, status: "Confirmed" };
  bookings.push(booking);
  console.log("\u{2705} Booking confirmed:", booking);

  res.json({ message: "Booking successful" });
});

app.get("/api/bookings", (req, res) => {
  const detailed = bookings.map(b => ({
    ...b,
    trip: trips.find(t => t.id === b.tripId)?.title || "Unknown Trip"
  }));
  res.json(detailed);
});

app.listen(PORT, () => {
  console.log(`\u{1F680} Listening on http://localhost:${PORT}`);
});
