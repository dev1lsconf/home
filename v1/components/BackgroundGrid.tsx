import React from 'react';

const BackgroundGrid: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-grid opacity-60 parallax-layer" />
      <div
        className="absolute inset-0 parallax-layer"
        style={{
          backgroundImage: 'linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)',
          backgroundSize: '80px 100%',
        }}
      />
      <div
        className="absolute inset-0 parallax-layer"
        style={{
          backgroundImage: 'linear-gradient(0deg, rgba(99,102,241,0.03) 1px, transparent 1px)',
          backgroundSize: '100% 80px',
        }}
      />
      <div
        className="absolute top-[15%] right-[10%] w-96 h-96 parallax-layer opacity-20"
        style={{
          background: 'radial-gradient(circle at center, rgba(99,102,241,0.12) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-[20%] left-[5%] w-72 h-72 parallax-layer opacity-10"
        style={{
          background: 'radial-gradient(circle at center, rgba(34,211,238,0.08) 0%, transparent 70%)',
        }}
      />
    </div>
  );
};

export default BackgroundGrid;
