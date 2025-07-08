# Endurance - Workout Tracking PWA

A minimalist Progressive Web App (PWA) for tracking endurance workouts, specifically optimized for iPhone XS. The app features a sleek black design and can be installed directly to your iPhone's home screen for a native app-like experience.

![Endurance App](https://img.shields.io/badge/PWA-Ready-green.svg)
![iPhone XS Optimized](https://img.shields.io/badge/iPhone%20XS-Optimized-blue.svg)
![Offline Support](https://img.shields.io/badge/Offline-Supported-orange.svg)

## ✨ Features

- **🎯 iPhone XS Optimized** - Perfect fit for 375x812 display with safe area handling
- **🌙 Dark Theme** - Black background design that's easy on the eyes and battery-friendly for OLED displays
- **📱 Progressive Web App** - Install to home screen for native app experience
- **📶 Offline Capable** - Works without internet connection once installed
- **💾 Local Storage** - All workout data stored locally on your device
- **⚡ Fast & Simple** - Minimalist interface focused on quick data entry

## 📊 Tracking Fields

- **Activity Type** - Running, Cycling, Kayaking, Hiking, or Other
- **Total Workout Time** - Duration in HH:MM:SS format
- **Distance** - In kilometers with decimal precision
- **Elevation Gain** - In meters
- **Heart Rate Zones 1-5** - Time spent in each HR zone

## 🚀 Quick Start

### Option 1: Local Development
```bash
# Clone the repository
git clone https://github.com/yourusername/endurance-app.git
cd endurance-app

# Start a local server (Python)
python -m http.server 8000

# OR using Node.js
npx http-server -p 8000
```

### Option 2: Use Included Scripts
```bash
# Windows PowerShell
.\start-server.ps1

# Windows Command Prompt
start-server.bat
```

Then open `http://localhost:8000` in your browser.

## 📱 iPhone Installation

1. **Open Safari** and navigate to your hosted app URL
2. **Tap the Share button** (square with arrow pointing up)
3. **Scroll down** and tap "Add to Home Screen"
4. **Tap "Add"** to confirm installation
5. **Find "Endurance"** on your home screen - it's ready to use!

## 🛠️ Technical Stack

- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **PWA**: Service Worker for offline functionality
- **Storage**: Browser localStorage for data persistence
- **Design**: Mobile-first, touch-optimized interface
- **Compatibility**: Optimized for iOS Safari, works on all modern browsers

## 📁 Project Structure

```
endurance-app/
├── index.html              # Main application file
├── manifest.json           # PWA configuration
├── sw.js                   # Service Worker for offline support
├── app.js                  # Application logic
├── styles.css              # iPhone XS optimized styling
├── icon-generator.html     # Utility for generating app icons
├── icons/                  # App icons directory
│   ├── icon-72x72.png
│   ├── icon-96x96.png
│   ├── icon-128x128.png
│   ├── icon-144x144.png
│   ├── icon-152x152.png
│   ├── icon-180x180.png    # iPhone home screen icon
│   ├── icon-192x192.png
│   ├── icon-384x384.png
│   └── icon-512x512.png
├── start-server.ps1        # PowerShell server script
├── start-server.bat        # Batch server script
└── README.md               # This file
```

## 🎨 Customization

### Changing Colors
Edit `styles.css` to modify the color scheme:
```css
/* Main background */
body { background-color: #000000; }

/* Accent color */
.save-btn { background-color: #007AFF; }
```

### Adding New Activity Types
Edit the select options in `index.html`:
```html
<select id="activity" name="activity">
    <option value="">Select</option>
    <option value="swimming">Swimming</option>
    <!-- Add more activities here -->
</select>
```

### Modifying Form Fields
Update `index.html` to add/remove form fields and update the corresponding JavaScript in `app.js`.

## 💾 Data Storage

All workout data is stored locally using the browser's localStorage API:
- Data persists between browser sessions
- No data is sent to external servers
- Export functionality can be added if needed

## 🌐 Deployment

### GitHub Pages
1. Push your code to a GitHub repository
2. Go to repository Settings > Pages
3. Select source branch (usually `main`)
4. Your app will be available at `https://yourusername.github.io/endurance-app`

### Netlify
1. Connect your GitHub repository to Netlify
2. Deploy automatically on every push
3. HTTPS enabled by default (required for PWA features)

### Vercel
1. Import your GitHub repository
2. Deploy with zero configuration
3. Automatic HTTPS and global CDN

## 🔧 Development

### Prerequisites
- Modern web browser (Safari, Chrome, Firefox, Edge)
- Local web server (Python, Node.js, or any HTTP server)

### Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📱 Device Compatibility

**Primary Target:**
- iPhone XS (375×812, iOS Safari)

**Secondary Support:**
- iPhone X, XR, 11, 12, 13, 14, 15 series
- iPad (responsive design)
- Android devices (Chrome browser)
- Desktop browsers (development/testing)

## 🔐 Privacy

- **No data collection** - All data stays on your device
- **No tracking** - No analytics or third-party scripts
- **Offline first** - Works completely offline after initial load

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

If you encounter any issues or have suggestions:
1. Check the [Issues](https://github.com/yourusername/endurance-app/issues) page
2. Create a new issue with details about your problem
3. Include your device model and browser version

## 🏆 Acknowledgments

- Designed specifically for endurance athletes
- Inspired by the need for simple, quick workout logging
- Built with iPhone XS users in mind

---

**Made with ❤️ for endurance athletes who want simple, effective workout tracking**
