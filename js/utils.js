// Function to calculate the number of workdays between two dates
function calculateWorkdays(startDate, endDate) {
    var count = 0;
    var currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        var dayOfWeek = currentDate.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Exclude Sundays (0) and Saturdays (6)
            count++;
        }
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return count;
}

// Function to update the badge text
function updateBadge(countDownDate, workdaysToggled) {
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24)) + 1;

    var endDate = new Date(countDownDate);
    var startDate = new Date(now);
    var workdays = calculateWorkdays(startDate, endDate);

    var badgeText;
    if (workdaysToggled) {
        if (workdays > 0) {
            badgeText = workdays.toString();
        } else if (workdays === 0) {
            badgeText = "TDY";
        } else if (distance < 0) {
            badgeText = "EXP";
        } else {
            badgeText = "";
        }
    } else {
        if (days > 0) {
            badgeText = days.toString();
        } else if (days === 0) {
            badgeText = "TDY";
        } else if (distance < 0) {
            badgeText = "EXP";
        } else {
            badgeText = "";
        }
    }

    chrome.action.setBadgeText({ text: badgeText });

    // Store the workdays value in storage
    chrome.storage.sync.set({ workdays: workdays });
}

export { calculateWorkdays, updateBadge };