import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BackgroundEffects } from '@/components/BackgroundEffects';
import { PageTransition } from '@/components/PageTransition';
import { Button } from '@/components/ui/button';

const storyStages = [
  {
    text: "In the crimson halls of the Night Court, his cold fingers brushed yours. His eyes—ancient and crimson—held centuries of desire, but only one heartbeat mattered: yours.",
    choices: [
      { text: "Take his hand", next: 1 },
      { text: "Step back", next: 2 },
    ],
  },
  {
    text: "His grip was gentle yet possessive. 'I have waited lifetimes for you,' he whispered, his breath cold against your skin. The ballroom faded as he led you through velvet curtains to a moonlit balcony overlooking an endless night.",
    choices: [
      { text: "Ask about his past", next: 3 },
      { text: "Lean closer", next: 4 },
    ],
  },
  {
    text: "Fear flickered in your chest, but curiosity burned brighter. He smiled—fangs glinting like diamonds—and extended his hand once more. 'Fear and desire are two sides of the same coin, my love. Which will you choose?'",
    choices: [
      { text: "Take his hand anyway", next: 1 },
      { text: "Run deeper into the castle", next: 5 },
    ],
  },
  {
    text: "'Centuries of solitude,' he murmured, crimson eyes distant. 'Empires rose and fell. I danced with queens and dined with kings. But immortality is a curse without someone to share eternity with.' His gaze returned to you, burning with intensity.",
    choices: [
      { text: "Touch his face", next: 4 },
      { text: "Ask if he's lonely", next: 6 },
    ],
  },
  {
    text: "The space between you vanished. His lips met yours—cold as marble, yet igniting fire in your veins. Time itself seemed to pause. When he pulled away, his eyes glowed softer. 'You are my dawn in this endless night.'",
    choices: [
      { text: "Continue to the puzzle", next: 'puzzle' },
    ],
  },
  {
    text: "Your footsteps echoed through obsidian corridors. Portraits of pale figures watched with knowing eyes. At the end of the hall, you found a chamber filled with roses—each petal black as night, yet alive with crimson veins. He appeared behind you like shadow given form.",
    choices: [
      { text: "Ask about the roses", next: 3 },
    ],
  },
  {
    text: "'Loneliness is the truest companion of immortality,' he confessed, his voice carrying the weight of ages. 'Until you.' A single crimson tear traced his perfect cheek. 'Will you stay with me, even knowing what I am?'",
    choices: [
      { text: "Say yes", next: 4 },
    ],
  },
];

export const VampirePath = () => {
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
        
        {/* Falling roses animation */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl opacity-60"
              initial={{ top: '-10%', left: `${Math.random() * 100}%`, rotate: 0 }}
              animate={{ 
                top: '110%', 
                rotate: 360,
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: 'linear',
              }}
            >
              🌹
            </motion.div>
          ))}
        </div>

        <motion.div
          key={currentStage}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-3xl bg-card/80 backdrop-blur-md border-2 border-primary rounded-lg p-8 md:p-12 deep-shadow"
        >
          <div className="flex items-center justify-center mb-8">
            <div className="text-6xl animate-pulse-glow">🦇</div>
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
                className="font-cursive text-xl bg-blood/20 hover:bg-blood/40 border-primary hover:border-blood text-foreground hover:text-glow transition-all duration-300"
              >
                {choice.text}
              </Button>
            ))}
          </div>

          <button
            onClick={() => navigate('/')}
            className="mt-8 text-sm text-muted-foreground hover:text-primary transition-colors font-cursive"
          >
            ← Return to the Blood Moon
          </button>
        </motion.div>
      </div>
    </PageTransition>
  );
};
