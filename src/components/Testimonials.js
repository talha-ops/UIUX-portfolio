import React, { useState } from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Product Manager",
      company: "TechCorp",
      content: "Talha's UI/UX design transformed our product completely. His attention to user experience and beautiful design made our app 40% more engaging.",
      rating: 5,
      avatar: "SJ"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Startup Founder",
      company: "InnovateLab",
      content: "Working with Talha was incredible. He understood our vision perfectly and delivered designs that exceeded our expectations. Highly recommended!",
      rating: 5,
      avatar: "MC"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "UX Lead",
      company: "DesignStudio",
      content: "Talha's design thinking and creativity are outstanding. He consistently delivers innovative solutions that solve real user problems.",
      rating: 5,
      avatar: "ER"
    },
    {
      id: 4,
      name: "David Kim",
      role: "Marketing Director",
      company: "GrowthFirst",
      content: "The redesign Talha created for our platform increased user engagement by 60%. His work is both beautiful and functional.",
      rating: 5,
      avatar: "DK"
    },
    {
      id: 5,
      name: "Lisa Thompson",
      role: "CEO",
      company: "HealthTech",
      content: "Talha's expertise in health tech UX is unmatched. He created an intuitive interface that our users love and our team can easily maintain.",
      rating: 5,
      avatar: "LT"
    },
    {
      id: 6,
      name: "Alex Morgan",
      role: "Creative Director",
      company: "BrandWorks",
      content: "Talha brings fresh perspectives to every project. His designs are modern, accessible, and always aligned with business goals.",
      rating: 5,
      avatar: "AM"
    },
    {
      id: 7,
      name: "Rachel Green",
      role: "Product Designer",
      company: "DesignHub",
      content: "Collaborating with Talha was a pleasure. His systematic approach to design and excellent communication skills made the project smooth.",
      rating: 5,
      avatar: "RG"
    },
    {
      id: 8,
      name: "James Wilson",
      role: "CTO",
      company: "FinTech Solutions",
      content: "Talha's financial app designs are exceptional. He understands complex workflows and makes them simple and beautiful for users.",
      rating: 5,
      avatar: "JW"
    },
    {
      id: 9,
      name: "Maria Garcia",
      role: "UX Researcher",
      company: "UserInsights",
      content: "Talha's user research skills are impressive. He doesn't just design, he understands users deeply and creates solutions that truly help them.",
      rating: 5,
      avatar: "MG"
    },
    {
      id: 10,
      name: "Robert Taylor",
      role: "Design Manager",
      company: "CreativeCorp",
      content: "Talha is one of the most talented designers I've worked with. His attention to detail and innovative thinking set him apart.",
      rating: 5,
      avatar: "RT"
    }
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState('right');
  const cardsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / cardsPerPage);

  const nextPage = () => {
    if (isAnimating) return;
    
    setAnimationDirection('right');
    setIsAnimating(true);
    
    // Add slide-out animation
    const cards = document.querySelectorAll('.testimonial-card');
    cards.forEach(card => card.classList.add('slide-out-right'));
    
    setTimeout(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
      setIsAnimating(false);
      
      // Add slide-in animation
      setTimeout(() => {
        const newCards = document.querySelectorAll('.testimonial-card');
        newCards.forEach(card => card.classList.add('slide-in-left'));
      }, 50);
    }, 400);
  };

  const prevPage = () => {
    if (isAnimating) return;
    
    setAnimationDirection('left');
    setIsAnimating(true);
    
    // Add slide-out animation
    const cards = document.querySelectorAll('.testimonial-card');
    cards.forEach(card => card.classList.add('slide-out-right'));
    
    setTimeout(() => {
      setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
      setIsAnimating(false);
      
      // Add slide-in animation
      setTimeout(() => {
        const newCards = document.querySelectorAll('.testimonial-card');
        newCards.forEach(card => card.classList.add('slide-in-left'));
      }, 50);
    }, 400);
  };

  const goToPage = (pageIndex) => {
    if (isAnimating || pageIndex === currentPage) return;
    
    const direction = pageIndex > currentPage ? 'right' : 'left';
    setAnimationDirection(direction);
    setIsAnimating(true);
    
    // Add slide-out animation
    const cards = document.querySelectorAll('.testimonial-card');
    const slideOutClass = direction === 'right' ? 'slide-out-right' : 'slide-out-left';
    cards.forEach(card => card.classList.add(slideOutClass));
    
    setTimeout(() => {
      setCurrentPage(pageIndex);
      setIsAnimating(false);
      
      // Add slide-in animation
      setTimeout(() => {
        const newCards = document.querySelectorAll('.testimonial-card');
        const slideInClass = direction === 'right' ? 'slide-in-left' : 'slide-in-right';
        newCards.forEach(card => card.classList.add(slideInClass));
      }, 50);
    }, 400);
  };

  const currentTestimonials = testimonials.slice(
    currentPage * cardsPerPage,
    (currentPage + 1) * cardsPerPage
  );

  return (
    <section id="testimonials" className="testimonials">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Client Testimonials</h2>
          <p className="section-subtitle">
            What clients say about working with me
          </p>
        </div>

        <div className="testimonials-grid">
          {currentTestimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-header">
                <div className="testimonial-avatar">
                  {testimonial.avatar}
                </div>
                <div className="testimonial-info">
                  <h4 className="testimonial-name">{testimonial.name}</h4>
                  <p className="testimonial-role">{testimonial.role}</p>
                  <p className="testimonial-company">{testimonial.company}</p>
                </div>
              </div>

              <div className="testimonial-rating">
                {[...Array(testimonial.rating)].map((_, index) => (
                  <i key={index} className="fas fa-star"></i>
                ))}
              </div>

              <p className="testimonial-content">{testimonial.content}</p>
            </div>
          ))}
        </div>

        <div className="testimonials-navigation">
          <button
            className="nav-btn prev-btn"
            onClick={prevPage}
            disabled={currentPage === 0 || isAnimating}
          >
            <i className="fas fa-chevron-left"></i>
            Previous
          </button>

          <div className="page-indicators">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`page-indicator ${index === currentPage ? 'active' : ''}`}
                onClick={() => goToPage(index)}
                disabled={isAnimating}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            className="nav-btn next-btn"
            onClick={nextPage}
            disabled={currentPage === totalPages - 1 || isAnimating}
          >
            Next
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
