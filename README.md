# CSS Gradient Generator

A modern, interactive CSS gradient generator built with HTML, Tailwind CSS, and JavaScript. Create beautiful linear and radial gradients with real-time preview and instant CSS code generation.

## Features

### 🎨 Gradient Types
- **Linear Gradients**: Create directional gradients with customizable angles
- **Radial Gradients**: Generate circular gradients from center outward

### 🧭 Direction Control
16 preset directions for linear gradients:
- Cardinal directions (to right, to left, to top, to bottom)
- Diagonal directions (to top right, to bottom left, etc.)
- Angle-based directions (45°, 90°, 135°, 180°, 225°, 270°, 315°, 360°)

### 🌈 Color Management
- **Unlimited Color Stops**: Add as many colors as needed
- **Position Control**: Precise slider controls for color positioning
- **Color Picker**: Native browser color picker for each stop
- **Dynamic Addition/Removal**: Easy color stop management

### ⚡ Real-Time Features
- **Live Preview**: Instant gradient visualization
- **CSS Generation**: Automatic CSS code generation
- **Copy to Clipboard**: One-click CSS copying with visual feedback

### 🎯 Quick Presets
6 beautiful gradient presets for instant inspiration:
- Coral to Teal (45° linear)
- Purple to Blue (135° linear)
- Warm Sunset (linear)
- Pink Radial
- Mint to Pink (45° linear)
- Green Gradient (vertical)

### 📱 User Experience
- **Responsive Design**: Works perfectly on desktop and mobile
- **Keyboard Shortcuts**: Ctrl/Cmd+C to copy when preview is focused
- **Smart Parsing**: Preset selection updates all controls automatically
- **Modern UI**: Clean, intuitive interface with Tailwind CSS

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies required

### Installation
1. Clone or download this repository
2. Open `index.html` in your web browser
3. Start creating gradients!

```bash
# If using a local server
npx serve .
# or
python -m http.server 8000
```

## Usage

### Creating a Gradient
1. **Choose Type**: Select Linear or Radial gradient
2. **Set Direction**: Pick a direction (for linear gradients)
3. **Add Colors**: 
   - Click color picker to choose colors
   - Use position sliders to adjust color placement
   - Add more colors with "Add Color" button
4. **Copy CSS**: Click "Copy" to get the CSS code

### Using Presets
1. Click any preset gradient in the preview panel
2. All controls automatically update to match the preset
3. Customize further or use as-is

### Keyboard Shortcuts
- **Ctrl/Cmd + C**: Copy CSS when gradient preview is focused

## Technical Details

### File Structure
```
css-gradient-generator/
├── index.html          # Main HTML file
├── script.js           # JavaScript functionality
└── README.md          # This file
```

### Dependencies
- **Tailwind CSS**: Loaded via CDN for styling
- **Vanilla JavaScript**: No frameworks required

### Browser Support
- Chrome 26+
- Firefox 16+
- Safari 7+
- Edge 12+

## CSS Output Format

The generator produces standard CSS gradient syntax:

```css
/* Linear Gradient */
background: linear-gradient(45deg, #ff6b6b 0%, #4ecdc4 100%);

/* Radial Gradient */
background: radial-gradient(circle, #ff9a9e 0%, #fecfef 100%);
```

## Customization

### Adding More Presets
Edit the preset buttons in `index.html`:

```html
<button class="preset-btn h-12 rounded border-2 border-gray-300 hover:border-blue-500 transition-colors" 
        data-gradient="linear-gradient(your-gradient-here)" 
        style="background: linear-gradient(your-gradient-here);">
</button>
```

### Styling Changes
The app uses Tailwind CSS classes. Modify classes in `index.html` for different styling.

### Adding Features
The `GradientGenerator` class in `script.js` is modular and easy to extend.

## Browser Compatibility

### Color Input Support
- Full support in modern browsers
- Fallback text input for older browsers

### Clipboard API
- Uses modern `navigator.clipboard` API when available
- Falls back to `document.execCommand` for older browsers

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test across different browsers
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Built with [Tailwind CSS](https://tailwindcss.com/)
- Inspired by modern gradient design trends
- Color presets curated from popular gradient collections

---

**Enjoy creating beautiful gradients!** 🎨✨