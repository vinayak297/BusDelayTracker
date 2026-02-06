# Architecture

Initial app design and logic will be documented here.
# App Architecture

## Option 1: Backend Simulation
- Backend controls bus ETA
- ETA updates every few seconds
- Status changes automatically

## Option 2: Crowdsourced Updates
User actions:
- "Still waiting" → increases delay
- "Bus arrived" → confirms arrival

Backend aggregates multiple user inputs to adjust ETA.

