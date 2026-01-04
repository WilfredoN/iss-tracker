# Satellite Tracker Pet Project

## Satellite Tracker Dashboard with Telegram Bot and Cesium Globe Satellites Render

> Was started as tutorial-following project for ISS tracking

![ISS Tracker demo screenshot](public/demo.png)

## Refactor plan:

- [ ] Create apps/ directory for modules
- [ ] Migrate vanilla js to react
- [ ] Make it work with any satellite (>=1)
- [ ] Create backend API to keep user data and his satellites
- [ ] Create telegram bot to have push notifications when satellite is near
- [ ] Combine the client and tg bot with a backend API in Dashboard app

## Install

```bash
git clone https://github.com/WilfredoN/satellite-tracker.git
cd satellite-tracker
cp .env.example .env
# Fill in your Cesium Ion API key
pnpm install
pnpm run dev
```
