import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [notification, setNotification] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulate form submission
    console.log('Form submitted:', formData);
    
    // Show success notification
    showNotification("Message sent successfully! I'll get back to you soon.", 'success');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Ready to bring your ideas to life? Let's create something amazing together
          </p>
        </div>
        
        <div className="contact-content">
          <div className="contact-info">
            <h3>Let's Connect</h3>
            <p>
              Whether you have a project in mind, need design consultation, or just want to 
              say hello, I'd love to hear from you. Let's discuss how we can create 
              exceptional user experiences together.
            </p>
            
            <div className="contact-details">
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <span>talhafiaz458@gmail.com</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-phone"></i>
                <span>0301-4581111</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>Islamabad, Pakistan</span>
              </div>
            </div>
            
            <div className="social-links">
              <a href="#" className="social-link" title="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="social-link" title="Dribbble">
                <i className="fab fa-dribbble"></i>
              </a>
              <a href="#" className="social-link" title="Behance">
                <i className="fab fa-behance"></i>
              </a>
              <a href="#" className="social-link" title="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
          
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Your Message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            
            <button type="submit" className="btn btn-primary">
              <i className="fas fa-paper-plane"></i>
              Send Message
            </button>
          </form>
        </div>
      </div>
      
      {notification && (
        <div 
          className={`notification notification-${notification.type}`}
          style={{
            position: 'fixed',
            top: '100px',
            right: '20px',
            background: notification.type === 'success' ? '#e5e5e5' : '#ff6b6b',
            color: notification.type === 'success' ? '#0a0a0a' : '#ffffff',
            padding: '1rem 2rem',
            borderRadius: '8px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
            zIndex: '10000',
            transform: 'translateX(0)',
            transition: 'transform 0.3s ease'
          }}
        >
          {notification.message}
        </div>
      )}
    </section>
  );
};

export default Contact;
