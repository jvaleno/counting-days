# Counting Days

A Chromium browser extension that counts down the days until your next event or deadline.

## Features

- Set a target date and event name for your countdown
- Displays the number of days remaining in the browser toolbar badge
- Toggle between calendar days and workdays (Monday–Friday)
- Settings are synced across devices via Chrome storage sync

## Installation

1. Clone or download this repository.
2. Open your Chromium-based browser and navigate to `chrome://extensions/`.
3. Enable **Developer mode** (toggle in the top right).
4. Click **Load unpacked** and select the `countdownDays` folder.

The extension icon will appear in your toolbar.

## Usage

1. Click the extension icon to open the popup.
2. Enter the name of your event in the **"To this event"** field.
3. Select the target date using the date picker.
4. Optionally check **"Only count workdays?"** to exclude weekends from the count.

The countdown updates automatically and persists between browser sessions.

## Project Structure

```
countdownDays/
├── index.html          # Popup UI
├── manifest.json       # Extension manifest (MV3)
├── grey_on_white_clock.png  # Extension icon
├── css/
│   └── styles.css      # Popup styles
└── js/
    ├── countdown.js    # Popup logic and storage sync
    ├── background.js   # Service worker (badge updates)
    └── utils.js        # Workday calculation and badge helper
```

## Compatibility

Works with any Chromium-based browser that supports Manifest V3 (Chrome, Edge, Brave, etc.).

## Author

Jørgen Valen
