import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SpaceBackground from './components/SpaceBackground';
import StarContainer from './components/StarContainer';

function App() {
  return (
          <div className="App">
        <StarContainer />
        <SpaceBackground />
        <Navbar />
        <Hero />
        <About />
        <Portfolio />
        <Testimonials />
        <Contact />
        <Footer />
      </div>
  );
}

export default App;
