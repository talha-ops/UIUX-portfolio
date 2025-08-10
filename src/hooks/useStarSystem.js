import { useEffect, useRef } from 'react';

const useStarSystem = () => {
  const containerRef = useRef(null);
  const starsRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0 });
  const animationRef = useRef(null);
  const isMovingRef = useRef(false);
  const moveTimeoutRef = useRef(null);

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
      
      // Add color variations for some star types
      if (type === 'background' || type === 'floating') {
        const colors = ['', 'blue-star', 'purple-star', 'green-star'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        if (randomColor) {
          star.classList.add(randomColor);
        }
      }
      
      // Random star properties
      let size, opacity;
      if (type === 'shooting') {
        size = Math.random() * 3 + 2; // 2-5px for shooting stars
        opacity = 1; // Full opacity for shooting stars
      } else {
        size = Math.random() * 4 + 1; // 1-5px
        opacity = Math.random() * 0.9 + 0.1; // 0.1-1.0
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
      } else if (type === 'twinkling') {
        star.style.left = `${Math.random() * window.innerWidth}px`;
        star.style.top = `${Math.random() * window.innerHeight}px`;
        star.style.zIndex = '3';
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
        pulseSpeed: 0.01 + Math.random() * 0.03
      };
      
      if (type === 'cursor') {
        starData.offsetX = (Math.random() - 0.5) * 300;
        starData.offsetY = (Math.random() - 0.5) * 300;
        starData.speed = 0.03 + Math.random() * 0.07;
        starData.angle = Math.random() * Math.PI * 2;
        starData.rotationSpeed = (Math.random() - 0.5) * 0.02;
        starData.distance = 20 + Math.random() * 150;
      } else if (type === 'floating') {
        starData.parallaxSpeed = 0.1 + Math.random() * 0.3;
        starData.floatRange = 20 + Math.random() * 40;
        starData.floatSpeed = 0.005 + Math.random() * 0.01;
      } else if (type === 'shooting') {
        starData.velocityX = (Math.random() - 0.5) * 8 + 4;
        starData.velocityY = (Math.random() - 0.5) * 8 + 4;
        starData.life = 0;
        starData.maxLife = Math.random() * 100 + 50;
        starData.trail = [];
        starData.trailLength = 8;
      } else if (type === 'twinkling') {
        starData.twinkleSpeed = 0.02 + Math.random() * 0.04;
        starData.twinkleIntensity = 0.3 + Math.random() * 0.4;
      }
      
      starsRef.current.push(starData);
    };

    const createStars = () => {
      // Create background stars
      for (let i = 0; i < 70; i++) {
        createStar('background');
      }
      
      // Create cursor-following stars
      for (let i = 0; i < 40; i++) {
        createStar('cursor');
      }
      
      // Create floating parallax stars
      for (let i = 0; i < 25; i++) {
        createStar('floating');
      }
      
      // Create twinkling stars
      for (let i = 0; i < 10; i++) {
        createStar('twinkling');
      }
      
      // Create shooting stars
      for (let i = 0; i < 5; i++) {
        createStar('shooting');
      }
    };

    const animateBackgroundStar = (star, moveX, moveY) => {
      const parallaxX = moveX * 0.5;
      const parallaxY = moveY * 0.5;
      
      star.element.style.transform = `translate(${parallaxX}px, ${parallaxY}px)`;
      
      star.pulsePhase += star.pulseSpeed;
      const pulseOpacity = star.baseOpacity + Math.sin(star.pulsePhase) * 0.2;
      star.element.style.opacity = Math.max(0.1, pulseOpacity);
      
      star.element.style.boxShadow = `0 0 ${3 + Math.sin(star.pulsePhase) * 2}px rgba(255, 255, 255, 0.3)`;
    };

    const animateCursorStar = (star, speed) => {
      if (speed > 0.1) {
        star.angle += star.rotationSpeed + (speed * 0.0008);
      }
      
      const targetX = mouseRef.current.x + Math.cos(star.angle) * star.distance + star.offsetX;
      const targetY = mouseRef.current.y + Math.sin(star.angle) * star.distance + star.offsetY;
      
      const currentX = parseFloat(star.element.style.left) || mouseRef.current.x;
      const currentY = parseFloat(star.element.style.top) || mouseRef.current.y;
      
      const newX = currentX + (targetX - currentX) * star.speed;
      const newY = currentY + (targetY - currentY) * star.speed;
      
      star.element.style.left = `${newX}px`;
      star.element.style.top = `${newY}px`;
      
      if (isMovingRef.current) {
        star.pulsePhase += star.pulseSpeed;
        const pulseScale = 1 + Math.sin(star.pulsePhase) * 0.4;
        star.element.style.transform = `scale(${pulseScale})`;
        
        const opacity = Math.min(1, 0.4 + (speed * 0.015));
        star.element.style.opacity = opacity;
        
        const intensity = Math.min(255, 120 + speed * 2.5);
        star.element.style.background = `rgb(${intensity}, ${intensity}, ${intensity})`;
        star.element.style.boxShadow = `0 0 ${12 + speed * 0.6}px rgba(${intensity}, ${intensity}, ${intensity}, 0.9)`;
      } else {
        star.element.style.transform = 'scale(1)';
        star.element.style.opacity = star.baseOpacity;
        star.element.style.background = '#ffffff';
        star.element.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.8)';
      }
    };

    const animateFloatingStar = (star, moveX, moveY) => {
      const parallaxX = moveX * star.parallaxSpeed;
      const parallaxY = moveY * star.parallaxSpeed;
      
      star.pulsePhase += star.floatSpeed;
      const floatY = Math.sin(star.pulsePhase) * star.floatRange;
      
      star.element.style.transform = `translate(${parallaxX}px, ${parallaxY + floatY}px)`;
      
      const pulseOpacity = star.baseOpacity + Math.sin(star.pulsePhase * 2) * 0.1;
      star.element.style.opacity = pulseOpacity;
    };

    const animateTwinklingStar = (star, moveX, moveY) => {
      const parallaxX = moveX * 0.05;
      const parallaxY = moveY * 0.05;
      
      star.pulsePhase += star.twinkleSpeed;
      const twinkleOpacity = star.baseOpacity + Math.sin(star.pulsePhase) * star.twinkleIntensity;
      const twinkleScale = 0.8 + Math.sin(star.pulsePhase * 1.5) * 0.6;
      
      star.element.style.transform = `translate(${parallaxX}px, ${parallaxY}px) scale(${twinkleScale})`;
      star.element.style.opacity = Math.max(0.1, twinkleOpacity);
      
      if (Math.random() < 0.01) {
        star.element.style.boxShadow = `0 0 20px rgba(255, 255, 255, ${twinkleOpacity})`;
      } else {
        star.element.style.boxShadow = `0 0 10px rgba(255, 255, 255, ${twinkleOpacity * 0.5})`;
      }
    };

    const animateShootingStar = (star) => {
      const currentX = parseFloat(star.element.style.left) || 0;
      const currentY = parseFloat(star.element.style.top) || 0;
      
      const newX = currentX + star.velocityX;
      const newY = currentY + star.velocityY;
      
      star.element.style.left = `${newX}px`;
      star.element.style.top = `${newY}px`;
      
      star.trail.push({ x: newX, y: newY });
      if (star.trail.length > star.trailLength) {
        star.trail.shift();
      }
      
      let trailShadow = '';
      star.trail.forEach((point, index) => {
        const alpha = (index + 1) / star.trail.length * 0.8;
        const size = (index + 1) / star.trail.length * 15;
        if (index > 0) trailShadow += ', ';
        trailShadow += `${point.x - newX}px ${point.y - newY}px ${size}px rgba(255, 255, 255, ${alpha})`;
      });
      star.element.style.boxShadow = trailShadow;
      
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
        
        setTimeout(() => {
          createStar('shooting');
        }, Math.random() * 5000 + 3000);
      }
    };

    const animate = () => {
      const deltaX = mouseRef.current.x - mouseRef.current.prevX;
      const deltaY = mouseRef.current.y - mouseRef.current.prevY;
      const speed = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const moveX = (mouseRef.current.x - centerX) * 0.03;
      const moveY = (mouseRef.current.y - centerY) * 0.03;
      
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
          case 'twinkling':
            animateTwinklingStar(star, moveX, moveY);
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
      }, 100);
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

    // Create spectacular shooting stars
    const createSpectacularShootingStars = () => {
      if (Math.random() < 0.3) {
        const spectacularStar = document.createElement('div');
        spectacularStar.className = 'unified-star shooting-star spectacular-shooting-star';
        spectacularStar.style.width = '4px';
        spectacularStar.style.height = '4px';
        spectacularStar.style.background = '#ffffff';
        spectacularStar.style.borderRadius = '50%';
        spectacularStar.style.position = 'absolute';
        spectacularStar.style.zIndex = '6';
        
        const edge = Math.floor(Math.random() * 4);
        switch (edge) {
          case 0:
            spectacularStar.style.left = '-50px';
            spectacularStar.style.top = '-50px';
            break;
          case 1:
            spectacularStar.style.left = `${window.innerWidth + 50}px`;
            spectacularStar.style.top = '-50px';
            break;
          case 2:
            spectacularStar.style.left = '-50px';
            spectacularStar.style.top = `${window.innerHeight + 50}px`;
            break;
          case 3:
            spectacularStar.style.left = `${window.innerWidth + 50}px`;
            spectacularStar.style.top = `${window.innerHeight + 50}px`;
            break;
        }
        
        container.appendChild(spectacularStar);
        
        const targetX = edge === 1 || edge === 3 ? -200 : window.innerWidth + 200;
        const targetY = edge === 0 || edge === 1 ? window.innerHeight + 200 : -200;
        
        spectacularStar.style.transition = 'all 2s linear';
        spectacularStar.style.boxShadow = '0 0 30px rgba(255, 255, 255, 0.9)';
        
        setTimeout(() => {
          spectacularStar.style.left = `${targetX}px`;
          spectacularStar.style.top = `${targetY}px`;
          spectacularStar.style.opacity = '0';
        }, 100);
        
        setTimeout(() => {
          if (spectacularStar.parentNode) {
            spectacularStar.parentNode.removeChild(spectacularStar);
          }
        }, 2500);
      }
    };

    // Initialize
    createStars();
    animate();

    // Event listeners
    document.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    
    // Spectacular shooting stars interval
    const spectacularInterval = setInterval(createSpectacularShootingStars, 8000);

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      clearInterval(spectacularInterval);
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
