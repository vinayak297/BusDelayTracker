const express = require("express");
const app = express();
const path = require("path");

// Serve frontend
app.use(express.static(path.join(__dirname, "public")));

// In-memory bus state
let bus = {
  busNumber: "23A",
  etaMinutes: 6,
  delayMinutes: 0,
  status: "On the way",
  waitingCount: 0
};

// Simulate time passing
setInterval(() => {
  if (bus.status === "Arrived") return;

  if (bus.etaMinutes > 0) {
    bus.etaMinutes -= 1;
  }

  if (bus.etaMinutes <= 0) {
    bus.status = "Arrived";
  }
}, 5000);

// API routes
app.get("/bus", (req, res) => {
  res.json(bus);
});

app.get("/still-waiting", (req, res) => {
  bus.waitingCount += 1;

  if (bus.waitingCount >= 3) {
    bus.delayMinutes += 2;
    bus.etaMinutes += 2;
    bus.status = "Delayed (confirmed by crowd)";
    bus.waitingCount = 0;
  }

  res.json(bus);
});

app.get("/bus-arrived", (req, res) => {
  bus.status = "Arrived";
  bus.etaMinutes = 0;
  res.json(bus);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
