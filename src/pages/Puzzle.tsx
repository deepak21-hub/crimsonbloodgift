import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BackgroundEffects } from '@/components/BackgroundEffects';
import { PageTransition } from '@/components/PageTransition';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import bloodRose from '@/assets/blood-rose.jpg';

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
    if (isComplete) return;
    
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

  const getPieceStyle = (pieceValue: number) => {
    const row = Math.floor(pieceValue / PUZZLE_SIZE);
    const col = pieceValue % PUZZLE_SIZE;
    const percentX = (col * 100) / (PUZZLE_SIZE - 1);
    const percentY = (row * 100) / (PUZZLE_SIZE - 1);

    return {
      backgroundImage: `url(${bloodRose})`,
      backgroundSize: '300%',
      backgroundPosition: `${percentX}% ${percentY}%`,
    };
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

        {/* Preview of complete image */}
        {!isComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10 mb-6"
          >
            <p className="font-cursive text-sm text-muted-foreground mb-2">Preview:</p>
            <div className="w-32 h-32 rounded-lg border border-primary/30 overflow-hidden opacity-40">
              <img src={bloodRose} alt="Blood Rose Preview" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="relative z-10 mb-12"
        >
          <div
            className="grid gap-1 p-4 bg-card/90 backdrop-blur-md border-2 border-primary rounded-lg deep-shadow"
            style={{
              gridTemplateColumns: `repeat(${PUZZLE_SIZE}, 1fr)`,
            }}
          >
            {pieces.map((piece, index) => {
              const isSelected = selectedPiece === index;
              const isCorrect = piece === index;

              return (
                <motion.button
                  key={index}
                  onClick={() => handlePieceClick(index)}
                  whileHover={!isComplete ? { scale: 1.05 } : {}}
                  whileTap={!isComplete ? { scale: 0.95 } : {}}
                  disabled={isComplete}
                  className={`w-24 h-24 md:w-32 md:h-32 rounded-md border-2 transition-all duration-300 overflow-hidden relative ${
                    isSelected
                      ? 'border-blood ring-4 ring-blood/50 z-10'
                      : isComplete || isCorrect
                      ? 'border-primary/50'
                      : 'border-muted hover:border-primary'
                  }`}
                  style={{
                    ...getPieceStyle(piece),
                    boxShadow: isSelected
                      ? '0 0 30px hsl(0 100% 40% / 0.6)'
                      : isComplete
                      ? '0 0 15px hsl(0 85% 35% / 0.4)'
                      : 'none',
                    cursor: isComplete ? 'default' : 'pointer',
                  }}
                >
                  {isSelected && !isComplete && (
                    <div className="absolute inset-0 bg-blood/30 flex items-center justify-center">
                      <span className="text-white font-gothic text-2xl">✓</span>
                    </div>
                  )}
                  {isComplete && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="absolute inset-0 bg-gradient-to-br from-blood/20 via-transparent to-transparent"
                    />
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
            className="relative z-10 flex flex-col gap-4 items-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', bounce: 0.5 }}
              className="text-6xl mb-4"
            >
              🌹
            </motion.div>
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
