import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  left: number;
  duration: number;
  delay: number;
  size: number;
}

export const BackgroundEffects = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < 20; i++) {
      newParticles.push({
        id: i,
        left: Math.random() * 100,
        duration: 15 + Math.random() * 20,
        delay: Math.random() * 8,
        size: 2 + Math.random() * 4,
      });
    }
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Fog overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-background/80" style={{ animation: 'pulse-glow 6s ease-in-out infinite' }} />
      
      {/* Floating embers */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute bottom-0 rounded-full bg-primary/60 blur-sm animate-ember"
          style={{
            left: `${particle.left}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
      
      {/* Red moon glow */}
      <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-primary/20 blur-3xl moon-glow animate-pulse-glow" />
    </div>
  );
};
