import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BackgroundEffects } from '@/components/BackgroundEffects';
import { PageTransition } from '@/components/PageTransition';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';
import wolfMusic from '@/assets/Moonlit Hearts.mp3';

const storyStages = [
  // Chapter 1
  {
    title: "CHAPTER 1 — THE HOWL THAT CALLS YOUR NAME",
    text: "The Blood Moon rose like a burning wound in the sky. Crimson light slid across your room, and with it came a sound that froze your breath: A low, powerful howl—not distant, not wild… but personal. Like it was calling you. When you opened your window, a glowing silver paw-print appeared on the sill. Inside lay a folded piece of paper: 'Come to the Shadow Woods. The Alpha awaits.' Then a rush of cold wind made the curtains billow, and out of the shadows, he stepped. Tall. Broad. Half man, half something wild and ancient. His amber eyes glowed softly. His voice rumbled: 'You heard me.'",
    choices: [
      { text: "Approach him", next: 1 },
      { text: "Stay back", next: 2 },
    ],
  },
  // Chapter 2A
  {
    title: "CHAPTER 2A — HEAT OF THE WILD",
    text: "You step toward him, unable to stop yourself. His hand reaches out—huge, warm, calloused—and gently closes over yours. Heat rushes up your arm like fire under your skin. His eyes widen slightly. 'Your heartbeat… I feel it.' He lifts your hand slowly, almost worshipfully, brushing it against his cheek. His skin is warm—hot—like a creature born from moonlight and fire. His voice is so soft it almost breaks: 'Come with me.' The shadows twist, branches forming a glowing path as he pulls you toward the forest.",
    choices: [{ text: "Continue", next: 3 }],
  },
  // Chapter 2B
  {
    title: "CHAPTER 2B — THE GENTLE MONSTER",
    text: "You step back, breath sharp. He doesn't chase you. Doesn't growl. Instead, he lowers his head in respect—something no wolf ever does. 'I forget,' he murmurs, 'that humans fear the wild.' There's no anger in his voice—only understanding. His glowing eyes flicker with something painful. Loneliness. Then he extends his hand, slower this time. Not demanding. Not dominating. Inviting. When you finally take it, warmth floods your palm. The world warps, shadows spiraling around you as the forest opens like a living gate.",
    choices: [{ text: "Continue", next: 3 }],
  },
  // Chapter 3
  {
    title: "CHAPTER 3 — THE SHADOW WOODS",
    text: "Trees stretch into the sky like cathedral pillars. Silver mist curls around your feet, whispering ancient secrets. Runes carved into bark glow faintly, pulsing in time with your heartbeat. Shadow-wolves watch silently from the edges—protective, not hostile. The Alpha walks beside you, silent, powerful. He leads you to a sacred clearing under the Blood Moon. 'These woods have guarded their secrets for thousands of years. They have never opened for a human… until you.' You ask him why. His voice trembles. 'Because your soul calls to mine. Because I've known your scent in my dreams. Because I chose you from the moment you existed.'",
    choices: [
      { text: "Ask what he truly wants", next: 4 },
      { text: "Hold his gaze in silence", next: 5 },
    ],
  },
  // Chapter 4A
  {
    title: "CHAPTER 4A — THE ALPHA'S CONFESSION",
    text: "He exhales slowly, shoulders relaxing. 'I don't want a mate who bows. I want someone who stands beside me.' His fingers brush yours—gentle, careful. 'I want your fire. Your stubbornness. Your voice saying my name.' His breath warms your cheek. 'Let me be the one who protects your light.'",
    choices: [{ text: "Continue", next: 6 }],
  },
  // Chapter 4B
  {
    title: "CHAPTER 4B — THE SILENT BOND",
    text: "You don't speak. You only meet his eyes. The Alpha freezes. Then softens. Slowly, he takes your hand and places it over his chest. His heartbeat is strong. Leaping. Untamed. 'Your silence speaks louder than words.' He closes his eyes as if memorizing the moment. 'I will never harm you. I will only guard what is yours.'",
    choices: [{ text: "Continue", next: 6 }],
  },
  // Chapter 5
  {
    title: "CHAPTER 5 — THE RUN OF DESTINY",
    text: "The trees pull back, forming a long, glowing path. The Alpha looks at you with a question burning in his eyes. 'Run with me.' Before you can answer, he shifts—bones cracking, muscles expanding, fur sweeping over his body in a beautiful, terrifying transformation. He becomes a massive wolf, silver-black fur glowing under the moon. He lowers himself so you can climb onto his back.",
    choices: [
      { text: "Climb onto his wolf form", next: 7 },
      { text: "Ask him to shift back", next: 8 },
    ],
  },
  // Chapter 6A
  {
    title: "CHAPTER 6A — THE RIDING OF THE WOLF",
    text: "You climb onto him, fingers sinking into thick fur. The moment you hold him, he growls softly in approval. Then he runs. The wind tears past you. Moonlight blurs. The forest becomes streaks of silver and black. He is powerful. Fast. Alive. And every leap feels like flying.",
    choices: [{ text: "Continue", next: 9 }],
  },
  // Chapter 6B
  {
    title: "CHAPTER 6B — THE ALPHA RETURNS",
    text: "You touch his fur gently. 'Shift back.' He obeys instantly, transforming in a swirl of moonlight. His chest rises and falls quickly, eyes glowing with new intensity. 'You'd rather touch my hands than my fur?' A faint smile. A faint blush. He offers you his hand. 'Then run beside me.' And he runs with you, matching every step to yours, never letting you fall behind.",
    choices: [{ text: "Continue", next: 9 }],
  },
  // Chapter 7
  {
    title: "CHAPTER 7 — THE MARK OF CHOICE",
    text: "You reach a sacred stone altar bathed in moonlight. Three symbols glow: A paw-mark, A moon rune, A wildheart sigil. The Alpha explains: 'Choose one. It shapes our bond. Not forever—but tonight.'",
    choices: [
      { text: "Paw-Mark (Protection Bond)", next: 10 },
      { text: "Moon Rune (Emotional Bond)", next: 11 },
      { text: "Wildheart Sigil (Destiny Bond)", next: 12 },
    ],
  },
  // Chapter 8A
  {
    title: "CHAPTER 8A — PROTECTION BOND",
    text: "He places his forehead against yours. Warm. Safe. 'I will guard you with fang and claw.' A silver light wraps you both.",
    choices: [{ text: "Continue", next: 13 }],
  },
  // Chapter 8B
  {
    title: "CHAPTER 8B — EMOTIONAL BOND",
    text: "He takes your hands gently. His voice cracks— 'Let me feel what you feel.' Your emotions pulse together like shared moonlight.",
    choices: [{ text: "Continue", next: 13 }],
  },
  // Chapter 8C
  {
    title: "CHAPTER 8C — DESTINY BOND",
    text: "He looks shocked. Then reverent. 'This bond… is sacred.' Silver fire twines around your wrists, connecting you.",
    choices: [{ text: "Continue", next: 13 }],
  },
  // Chapter 9
  {
    title: "CHAPTER 9 — THE ENEMY IN THE TREES",
    text: "A branch snaps. Something moves. Shadow creatures—moonless wolves—emerge. The Alpha steps in front of you instantly. Growling. Snarling. Ready to tear the world apart for you. 'Stay behind me.' But your choice matters.",
    choices: [
      { text: "Stand with him", next: 14 },
      { text: "Let him fight alone", next: 15 },
    ],
  },
  // Chapter 10A
  {
    title: "CHAPTER 10A — FIGHTING BESIDE THE ALPHA",
    text: "You grab a glowing branch with runes. A weapon. The Alpha sees it—his eyes widen with pride. 'You fight with me.' Together, you attack. You burn through the shadows. You defend each other. He looks at you in awe.",
    choices: [{ text: "Continue", next: 16 }],
  },
  // Chapter 10B
  {
    title: "CHAPTER 10B — THE ALPHA'S FURY",
    text: "You step back instinctively. The Alpha explodes into motion—fur, fangs, moonlit fury. He tears through the enemies with terrifying speed. But afterward… his eyes soften. 'You don't have to fight to be strong.'",
    choices: [{ text: "Continue", next: 16 }],
  },
  // Chapter 11
  {
    title: "CHAPTER 11 — THE WARMTH OF SAFETY",
    text: "He pulls you close—whether you fought or not. His warmth surrounds you. His breathing steadies against your neck. 'You are safe.' For a moment, the world is quiet. Then he whispers: 'But there is more you must see.'",
    choices: [{ text: "Continue", next: 17 }],
  },
  // Chapter 12
  {
    title: "CHAPTER 12 — THE HEART OF THE FOREST",
    text: "He leads you to an ancient tree with silver veins. 'This tree sees truth.' It glows softly, revealing visions: Him as a lonely child-wolf. Him searching for you through dreams. Him calling your name under countless moons. And finally—You. Seeing him. Answering the call. Tears glow in his eyes.",
    choices: [{ text: "Continue", next: 18 }],
  },
  // Chapter 13
  {
    title: "CHAPTER 13 — THE CONFESSION UNDER MOONLIGHT",
    text: "The Alpha steps close—closer than ever. 'You are not just a visitor. You are not just a human.' His fingers brush your jaw. 'You are the one the forest chose for me.' Your heart stutters. He hears it. His breath trembles.",
    choices: [{ text: "Continue", next: 19 }],
  },
  // Chapter 14
  {
    title: "CHAPTER 14 — THE LAST CHOICE",
    text: "The Blood Moon pulses above you. He cups your face with both hands. 'Before the moon sets… choose how this night ends.'",
    choices: [
      { text: "Let him hold you", next: 20 },
      { text: "Touch his cheek", next: 21 },
      { text: "Kiss him", next: 22 },
    ],
  },
  // Chapter 15A - Hold
  {
    title: "CHAPTER 15 — THE EMBRACE",
    text: "You step into his arms, letting his warmth envelop you completely. He holds you like you're the most precious thing in all the worlds. His heartbeat thunders against your chest—wild, alive, yours. 'You are my moon,' he whispers into your hair. 'And I am your wolf, forever.'",
    choices: [{ text: "Continue to the final gift", next: 23 }],
  },
  // Chapter 15B - Touch
  {
    title: "CHAPTER 15 — THE GENTLE TOUCH",
    text: "Your fingers brush his cheek, and he leans into your palm with a shuddering breath. His eyes close, lashes dark against his skin. 'Your touch,' he murmurs, voice breaking, 'feels like coming home after centuries of wandering.' When his eyes open again, they glow with unshed tears and infinite tenderness.",
    choices: [{ text: "Continue to the final gift", next: 23 }],
  },
  // Chapter 15C - Kiss
  {
    title: "CHAPTER 15 — THE KISS",
    text: "You rise to meet him, and his lips find yours—warm, gentle, devastating. He kisses you like you're air itself, like you're the reason the moon rises. His hands cradle your face with trembling reverence. When you finally part, he rests his forehead against yours. 'You are the answer to every howl I've ever cried into the night.'",
    choices: [{ text: "Continue to the final gift", next: 23 }],
  },
  // Final Chapter
  {
    title: "CHAPTER 15 — THE BIRTHDAY GIFT",
    text: "The moonlight swirls upward, shaping words in the air: 'Happy Birthday, Aylin…' A silver portal opens, glowing with ancient magic. The Alpha steps back slightly, his hand still holding yours. 'Inside waits your birthday gift,' he says softly. 'This story, this night, this magic—all created to celebrate you.' His eyes glow with warmth. 'May your new year be filled with wild adventures, fierce joy, and moonlit dreams.' He smiles. 'Happy Birthday, my heart. 🎂🐺✨'",
    choices: [{ text: "Claim your birthday gift 🎂", next: 'puzzle' }],
  },
];

export const WolfPath = () => {
  const [currentStage, setCurrentStage] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.play().catch(() => {});
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

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
      <audio ref={audioRef} src={wolfMusic} loop muted={isMuted} />
      <button
        onClick={() => {
          setIsMuted(!isMuted);
          if (audioRef.current && isMuted) {
            audioRef.current.play().catch(() => {});
          }
        }}
        className="fixed top-4 right-4 z-50 p-3 bg-card/80 backdrop-blur-md border-2 border-accent rounded-full hover:bg-card transition-all"
      >
        {isMuted ? <VolumeX className="w-6 h-6 text-accent" /> : <Volume2 className="w-6 h-6 text-accent" />}
      </button>
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
