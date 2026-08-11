import React, { useEffect, useRef } from 'react';

const HeroScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = container.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      container.style.setProperty('--mouse-x', String(x));
      container.style.setProperty('--mouse-y', String(y));
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      <div
        className="absolute top-1/4 -right-24 w-[500px] h-[500px] opacity-30"
        style={{
          background: 'radial-gradient(circle at center, rgba(99,102,241,0.15) 0%, transparent 70%)',
          transform: 'translate(calc(var(--mouse-x, 0) * 30px), calc(var(--mouse-y, 0) * 30px))',
          transition: 'transform 0.1s ease-out',
        }}
      />
      <div
        className="absolute -bottom-32 -left-24 w-[400px] h-[400px] opacity-20"
        style={{
          background: 'radial-gradient(circle at center, rgba(34,211,238,0.1) 0%, transparent 70%)',
          transform: 'translate(calc(var(--mouse-x, 0) * -20px), calc(var(--mouse-y, 0) * -20px))',
          transition: 'transform 0.1s ease-out',
        }}
      />
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-indigo/10 rounded-full animate-morph opacity-30"
        style={{
          background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(34,211,238,0.04))',
          transform: 'translate(calc(-50% + var(--mouse-x, 0) * 40px), calc(-50% + var(--mouse-y, 0) * 40px))',
          transition: 'transform 0.15s ease-out',
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-cyan-signal/10 rounded-full animate-morph opacity-20"
        style={{
          animationDelay: '-3s',
          background: 'radial-gradient(circle at center, rgba(34,211,238,0.06) 0%, transparent 70%)',
          transform: 'translate(calc(-50% + var(--mouse-x, 0) * -30px), calc(-50% + var(--mouse-y, 0) * -30px))',
          transition: 'transform 0.15s ease-out',
        }}
      />
    </div>
  );
};

export default HeroScene;
