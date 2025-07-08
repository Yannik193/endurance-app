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
    const form = document.getElementById('workoutForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        saveWorkout();
    });
    
    // Add time format validation for time inputs
    const timeInputs = ['totalTime', 'hrZone1', 'hrZone2', 'hrZone3', 'hrZone4', 'hrZone5'];
    timeInputs.forEach(id => {
        const input = document.getElementById(id);
        input.addEventListener('blur', validateTimeFormat);
    });
});

function validateTimeFormat(e) {
    const input = e.target;
    const value = input.value.trim();
    
    if (value && !isValidTimeFormat(value)) {
        input.style.borderColor = '#ff3b30';
        setTimeout(() => {
            input.style.borderColor = '#333333';
        }, 2000);
    }
}

function isValidTimeFormat(time) {
    // Accept formats: HH:MM:SS, MM:SS, or just SS
    const timeRegex = /^(?:([0-9]{1,2}):)?([0-5]?[0-9]):([0-5][0-9])$|^([0-5]?[0-9])$|^([0-5]?[0-9]):([0-5][0-9])$/;
    return timeRegex.test(time);
}

function saveWorkout() {
    const formData = new FormData(document.getElementById('workoutForm'));
    const workoutData = {};
    
    for (let [key, value] of formData.entries()) {
        workoutData[key] = value;
    }
    
    // Add timestamp
    workoutData.timestamp = new Date().toISOString();
    
    // Save to localStorage
    let workouts = JSON.parse(localStorage.getItem('endurance_workouts')) || [];
    workouts.push(workoutData);
    localStorage.setItem('endurance_workouts', JSON.stringify(workouts));
    
    // Show success message
    showSuccessMessage('Workout saved successfully!');
    
    // Clear form after a short delay
    setTimeout(() => {
        clearForm();
    }, 1500);
}

function showSuccessMessage(message) {
    // Remove existing success message if any
    const existingMessage = document.querySelector('.success-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create and show new success message
    const messageDiv = document.createElement('div');
    messageDiv.className = 'success-message';
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
