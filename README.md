# Bus Delay Tracker 🚌

A backend application that simulates real-time bus arrival delays using **crowd-sourced inputs**.

---

## 🚩 Problem
At bus stops, passengers often don’t know:
- Whether the bus is slightly late or very late
- Whether the bus has already arrived
- Whether waiting is still worth it

Most bus systems do not provide accurate, live delay information.

---

## 💡 Solution
This project demonstrates a backend system where:
- A bus’s ETA updates automatically over time
- Passengers can report **“Still waiting”**
- Delay is confirmed only after multiple people report waiting
- Anyone can confirm when the bus has arrived

This reduces false delay reports and mimics real-world crowd validation.

---

## ⚙️ How It Works

### Bus State Includes:
- Bus number
- ETA (in minutes)
- Delay (in minutes)
- Status (On the way / Delayed / Arrived)
- Waiting count (crowd reports)

### Crowd Logic:
- 1–2 people reporting → no delay
- 3 people reporting → delay confirmed
- Waiting count resets after delay confirmation

---

## 🔗 API Endpoints

| Endpoint | Description |
|--------|------------|
| `/bus` | Get current bus status |
| `/still-waiting` | Report that the bus has not arrived |
| `/bus-arrived` | Confirm that the bus has arrived |

---

## ▶️ How to Run Locally

```bash
git clone https://github.com/vinayak297/BusDelayTracker.git
cd BusDelayTracker/backend
npm install
node index.js
