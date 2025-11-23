import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BackgroundEffects } from '@/components/BackgroundEffects';
import { PageTransition } from '@/components/PageTransition';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const PUZZLE_SIZE = 3;
const TOTAL_PIECES = PUZZLE_SIZE * PUZZLE_SIZE;

export const Puzzle = () => {
  const navigate = useNavigate();
  const [pieces, setPieces] = useState<number[]>([]);
  const [selectedPiece, setSelectedPiece] = useState<number | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Shuffle puzzle pieces
    const shuffled = Array.from({ length: TOTAL_PIECES }, (_, i) => i).sort(
      () => Math.random() - 0.5
    );
    setPieces(shuffled);
  }, []);

  useEffect(() => {
    // Check if puzzle is complete
    const complete = pieces.every((piece, index) => piece === index);
    if (complete && pieces.length > 0 && !isComplete) {
      setIsComplete(true);
      toast.success('You have assembled the Blood Rose! The path continues...');
    }
  }, [pieces, isComplete]);

  const handlePieceClick = (index: number) => {
    if (selectedPiece === null) {
      setSelectedPiece(index);
    } else {
      // Swap pieces
      const newPieces = [...pieces];
      [newPieces[selectedPiece], newPieces[index]] = [
        newPieces[index],
        newPieces[selectedPiece],
      ];
      setPieces(newPieces);
      setSelectedPiece(null);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden px-4 py-20">
        <BackgroundEffects />

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center mb-12"
        >
          <h1 className="font-gothic text-5xl md:text-6xl text-glow mb-4">
            Assemble the Blood Rose
          </h1>
          <p className="font-cursive text-2xl text-primary/80">
            {isComplete
              ? 'The rose blooms eternal...'
              : 'Click two pieces to swap them'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="relative z-10 mb-12"
        >
          <div
            className="grid gap-2 p-4 bg-card/80 backdrop-blur-md border-2 border-primary rounded-lg deep-shadow"
            style={{
              gridTemplateColumns: `repeat(${PUZZLE_SIZE}, 1fr)`,
            }}
          >
            {pieces.map((piece, index) => {
              const row = Math.floor(piece / PUZZLE_SIZE);
              const col = piece % PUZZLE_SIZE;
              const isSelected = selectedPiece === index;
              const isCorrect = piece === index;

              return (
                <motion.button
                  key={index}
                  onClick={() => handlePieceClick(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-24 h-24 md:w-32 md:h-32 rounded-lg border-2 transition-all duration-300 ${
                    isSelected
                      ? 'border-blood ring-4 ring-blood/50'
                      : isComplete || isCorrect
                      ? 'border-primary'
                      : 'border-muted'
                  }`}
                  style={{
                    background: `
                      radial-gradient(circle at ${50 + col * 20}% ${50 + row * 20}%, 
                      hsl(0 100% 40%) 0%, 
                      hsl(0 85% 25%) 30%, 
                      hsl(0 0% 10%) 60%)
                    `,
                    boxShadow: isSelected
                      ? '0 0 30px hsl(0 100% 40% / 0.6)'
                      : isComplete || isCorrect
                      ? '0 0 15px hsl(0 85% 35% / 0.4)'
                      : 'none',
                  }}
                >
                  {isComplete && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="text-4xl"
                    >
                      🌹
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 flex flex-col gap-4"
          >
            <Button
              onClick={() => navigate('/gift')}
              size="lg"
              className="font-cursive text-2xl px-12 py-6 bg-gradient-blood border-2 border-primary text-primary-foreground hover:brightness-110 text-glow"
            >
              Claim Your Gift 🌹
            </Button>
            <button
              onClick={() => navigate('/')}
              className="text-sm text-muted-foreground hover:text-primary transition-colors font-cursive"
            >
              ← Return to the Blood Moon
            </button>
          </motion.div>
        )}

        {!isComplete && (
          <button
            onClick={() => navigate('/')}
            className="relative z-10 mt-8 text-sm text-muted-foreground hover:text-primary transition-colors font-cursive"
          >
            ← Return to the Blood Moon
          </button>
        )}
      </div>
    </PageTransition>
  );
};
