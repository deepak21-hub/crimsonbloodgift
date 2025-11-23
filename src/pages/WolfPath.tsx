import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BackgroundEffects } from '@/components/BackgroundEffects';
import { PageTransition } from '@/components/PageTransition';
import { Button } from '@/components/ui/button';

const storyStages = [
  {
    text: "Under the Blood Moon, the Alpha stepped from the shadows. Wild, fierce, yet impossibly gentle when he whispered your name. His amber eyes held the wisdom of the forest and the ferocity of the storm.",
    choices: [
      { text: "Follow him into the woods", next: 1 },
      { text: "Ask why he watches you", next: 2 },
    ],
  },
  {
    text: "Ancient trees embraced you as you walked deeper into moonlit wilderness. His presence was warmth in the cool night air. 'The pack has legends,' he said softly. 'Of a bond that transcends time. I never believed... until I saw you.'",
    choices: [
      { text: "Ask about the legend", next: 3 },
      { text: "Take his hand", next: 4 },
    ],
  },
  {
    text: "'Because you are mine,' he said with certainty that shook the stars. 'Not as possession, but as destiny. Every full moon, I've searched. Every howl carried your name. My soul recognized yours before we ever met.'",
    choices: [
      { text: "Tell him you feel it too", next: 4 },
      { text: "Ask what happens now", next: 3 },
    ],
  },
  {
    text: "'They say when a wolf finds their true mate, the moon itself rejoices,' he explained, gesturing to the crimson sky. 'Tonight, she bleeds red to witness our union. Will you run with me? Will you let me show you freedom?'",
    choices: [
      { text: "Say yes", next: 5 },
      { text: "Ask if you'll change", next: 6 },
    ],
  },
  {
    text: "His fingers intertwined with yours, warm and strong. Electricity sparked between you—primal, magnetic, eternal. In his eyes, you saw not a beast, but a soul as deep as the forest itself. 'You are my moon,' he whispered. 'And I am your wolf.'",
    choices: [
      { text: "Kiss him", next: 5 },
      { text: "Rest your head on his shoulder", next: 5 },
    ],
  },
  {
    text: "The world melted away. His embrace was safety and wildness intertwined. Under the Blood Moon, surrounded by ancient trees, you understood—this was home. Not a place, but a soul. The forest sang with your heartbeats, now forever synchronized.",
    choices: [
      { text: "Continue to the puzzle", next: 'puzzle' },
    ],
  },
  {
    text: "'Change?' He smiled, showing a hint of fang. 'You'll remain yourself—only more. Senses sharper, spirit freer, heart fuller. The wolf within awakens only if you wish it. But our bond? That is eternal, in this form or any other.'",
    choices: [
      { text: "Accept the bond", next: 5 },
    ],
  },
];

export const WolfPath = () => {
  const [currentStage, setCurrentStage] = useState(0);
  const navigate = useNavigate();

  const handleChoice = (next: number | string) => {
    if (next === 'puzzle') {
      navigate('/puzzle');
    } else {
      setCurrentStage(next as number);
    }
  };

  const stage = storyStages[currentStage];

  return (
    <PageTransition>
      <div className="min-h-screen relative flex items-center justify-center overflow-hidden px-4">
        <BackgroundEffects />
        
        {/* Forest fog effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent opacity-60" />
        
        {/* Glowing wolf eyes in background */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${10 + i * 20}%`,
                top: `${30 + (i % 2) * 20}%`,
              }}
              animate={{
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            >
              <div className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-accent blur-sm" />
                <div className="w-2 h-2 rounded-full bg-accent blur-sm" />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          key={currentStage}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-3xl bg-card/80 backdrop-blur-md border-2 border-accent rounded-lg p-8 md:p-12 deep-shadow"
        >
          <div className="flex items-center justify-center mb-8">
            <motion.div 
              className="text-6xl"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🐺
            </motion.div>
          </div>

          <p className="font-serif text-xl md:text-2xl leading-relaxed text-center mb-12 text-foreground/90">
            {stage.text}
          </p>

          <div className="flex flex-col gap-4">
            {stage.choices.map((choice, index) => (
              <Button
                key={index}
                onClick={() => handleChoice(choice.next)}
                variant="outline"
                size="lg"
                className="font-cursive text-xl bg-secondary hover:bg-accent/20 border-accent hover:border-accent/80 text-foreground transition-all duration-300"
                style={{
                  boxShadow: '0 0 0 hsl(38 92% 50% / 0)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 20px hsl(38 92% 50% / 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 0 hsl(38 92% 50% / 0)';
                }}
              >
                {choice.text}
              </Button>
            ))}
          </div>

          <button
            onClick={() => navigate('/')}
            className="mt-8 text-sm text-muted-foreground hover:text-accent transition-colors font-cursive"
          >
            ← Return to the Blood Moon
          </button>
        </motion.div>
      </div>
    </PageTransition>
  );
};
