const express = require("express");
const path = require("path");

const app = express();

// ================= FRONTEND =================
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ================= BUS STATE =================
let bus = {
  busNumber: "23A",
  etaMinutes: 5,
  delayMinutes: 0,
  status: "On the way",
  waitingCount: 0,
  requiredConfirmations: 3
};

// Simulate time
setInterval(() => {
  if (bus.status === "Arrived") return;
  if (bus.etaMinutes > 0) bus.etaMinutes -= 1;
  if (bus.etaMinutes === 0) bus.status = "Arrived";
}, 5000);

// ================= API =================
app.get("/bus", (req, res) => {
  res.json(bus);
});

app.get("/still-waiting", (req, res) => {
  if (bus.status === "Arrived") return res.json(bus);

  bus.waitingCount++;

  if (bus.waitingCount >= bus.requiredConfirmations) {
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
  bus.waitingCount = 0;
  res.json(bus);
});

// ================= SERVER =================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
