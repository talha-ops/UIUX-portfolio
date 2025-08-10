import React from 'react';

const Footer = () => {
  const scrollToSection = (sectionId) => {
    const element = document.querySelector(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <p>&copy; 2025 Muhammad Talha Fiaz. Crafted with ❤️ and lots of ☕</p>
          <div className="footer-links">
            <a 
              href="#home" 
              onClick={(e) => { e.preventDefault(); scrollToSection('#home'); }}
            >
              Home
            </a>
            <a 
              href="#about" 
              onClick={(e) => { e.preventDefault(); scrollToSection('#about'); }}
            >
              About
            </a>
            <a 
              href="#work" 
              onClick={(e) => { e.preventDefault(); scrollToSection('#work'); }}
            >
              Work
            </a>
            <a 
              href="#contact" 
              onClick={(e) => { e.preventDefault(); scrollToSection('#contact'); }}
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
