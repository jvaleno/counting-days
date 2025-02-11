import { calculateWorkdays, updateBadge } from './utils.js';

var countDownDate;
var workdaysToggled = false;
var workdays = 0;

// Function to retrieve the countdown date, workdaysToggled state, and workdays from storage and set up the interval
function initializeCountdown() {
    chrome.storage.sync.get(['countDownDate', 'workdaysToggled', 'workdays'], function(result) {
        if (result.countDownDate) {
            countDownDate = result.countDownDate;
        }
        if (result.workdaysToggled !== undefined) {
            workdaysToggled = result.workdaysToggled;
        }
        if (result.workdays !== undefined) {
            workdays = result.workdays;
        }
        updateBadge(countDownDate, workdaysToggled);
        setInterval(() => updateBadge(countDownDate, workdaysToggled), 1000 * 60 * 60 * 1); // Update every hour
    });
}

// Initialize the countdown when the extension is loaded
initializeCountdown();

// Add event listener to update badge and storage when a tab is updated
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete') {
        initializeCountdown();
    }
});

// Add event listener to update workdaysToggled state and storage
chrome.storage.onChanged.addListener(function(changes, namespace) {
    if (changes.workdaysToggled) {
        workdaysToggled = changes.workdaysToggled.newValue;
        updateBadge(countDownDate, workdaysToggled);
    }
    if (changes.countDownDate) {
        countDownDate = changes.countDownDate.newValue;
        updateBadge(countDownDate, workdaysToggled);
    }
    if (changes.workdays) {
        workdays = changes.workdays.newValue;
        updateBadge(countDownDate, workdaysToggled);
    }
});