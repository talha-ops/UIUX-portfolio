import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const scrollToSection = (sectionId) => {
    const element = document.querySelector(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    closeMenu();
  };

  return (
    <nav 
      className="navbar" 
      style={{
        background: isScrolled ? 'rgba(10, 10, 10, 0.95)' : 'rgba(0, 0, 0, 0.9)',
        backdropFilter: 'blur(30px)'
      }}
    >
      <div className="nav-container">
        <div className="nav-logo">
          <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('#home'); }}>
            <span className="logo-text">Talha</span>
            <span className="logo-dot">.</span>
          </a>
        </div>

        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li>
            <a 
              href="#home" 
              className="nav-link"
              onClick={(e) => { e.preventDefault(); scrollToSection('#home'); }}
            >
              Home
            </a>
          </li>
          <li>
            <a 
              href="#about" 
              className="nav-link"
              onClick={(e) => { e.preventDefault(); scrollToSection('#about'); }}
            >
              About
            </a>
          </li>
          <li>
            <a 
              href="#work" 
              className="nav-link"
              onClick={(e) => { e.preventDefault(); scrollToSection('#work'); }}
            >
              Work
            </a>
          </li>
          <li>
            <a 
              href="#testimonials" 
              className="nav-link"
              onClick={(e) => { e.preventDefault(); scrollToSection('#testimonials'); }}
            >
              Testimonials
            </a>
          </li>
          <li>
            <a 
              href="#contact" 
              className="nav-link"
              onClick={(e) => { e.preventDefault(); scrollToSection('#contact'); }}
            >
              Contact
            </a>
          </li>
        </ul>

        <div 
          className={`nav-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
