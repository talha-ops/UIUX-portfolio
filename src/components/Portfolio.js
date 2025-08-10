import React from 'react';

const Portfolio = () => {
  const projects = [
    {
      id: 1,
      title: "EcoShop Mobile App",
      description: "A sustainable shopping app that helps users make environmentally conscious purchasing decisions. Features include carbon footprint tracking, eco-friendly product recommendations, and a reward system for sustainable choices.",
      technologies: ["User Research", "Wireframing", "Prototyping", "Mobile Design", "Figma"],
      icon: "fas fa-mobile-alt",
      links: {
        figma: "#",
        prototype: "#"
      }
    },
    {
      id: 2,
      title: "AI Task Manager Dashboard",
      description: "An intelligent task management system that uses AI to prioritize tasks, predict deadlines, and optimize workflows. Designed for busy professionals who need smart automation to boost productivity.",
      technologies: ["Dashboard Design", "Data Visualization", "AI/UX", "Design Systems", "Adobe XD"],
      icon: "fas fa-brain",
      links: {
        figma: "#",
        prototype: "#"
      }
    },
    {
      id: 3,
      title: "FitTrack Health Platform",
      description: "A comprehensive health and fitness tracking platform that integrates with wearable devices. Features personalized workout plans, nutrition tracking, and social challenges to motivate users.",
      technologies: ["Health Tech UX", "Wearable Design", "Gamification", "Responsive Design", "Sketch"],
      icon: "fas fa-heartbeat",
      links: {
        figma: "#",
        prototype: "#"
      }
    }
  ];

  return (
    <section id="work" className="work">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">My Work</h2>
          <p className="section-subtitle">
            A collection of projects showcasing my design process and problem-solving approach
          </p>
        </div>
        
        <div className="work-grid">
          {projects.map((project) => (
            <div key={project.id} className="work-item">
              <div className="work-image">
                <div className="image-placeholder">
                  <i className={project.icon}></i>
                </div>
                <div className="work-overlay">
                  <div className="work-links">
                    <a href={project.links.figma} className="work-link" title="View Design">
                      <i className="fab fa-figma"></i>
                    </a>
                    <a href={project.links.prototype} className="work-link" title="View Prototype">
                      <i className="fas fa-external-link-alt"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="work-descriptions">
          {projects.map((project) => (
            <div key={project.id} className="work-description">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="work-tech">
                {project.technologies.map((tech, index) => (
                  <span key={index}>{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
