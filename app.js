// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Form handling
document.addEventListener('DOMContentLoaded', function() {
    // Set current date as default
    setDefaultDate();
    
    // Add time format validation and auto-formatting for time inputs
    const timeInputs = ['totalTime', 'hrZone1', 'hrZone2', 'hrZone3', 'hrZone4', 'hrZone5'];
    timeInputs.forEach(id => {
        const input = document.getElementById(id);
        input.addEventListener('blur', validateTimeFormat);
    });
});

function setDefaultDate() {
    const dateInput = document.getElementById('date');
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    dateInput.value = formattedDate;
}

function validateTimeFormat(e) {
    const input = e.target;
    const value = input.value.trim();
    
    if (value) {
        // Auto-format time input only on blur (when user leaves the field)
        const formattedTime = autoFormatTime(value);
        if (formattedTime) {
            input.value = formattedTime;
            input.style.borderColor = '#007AFF'; // Blue border for valid format
            setTimeout(() => {
                input.style.borderColor = '#333333';
            }, 1000);
        } else {
            input.style.borderColor = '#ff3b30';
            setTimeout(() => {
                input.style.borderColor = '#333333';
            }, 2000);
        }
    }
}

function autoFormatTime(input) {
    // Remove any existing colons and non-digits
    const digitsOnly = input.replace(/[^\d]/g, '');
    
    // Handle different input lengths
    if (digitsOnly.length === 0) {
        return '';
    }
    
    if (digitsOnly.length === 1) {
        // Single digit: "5" -> "00:00:05"
        return `00:00:0${digitsOnly}`;
    } else if (digitsOnly.length === 2) {
        // Two digits: "25" -> "00:00:25"
        const seconds = digitsOnly;
        if (parseInt(seconds) <= 59) {
            return `00:00:${seconds}`;
        }
    } else if (digitsOnly.length === 3) {
        // Three digits: "125" -> "00:01:25"
        const minutes = digitsOnly.slice(0, 1);
        const seconds = digitsOnly.slice(1);
        if (parseInt(minutes) <= 59 && parseInt(seconds) <= 59) {
            return `00:0${minutes}:${seconds}`;
        }
    } else if (digitsOnly.length === 4) {
        // Four digits: "2545" -> "00:25:45"
        const minutes = digitsOnly.slice(0, 2);
        const seconds = digitsOnly.slice(2);
        if (parseInt(minutes) <= 59 && parseInt(seconds) <= 59) {
            return `00:${minutes}:${seconds}`;
        }
    } else if (digitsOnly.length === 5) {
        // Five digits: "12545" -> "01:25:45"
        const hours = digitsOnly.slice(0, 1);
        const minutes = digitsOnly.slice(1, 3);
        const seconds = digitsOnly.slice(3);
        if (parseInt(hours) <= 23 && parseInt(minutes) <= 59 && parseInt(seconds) <= 59) {
            return `0${hours}:${minutes}:${seconds}`;
        }
    } else if (digitsOnly.length === 6) {
        // Six digits: "002545" -> "00:25:45"
        const hours = digitsOnly.slice(0, 2);
        const minutes = digitsOnly.slice(2, 4);
        const seconds = digitsOnly.slice(4, 6);
        if (parseInt(hours) <= 23 && parseInt(minutes) <= 59 && parseInt(seconds) <= 59) {
            return `${hours}:${minutes}:${seconds}`;
        }
    }
    
    // If input is already in correct format, validate it
    if (isValidTimeFormat(input)) {
        return input;
    }
    
    return null; // Invalid format
}

function isValidTimeFormat(time) {
    // Accept formats: HH:MM:SS, MM:SS, or just SS
    const timeRegex = /^(?:([0-9]{1,2}):)?([0-5]?[0-9]):([0-5][0-9])$|^([0-5]?[0-9])$|^([0-5]?[0-9]):([0-5][0-9])$|^([0-1]?[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/;
    return timeRegex.test(time);
}

function exportWorkout() {
    const formData = new FormData(document.getElementById('workoutForm'));
    const workoutData = {};
    
    // Collect all form data
    for (let [key, value] of formData.entries()) {
        workoutData[key] = value;
    }
    
    // Add metadata
    workoutData.timestamp = new Date().toISOString();
    workoutData.exportDate = new Date().toLocaleDateString();
    workoutData.exportTime = new Date().toLocaleTimeString();
    
    // Validate that at least some data is entered
    const hasData = Object.values(workoutData).some(value => value && value.trim() !== '');
    if (!hasData) {
        showMessage('Please enter some workout data before exporting.', 'error');
        return;
    }
    
    // Create JSON string with proper formatting
    const jsonString = JSON.stringify(workoutData, null, 2);
    
    // Create filename with date and activity
    const date = workoutData.date || new Date().toISOString().split('T')[0];
    const activity = workoutData.activity || 'workout';
    const filename = `${date}_${activity}_workout.json`;
    
    // Create and trigger download
    downloadJSON(jsonString, filename);
    
    // Show success message
    showMessage(`Workout exported as ${filename}`, 'success');
}

function downloadJSON(jsonString, filename) {
    // Create blob
    const blob = new Blob([jsonString], { type: 'application/json' });
    
    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

function showMessage(message, type = 'success') {
    // Remove existing message if any
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create and show new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    messageDiv.textContent = message;
    
    const form = document.querySelector('.workout-form');
    form.insertBefore(messageDiv, form.firstChild);
    
    // Trigger animation
    setTimeout(() => {
        messageDiv.classList.add('show');
    }, 100);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        messageDiv.classList.remove('show');
        setTimeout(() => {
            messageDiv.remove();
        }, 300);
    }, 3000);
}

function clearForm() {
    document.getElementById('workoutForm').reset();
    
    // Reset activity dropdown to default
    document.getElementById('activity').selectedIndex = 0;
    
    // Reset date to current date
    setDefaultDate();
}

// Prevent zoom on double tap
let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Handle viewport changes for iPhone XS
function handleViewportChange() {
    // Update CSS custom properties for safe areas
    const safeAreaTop = getComputedStyle(document.documentElement).getPropertyValue('env(safe-area-inset-top)') || '0px';
    const safeAreaBottom = getComputedStyle(document.documentElement).getPropertyValue('env(safe-area-inset-bottom)') || '0px';
    
    document.documentElement.style.setProperty('--safe-area-top', safeAreaTop);
    document.documentElement.style.setProperty('--safe-area-bottom', safeAreaBottom);
}

// Listen for orientation changes
window.addEventListener('orientationchange', handleViewportChange);
window.addEventListener('resize', handleViewportChange);

// Initialize viewport handling
handleViewportChange();
