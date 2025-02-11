import { calculateWorkdays, updateBadge } from './utils.js';

var countDownDate;
var eventName;
var workdaysToggled = false;
var workdays = 0;

// Function to update the countdown display
function updateCountdownDisplay() {
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24)) + 1;

    var endDate = new Date(countDownDate);
    var startDate = new Date(now);
    workdays = calculateWorkdays(startDate, endDate);

    if (!eventName) {
        eventName = "your event";
    }

    var feedbackText;
    if (workdaysToggled) {
        feedbackText = "It is " + workdays + " workdays until " + eventName + "!";
    } else {
        feedbackText = "It is " + days + " days until " + eventName + "!";
    }

    if (days > 0) {
        document.getElementById("feedback").innerHTML = feedbackText;
    } else if (days === 0) {
        document.getElementById("feedback").innerHTML = "It is today! Happy " + eventName + "!";
    } else if (distance < 0) {
        clearInterval(x);
        document.getElementById("feedback").innerHTML = "EXPIRED";
    } else {
        document.getElementById("feedback").innerHTML = "";
    }

    updateBadge(countDownDate, workdaysToggled);
}

// Retrieve the countdown date and event name from storage
chrome.storage.sync.get(['countDownDate', 'eventName', 'workdaysToggled', 'workdays'], function(result) {
    if (result.countDownDate) {
        countDownDate = result.countDownDate;
        document.getElementById("date").value = new Date(countDownDate).toISOString().split('T')[0];
    }
    if (result.eventName) {
        eventName = result.eventName;
        document.getElementById("event").value = eventName;
    }
    if (result.workdaysToggled !== undefined) {
        workdaysToggled = result.workdaysToggled;
        document.getElementById("toggleWorkdays").checked = workdaysToggled;
    }
    if (result.workdays !== undefined) {
        workdays = result.workdays;
    }
    updateCountdownDisplay();
});

// Set the date we're counting down to
countDownDate = new Date(document.getElementById("date").value).getTime();

// Update the countdown display every 1 second
var x = setInterval(updateCountdownDisplay, 1000);

// Add event listener to update countdown when date input changes
document.getElementById("date").addEventListener("change", function() {
    countDownDate = new Date(this.value).getTime();
    chrome.storage.sync.set({ countDownDate: countDownDate });
    updateCountdownDisplay();
});

// Add event listener to update countdown when event input changes
document.getElementById("event").addEventListener("input", function() {
    eventName = this.value;
    chrome.storage.sync.set({ eventName: eventName });
    updateCountdownDisplay();
});

// Add event listener to update countdown when toggleWorkdays checkbox changes
document.getElementById("toggleWorkdays").addEventListener("change", function() {
    workdaysToggled = this.checked;
    chrome.storage.sync.set({ workdaysToggled: workdaysToggled });
    updateCountdownDisplay();
});