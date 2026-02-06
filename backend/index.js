const express = require("express");
const app = express();

app.get("/bus", (req, res) => {
  res.json({
    busNumber: "23A",
    etaMinutes: 6,
    delayMinutes: 2,
    status: "On the way"
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
