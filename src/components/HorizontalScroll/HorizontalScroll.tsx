// HorizontalScroll.tsx
import React, { useRef, useEffect } from 'react';
import { animateSection } from './gsapAnimations';

const HorizontalScroll: React.FC = ({ children }:any) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const sections = container.querySelectorAll('.section');

    animateSection(container, sections);
  }, [children]);

  return (
    <div ref={containerRef}>
      {React.Children.map(children, (child, index) => (
        <div key={index} className="section">
          {child}
        </div>
      ))}
    </div>
  );
};

export default HorizontalScroll;
