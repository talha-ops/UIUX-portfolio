import React, { useEffect, useRef, useState } from 'react';

const About = () => {
  const [counters, setCounters] = useState({ projects: 0, clients: 0, experience: 0 });
  const [hasAnimated, setHasAnimated] = useState(false);
  const aboutRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAnimated) {
            animateCounters();
            setHasAnimated(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCounters = () => {
    const targets = { projects: 50, clients: 30, experience: 3 };
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setCounters({
        projects: Math.floor(targets.projects * progress),
        clients: Math.floor(targets.clients * progress),
        experience: Math.floor(targets.experience * progress)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounters(targets);
      }
    }, stepTime);
  };

  return (
    <section id="about" className="about" ref={aboutRef}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">
            Passionate about creating meaningful digital experiences that connect with users
          </p>
        </div>
        
        <div className="about-content">
          <div className="about-text">
            <p className="about-intro">
              I'm a UI/UX designer with a passion for creating user-centered digital experiences. 
              My approach combines research-driven insights with creative problem-solving to deliver 
              designs that are both beautiful and functional.
            </p>
            
            <p className="about-detail">
              With a background in design thinking and human-computer interaction, I specialize in 
              transforming complex problems into simple, elegant solutions. From initial research 
              to final implementation, I ensure every design decision serves both user needs and 
              business objectives.
            </p>
            
            <div className="about-stats">
              <div className="stat-item">
                <div className="stat-number">{counters.projects}+</div>
                <div className="stat-label">Projects Completed</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{counters.clients}+</div>
                <div className="stat-label">Happy Clients</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{counters.experience}+</div>
                <div className="stat-label">Years Experience</div>
              </div>
            </div>
          </div>
          
          <div className="about-skills">
            <h3>Skills & Expertise</h3>
            <div className="skills-grid">
              <div className="skill-category">
                <h4>Research & Strategy</h4>
                <div className="skill-tags">
                  <span>User Research</span>
                  <span>Persona Development</span>
                  <span>Journey Mapping</span>
                  <span>Competitive Analysis</span>
                  <span>Information Architecture</span>
                </div>
              </div>
              
              <div className="skill-category">
                <h4>Design & Prototyping</h4>
                <div className="skill-tags">
                  <span>Wireframing</span>
                  <span>Prototyping</span>
                  <span>Visual Design</span>
                  <span>Design Systems</span>
                  <span>Micro-interactions</span>
                </div>
              </div>
              
              <div className="skill-category">
                <h4>Tools & Technology</h4>
                <div className="skill-tags">
                  <span>Figma</span>
                  <span>Adobe XD</span>
                  <span>Sketch</span>
                  <span>Principle</span>
                  <span>InVision</span>
                  <span>Miro</span>
                </div>
              </div>
              
              <div className="skill-category">
                <h4>Testing & Optimization</h4>
                <div className="skill-tags">
                  <span>Usability Testing</span>
                  <span>A/B Testing</span>
                  <span>Accessibility</span>
                  <span>Performance Optimization</span>
                  <span>Analytics</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
