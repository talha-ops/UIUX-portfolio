import React from 'react';
import useStarSystem from '../hooks/useStarSystem';

const StarContainer = () => {
  const containerRef = useStarSystem();

  return <div id="cursorStars" ref={containerRef}></div>;
};

export default StarContainer;
