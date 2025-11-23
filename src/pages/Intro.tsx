import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BackgroundEffects } from '@/components/BackgroundEffects';
import { PageTransition } from '@/components/PageTransition';

export const Intro = () => {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden">
        <BackgroundEffects />
        
        {/* Blood Moon */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="absolute top-20 w-64 h-64 rounded-full bg-gradient-to-br from-blood to-blood-dark moon-glow"
        />

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="relative z-10 text-center mb-16"
        >
          <h1 className="font-gothic text-7xl md:text-8xl text-glow mb-4 tracking-wider">
            Bloodmoon Bond
          </h1>
          <p className="font-cursive text-3xl text-primary/80">
            Choose your destiny under the Blood Moon
          </p>
        </motion.div>

        {/* Character Selection */}
        <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center justify-center">
          {/* Vampire Prince */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            whileHover={{ scale: 1.05, filter: 'brightness(1.2)' }}
            onClick={() => navigate('/vampire')}
            className="cursor-pointer group relative"
          >
            <div className="w-64 h-96 bg-gradient-to-b from-blood/30 to-secondary border-2 border-primary rounded-lg deep-shadow overflow-hidden">
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                <div className="w-32 h-32 mb-6 rounded-full bg-blood/40 flex items-center justify-center moon-glow group-hover:animate-pulse-glow">
                  <div className="text-6xl">🦇</div>
                </div>
                <h3 className="font-gothic text-3xl text-glow mb-2">Vampire Prince</h3>
                <p className="font-cursive text-lg text-primary/70 text-center">
                  Eternal darkness & crimson desire
                </p>
                <div className="mt-6 flex gap-4">
                  <div className="w-3 h-3 rounded-full bg-blood animate-pulse-glow" />
                  <div className="w-3 h-3 rounded-full bg-blood animate-pulse-glow" style={{ animationDelay: '0.5s' }} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Wolf Alpha */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            whileHover={{ scale: 1.05, filter: 'brightness(1.2)' }}
            onClick={() => navigate('/wolf')}
            className="cursor-pointer group relative"
          >
            <div className="w-64 h-96 bg-gradient-to-b from-secondary to-muted border-2 border-accent rounded-lg deep-shadow overflow-hidden">
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                <div className="w-32 h-32 mb-6 rounded-full bg-accent/30 flex items-center justify-center group-hover:animate-pulse-glow" style={{ boxShadow: '0 0 40px hsl(38 92% 50% / 0.4)' }}>
                  <div className="text-6xl">🐺</div>
                </div>
                <h3 className="font-gothic text-3xl mb-2" style={{ textShadow: '0 0 20px hsl(38 92% 50% / 0.5)' }}>Wolf Alpha</h3>
                <p className="font-cursive text-lg text-accent/70 text-center">
                  Wild heart & moonlit devotion
                </p>
                <div className="mt-6 flex gap-4">
                  <div className="w-3 h-3 rounded-full bg-accent animate-pulse-glow" />
                  <div className="w-3 h-3 rounded-full bg-accent animate-pulse-glow" style={{ animationDelay: '0.5s' }} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Floating instruction */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="relative z-10 mt-16 font-cursive text-xl text-muted-foreground animate-float"
        >
          Click to begin your eternal romance...
        </motion.p>
      </div>
    </PageTransition>
  );
};
