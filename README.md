# Portfolio React Application

A stunning space-themed portfolio website for Muhammad Talha Fiaz, a UI/UX Designer, built with React.js.

## Features

- 🌌 **Dynamic Space Background**: Color-changing galaxy background with animated nebula clouds
- ⭐ **Interactive Star System**: Advanced cursor-following stars with shooting stars and twinkling effects
- 🪐 **Animated Planets**: Multiple planets with independent color-shifting animations
- 🌙 **Glowing Moon**: Beautiful realistic moon with crater details and glow animation
- 📱 **Fully Responsive**: Works perfectly on desktop, tablet, and mobile devices
- ⚡ **Smooth Animations**: Engaging UI animations and transitions
- 🎨 **Modern Design**: Contemporary UI/UX design with glass morphism effects

## Technologies Used

- React.js (Functional Components & Hooks)
- CSS3 (Advanced animations, keyframes, gradients)
- JavaScript ES6+
- Font Awesome Icons
- Google Fonts (Inter & Space Grotesk)

## Installation & Setup

1. **Install Node.js** (version 16 or higher)
   - Download from [nodejs.org](https://nodejs.org/)

2. **Clone or download this project**
   ```bash
   # If you have git installed
   git clone <repository-url>
   cd portfolio-react
   
   # Or simply extract the ZIP file and navigate to the folder
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   - Navigate to `http://localhost:3000`
   - The page will automatically reload if you make changes

## Build for Production

To create a production build:

```bash
npm run build
```

This creates a `build` folder with optimized files ready for deployment.

## Project Structure

```
src/
├── components/
│   ├── About.js          # About section component
│   ├── Contact.js        # Contact form and info
│   ├── Footer.js         # Footer component
│   ├── Hero.js           # Hero section with typing animation
│   ├── Navbar.js         # Navigation with smooth scrolling
│   ├── Portfolio.js      # Work/projects showcase
│   ├── SpaceBackground.js # Moon and planets
│   └── StarContainer.js  # Star system container
├── hooks/
│   └── useStarSystem.js  # Custom hook for star animations
├── App.js               # Main app component
├── App.css             # All styles and animations
└── index.js            # App entry point
```

## Customization

### Personal Information
- Update contact details in `src/components/Contact.js`
- Modify hero text in `src/components/Hero.js`
- Change about information in `src/components/About.js`

### Projects
- Edit project data in `src/components/Portfolio.js`
- Add your own project descriptions, technologies, and links

### Styling
- All styles are in `src/App.css`
- Color scheme can be modified by changing CSS custom properties
- Animations can be adjusted by modifying keyframe timings

### Background Effects
- Star system settings in `src/hooks/useStarSystem.js`
- Planet and moon styles in `src/App.css`
- Galaxy colors can be changed in the CSS gradients

## Performance Notes

- The star system is optimized with `requestAnimationFrame`
- Heavy animations use CSS transforms for hardware acceleration
- Responsive design optimizes for different screen sizes
- Components use React hooks for efficient re-rendering

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Deployment

You can deploy this to:
- **Netlify**: Drag and drop the `build` folder
- **Vercel**: Connect your repository
- **GitHub Pages**: Use `npm run build` and deploy the build folder
- **Any static hosting service**

## Contributing

Feel free to fork this project and make your own version! Some ideas for enhancements:
- Add more interactive elements
- Implement dark/light mode toggle
- Add more background themes
- Include a blog section
- Add project filtering

## License

This project is open source and available under the [MIT License](LICENSE).

---

Created with ❤️ and lots of ☕ by Muhammad Talha Fiaz