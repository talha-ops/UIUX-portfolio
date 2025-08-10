import React, { useEffect, useState } from 'react';

const Hero = () => {
  const [displayedText, setDisplayedText] = useState('');
  const fullText = 'Muhammad Talha Fiaz';

  useEffect(() => {
    let i = 0;
    const typeTimer = setTimeout(() => {
      const typeWriter = () => {
        if (i < fullText.length) {
          setDisplayedText(fullText.slice(0, i + 1));
          i++;
          setTimeout(typeWriter, 100);
        }
      };
      typeWriter();
    }, 1000);

    return () => clearTimeout(typeTimer);
  }, []);

  return (
    <section id="home" className="hero">
      <div className="hero-background">
        <div className="gradient-overlay"></div>
      </div>
      
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            <span className="title-line">Hi, I'm</span>
            <span className="title-name">{displayedText}</span>
            <span className="title-role">UI/UX Designer</span>
          </h1>
          
          <p className="hero-description">
            I craft beautiful and intuitive digital experiences through research, 
            design thinking, and user-centered approach. From wireframes to prototypes, 
            I create designs that users love and businesses need.
          </p>
          
          <div className="hero-actions">
            <a href="#work" className="btn btn-primary">
              <i className="fas fa-eye"></i>
              View My Work
            </a>
            <a href="#contact" className="btn btn-secondary">
              <i className="fas fa-envelope"></i>
              Get In Touch
            </a>
            <a href="/cv.pdf" className="btn btn-cv" download>
              <i className="fas fa-download"></i>
              Download CV
            </a>
          </div>
        </div>
        
        <div className="hero-visual">
          <div className="floating-card">
            <div className="card-content">
                             <div className="avatar">
                 <img src="/profile-photo.jpeg" alt="Muhammad Talha Fiaz" />
               </div>
              <div className="status">
                <span className="status-dot"></span>
                Available for projects
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="scroll-indicator">
        <span>Scroll</span>
        <div className="scroll-line"></div>
      </div>
    </section>
  );
};

export default Hero;
