import { useEffect, useRef } from 'react';

const useStarSystem = () => {
  const containerRef = useRef(null);
  const starsRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0 });
  const animationRef = useRef(null);
  const isMovingRef = useRef(false);
  const moveTimeoutRef = useRef(null);
  const lastFrameTimeRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear any existing stars
    container.innerHTML = '';
    starsRef.current = [];

    const createStar = (type) => {
      const star = document.createElement('div');
      
      // Add star type classes
      star.className = `unified-star ${type}-star`;
      
      // Random star properties
      let size, opacity;
      if (type === 'shooting') {
        size = Math.random() * 2 + 1; // 1-3px for shooting stars
        opacity = 0.8;
      } else {
        size = Math.random() * 2 + 0.5; // 0.5-2.5px
        opacity = Math.random() * 0.6 + 0.2; // 0.2-0.8
      }
      
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.opacity = opacity;
      
      // Position based on type
      if (type === 'background') {
        star.style.left = `${Math.random() * window.innerWidth}px`;
        star.style.top = `${Math.random() * window.innerHeight}px`;
        star.style.zIndex = '1';
      } else if (type === 'cursor') {
        star.style.left = `${Math.random() * window.innerWidth}px`;
        star.style.top = `${Math.random() * window.innerHeight}px`;
        star.style.zIndex = '10';
      } else if (type === 'floating') {
        star.style.left = `${Math.random() * window.innerWidth}px`;
        star.style.top = `${Math.random() * window.innerHeight}px`;
        star.style.zIndex = '5';
      } else if (type === 'shooting') {
        const edge = Math.floor(Math.random() * 4);
        switch (edge) {
          case 0: // top
            star.style.left = `${Math.random() * window.innerWidth}px`;
            star.style.top = '-10px';
            break;
          case 1: // right
            star.style.left = `${window.innerWidth + 10}px`;
            star.style.top = `${Math.random() * window.innerHeight}px`;
            break;
          case 2: // bottom
            star.style.left = `${Math.random() * window.innerWidth}px`;
            star.style.top = `${window.innerHeight + 10}px`;
            break;
          case 3: // left
            star.style.left = '-10px';
            star.style.top = `${Math.random() * window.innerHeight}px`;
            break;
        }
        star.style.zIndex = '4';
      }
      
      container.appendChild(star);
      
      // Star properties based on type
      const starData = {
        element: star,
        type: type,
        size: size,
        baseOpacity: opacity,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.005 + Math.random() * 0.01 // Reduced speed
      };
      
      if (type === 'cursor') {
        starData.offsetX = (Math.random() - 0.5) * 200; // Reduced range
        starData.offsetY = (Math.random() - 0.5) * 200;
        starData.speed = 0.02 + Math.random() * 0.03; // Reduced speed
        starData.angle = Math.random() * Math.PI * 2;
        starData.distance = 15 + Math.random() * 100; // Reduced distance
      } else if (type === 'floating') {
        starData.parallaxSpeed = 0.05 + Math.random() * 0.1; // Reduced speed
        starData.floatRange = 10 + Math.random() * 20; // Reduced range
        starData.floatSpeed = 0.003 + Math.random() * 0.005; // Reduced speed
      } else if (type === 'shooting') {
        starData.velocityX = (Math.random() - 0.5) * 4 + 2; // Reduced velocity
        starData.velocityY = (Math.random() - 0.5) * 4 + 2;
        starData.life = 0;
        starData.maxLife = Math.random() * 60 + 30; // Reduced life
        starData.trailLength = 4; // Reduced trail length
      }
      
      starsRef.current.push(starData);
    };

    const createStars = () => {
      // Significantly reduced star counts for better performance
      // Create background stars
      for (let i = 0; i < 25; i++) { // Reduced from 70
        createStar('background');
      }
      
      // Create cursor-following stars
      for (let i = 0; i < 15; i++) { // Reduced from 40
        createStar('cursor');
      }
      
      // Create floating parallax stars
      for (let i = 0; i < 10; i++) { // Reduced from 25
        createStar('floating');
      }
      
      // Create shooting stars
      for (let i = 0; i < 3; i++) { // Reduced from 5
        createStar('shooting');
      }
    };

    const animateBackgroundStar = (star, moveX, moveY) => {
      const parallaxX = moveX * 0.3; // Reduced parallax effect
      const parallaxY = moveY * 0.3;
      
      star.element.style.transform = `translate(${parallaxX}px, ${parallaxY}px)`;
      
      // Simplified pulse effect
      star.pulsePhase += star.pulseSpeed;
      const pulseOpacity = star.baseOpacity + Math.sin(star.pulsePhase) * 0.1; // Reduced pulse
      star.element.style.opacity = Math.max(0.1, pulseOpacity);
    };

    const animateCursorStar = (star, speed) => {
      if (speed > 0.05) { // Reduced speed threshold
        const targetX = mouseRef.current.x + Math.cos(star.angle) * star.distance + star.offsetX;
        const targetY = mouseRef.current.y + Math.sin(star.angle) * star.distance + star.offsetY;
        
        const currentX = parseFloat(star.element.style.left) || mouseRef.current.x;
        const currentY = parseFloat(star.element.style.top) || mouseRef.current.y;
        
        const newX = currentX + (targetX - currentX) * star.speed;
        const newY = currentY + (targetY - currentY) * star.speed;
        
        star.element.style.left = `${newX}px`;
        star.element.style.top = `${newY}px`;
        
        if (isMovingRef.current) {
          const opacity = Math.min(1, 0.3 + (speed * 0.01)); // Reduced opacity change
          star.element.style.opacity = opacity;
        } else {
          star.element.style.opacity = star.baseOpacity;
        }
      }
    };

    const animateFloatingStar = (star, moveX, moveY) => {
      const parallaxX = moveX * star.parallaxSpeed;
      const parallaxY = moveY * star.parallaxSpeed;
      
      star.pulsePhase += star.floatSpeed;
      const floatY = Math.sin(star.pulsePhase) * star.floatRange;
      
      star.element.style.transform = `translate(${parallaxX}px, ${parallaxY + floatY}px)`;
    };

    const animateShootingStar = (star) => {
      const currentX = parseFloat(star.element.style.left) || 0;
      const currentY = parseFloat(star.element.style.top) || 0;
      
      const newX = currentX + star.velocityX;
      const newY = currentY + star.velocityY;
      
      star.element.style.left = `${newX}px`;
      star.element.style.top = `${newY}px`;
      
      star.life++;
      const lifeProgress = star.life / star.maxLife;
      star.element.style.opacity = Math.max(0, 1 - lifeProgress);
      
      if (star.life >= star.maxLife || 
          newX < -100 || newX > window.innerWidth + 100 || 
          newY < -100 || newY > window.innerHeight + 100) {
        
        star.element.remove();
        const index = starsRef.current.indexOf(star);
        if (index > -1) {
          starsRef.current.splice(index, 1);
        }
        
        // Reduced frequency of new shooting stars
        setTimeout(() => {
          createStar('shooting');
        }, Math.random() * 8000 + 5000);
      }
    };

    const animate = (currentTime) => {
      // Throttle animation to 30 FPS for better performance
      if (currentTime - lastFrameTimeRef.current < 33) { // ~30 FPS
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      lastFrameTimeRef.current = currentTime;

      const deltaX = mouseRef.current.x - mouseRef.current.prevX;
      const deltaY = mouseRef.current.y - mouseRef.current.prevY;
      const speed = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const moveX = (mouseRef.current.x - centerX) * 0.02; // Reduced movement
      const moveY = (mouseRef.current.y - centerY) * 0.02;
      
      starsRef.current.forEach((star) => {
        switch (star.type) {
          case 'background':
            animateBackgroundStar(star, moveX, moveY, speed);
            break;
          case 'cursor':
            animateCursorStar(star, speed);
            break;
          case 'floating':
            animateFloatingStar(star, moveX, moveY);
            break;
          case 'shooting':
            animateShootingStar(star);
            break;
        }
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      mouseRef.current.prevX = mouseRef.current.x;
      mouseRef.current.prevY = mouseRef.current.y;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      
      isMovingRef.current = true;
      
      if (moveTimeoutRef.current) {
        clearTimeout(moveTimeoutRef.current);
      }
      
      moveTimeoutRef.current = setTimeout(() => {
        isMovingRef.current = false;
      }, 150); // Increased timeout
    };

    const handleResize = () => {
      starsRef.current.forEach(star => {
        const rect = star.element.getBoundingClientRect();
        if (rect.right < 0 || rect.left > window.innerWidth || 
            rect.bottom < 0 || rect.top > window.innerHeight) {
          star.element.style.left = `${Math.random() * window.innerWidth}px`;
          star.element.style.top = `${Math.random() * window.innerHeight}px`;
        }
      });
    };

    // Initialize
    createStars();
    animate(0);

    // Event listeners
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (moveTimeoutRef.current) {
        clearTimeout(moveTimeoutRef.current);
      }
      if (container) {
        container.innerHTML = '';
      }
      starsRef.current = [];
    };
  }, []);

  return containerRef;
};

export default useStarSystem;
