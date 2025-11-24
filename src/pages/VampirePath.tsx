import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BackgroundEffects } from '@/components/BackgroundEffects';
import { PageTransition } from '@/components/PageTransition';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';
import vampireMusic from '@/assets/Moonlit Desires (1).mp3';

const storyStages = [
  // Chapter 1 - The Blood Moon Rises
  {
    title: "CHAPTER 1 — THE BLOOD MOON RISES",
    text: "Tonight, the moon did not rise silver. It rose red.\n\nA deep, glowing scarlet that painted your room in warm, haunting shadows. You stood frozen, staring out your window at the moon's eerie beauty.\n\nThen you saw it.\n\nA single black rose placed exactly in the center of your windowsill. Its petals gleamed like midnight silk, but the veins shimmered crimson—as though the flower itself had a heartbeat.\n\nAttached was a note:\n\n\"When the Blood Moon calls, the heart it chooses must answer.\"\n— C.\n\nA cold breeze swept across your room—and when you turned…\n\nHe stood there.\n\nTall, pale, impossibly beautiful. Dark hair brushing his shoulders. Eyes glowing a deep, haunting red.\n\nNot monstrous. Tragic. Lonely.\n\n\"You finally see me,\" he whispered.",
    choices: [
      { text: "Continue", next: 1 },
    ],
  },
  // Chapter 2 - The Prince of Shadows
  {
    title: "CHAPTER 2 — THE PRINCE OF SHADOWS",
    text: "He took a single step forward.\n\nHis boots made no sound. His presence filled the room like a cold whisper.\n\n\"Do not fear me,\" he said, voice soft as velvet. \"I have watched you from the shadows of your world… and waited.\"\n\nHe lifted the rose slightly. It pulsed—like it recognized you.\n\n\"It bloomed when your heart called mine.\"\n\nYour chest tightened. Somewhere deep inside you, something felt strangely familiar. As if you had known him a lifetime ago—or many.\n\nHe extended his hand.\n\n\"Come with me.\"\n\"To the Crimson Court.\"\n\"To the truth.\"",
    choices: [
      { text: "Take his cold hand", next: 2 },
      { text: "Step away in fear or confusion", next: 3 },
    ],
  },
  // Chapter 3A - If you take his hand
  {
    title: "CHAPTER 3A — IF YOU TAKE HIS HAND",
    text: "The moment your fingers touched his… the world shifted.\n\nA cold rush flooded through you—not painful, but breathtaking. Like stepping into moonlight for the first time.\n\nHe let out the softest gasp.\n\n\"Your heartbeat…\" he whispered, \"It echoes mine.\"\n\nHe intertwined his fingers with yours, almost reverently.\n\nAnd the shadows swallowed you both.",
    choices: [
      { text: "Continue", next: 4 },
    ],
  },
  // Chapter 3B - If you step back
  {
    title: "CHAPTER 3B — IF YOU STEP BACK",
    text: "You stepped away—heart racing.\n\nHe didn't chase. He didn't threaten.\n\nHe simply placed a hand over his heart and bowed.\n\n\"I am sorry,\" he said softly. \"I forget how humans feel fear. I will walk slowly… at your pace.\"\n\nHis voice cracked just slightly. Not predator. Not monster. Just… lonely.\n\nHe extended his hand again, with patience this time.\n\nAnd when you touched it—the shadows carried you both away.",
    choices: [
      { text: "Continue", next: 4 },
    ],
  },
  // Chapter 4 - The Crimson Court
  {
    title: "CHAPTER 4 — THE CRIMSON COURT",
    text: "You arrived in a world of midnight beauty.\n\nTall obsidian towers pierced the red sky. Velvet drapes swayed in cold moonlight. Roses grew from stone walls, dripping crimson dew. Ancient paintings watched with glowing eyes.\n\nThis was not horror. This was elegance. A palace made of darkness and longing.\n\nHe led you to a balcony overlooking the glowing red moon.\n\n\"This is the Crimson Court,\" he said. \"A place untouched by warmth… for centuries.\"\n\nYou asked why he brought you.\n\nHe turned to you slowly. His voice low, trembling:\n\n\"Because your heart reminded mine that it once lived.\"",
    choices: [
      { text: "Ask him who he truly is", next: 5 },
      { text: "Remain silent and let him speak", next: 6 },
    ],
  },
  // Chapter 5A - The Name He Hides
  {
    title: "CHAPTER 5A — THE NAME HE HIDES",
    text: "He looked away, as if the question hurt.\n\n\"I am called many things,\" he said quietly. \"Night Prince. Crimson Heir. The Last of the Eternal Bloodline.\"\n\nHe paused. Then, softer:\n\n\"But long before that… I was simply a man named Caelum.\"\n\nHe said it like it was a confession.\n\n\"A man who once loved. A man who lost everything. A man cursed to wander eternity alone.\"\n\nHe lifted your hand.\n\n\"Until your heart called mine back to life.\"",
    choices: [
      { text: "Continue", next: 7 },
    ],
  },
  // Chapter 5B - The Confession in Silence
  {
    title: "CHAPTER 5B — THE CONFESSION IN SILENCE",
    text: "He studied your face carefully.\n\nThe silence between you was warm. Comfortable. Meaningful.\n\nThen he spoke in a whisper:\n\n\"You don't ask… because you feel it. You sense the truth.\"\n\nHe placed his hand gently over yours.\n\n\"I have been broken for centuries. But tonight… I feel whole.\"\n\nYour silence meant more to him than words.",
    choices: [
      { text: "Continue", next: 7 },
    ],
  },
  // Chapter 6 - The Secret Hall
  {
    title: "CHAPTER 6 — THE SECRET HALL",
    text: "He guided you deeper into the Court.\n\nThe halls glowed with floating candles. Ancient portraits shifted their gaze as you passed. A long staircase spiraled upward, ending at a massive door engraved with vines and moons.\n\n\"No one enters this room,\" he said quietly. \"Not my guards. Not my council. Not even the night itself.\"\n\nHe looked at you. \"But you may.\"\n\nInside was a room filled with memories: A cracked sword. A silver crown. A blood-red cloak. A painting of a woman who looked heartbreakingly familiar to you.\n\nYour breath caught. He noticed.\n\n\"She was the first human I loved,\" he said gently. \"I failed her.\"\n\nHe stepped closer. \"I do not wish to fail you.\"",
    choices: [
      { text: "Ask what happened to her", next: 8 },
      { text: "Touch his arm and tell him you're here now", next: 9 },
    ],
  },
  // Chapter 7A - The First Love
  {
    title: "CHAPTER 7A — THE FIRST LOVE",
    text: "He closed his eyes. Pain tightened his jaw.\n\n\"She was mortal. I was not. Time took her long before I could stop it.\"\n\nYour heart ached.\n\n\"Every century, the Blood Moon rises,\" he said. \"And with it… I feel her absence.\"\n\nHe looked into your eyes.\n\n\"But tonight… I do not see her in the moon. I see you.\"",
    choices: [
      { text: "Continue", next: 10 },
    ],
  },
  // Chapter 7B - The Touch That Heals
  {
    title: "CHAPTER 7B — THE TOUCH THAT HEALS",
    text: "When your fingers brushed his arm—\n\nHe inhaled sharply. Not out of hunger. But out of emotion.\n\nHis cold hand covered yours.\n\n\"You touch me as if I'm not a monster,\" he whispered. \"As if I'm still human.\"\n\nHe leaned slightly into your touch.\n\n\"Maybe with you… I can be.\"",
    choices: [
      { text: "Continue", next: 10 },
    ],
  },
  // Chapter 8 - The Heart of the Night
  {
    title: "CHAPTER 8 — THE HEART OF THE NIGHT",
    text: "He led you to the highest balcony.\n\nThe Blood Moon loomed huge, lighting the Court in red-gold. Wind wrapped around both of you. Petals swirled like a storm of roses.\n\nHe turned to you. For the first time, truly vulnerable.\n\n\"I do not want your blood. I do not want your fear. I want… your presence.\"\n\nHe took your hands, lifting them to his cold chest.\n\n\"I want the warmth your heart carries. The warmth I lost centuries ago.\"\n\nHis voice trembled:\n\n\"Let me live again… through you.\"",
    choices: [
      { text: "Hold him", next: 11 },
      { text: "Touch his cheek softly", next: 12 },
      { text: "Kiss him", next: 13 },
    ],
  },
  // Chapter 9A - The Embrace
  {
    title: "CHAPTER 9A — THE EMBRACE",
    text: "You wrap your arms around him gently.\n\nHe freezes—as if no one has touched him in centuries.\n\nThen slowly… his arms come around you.\n\nHe holds you like something precious. Like something rare. Like something he thought he'd never feel again.\n\n\"Your warmth,\" he whispers, \"feels like sunrise.\"",
    choices: [
      { text: "Continue", next: 14 },
    ],
  },
  // Chapter 9B - The Touch He Remembers
  {
    title: "CHAPTER 9B — THE TOUCH HE REMEMBERS",
    text: "Your fingers brush his cheek.\n\nHe closes his eyes instantly. His breath catches—a sound so human it is almost heartbreaking.\n\n\"Your touch…\" he murmurs, \"is the first thing that feels real in a hundred years.\"\n\nHe leans into your hand, fragile and hopeful.",
    choices: [
      { text: "Continue", next: 14 },
    ],
  },
  // Chapter 9C - The Kiss
  {
    title: "CHAPTER 9C — THE KISS",
    text: "You rise onto your toes and kiss him.\n\nSoft. Warm. Dangerous. Beautiful.\n\nHe shudders—a tremor of pure emotion.\n\nHis cold lips soften under yours. His hands rise to your waist, gentle but trembling.\n\n\"You…\" he breathes, \"are my first taste of life.\"",
    choices: [
      { text: "Continue", next: 14 },
    ],
  },
  // Chapter 10 - The Final Gift
  {
    title: "CHAPTER 10 — THE BIRTHDAY GIFT",
    text: "The sky brightens as the Blood Moon reaches its peak.\n\nThe roses around you glow. The Court hums with ancient magic.\n\nCaelum steps back slightly, lifting his hand.\n\nA swirl of crimson petals gathers into a glowing, floating doorway.\n\nInside it—A video. Your birthday gift.\n\n\"This world,\" he says softly, \"I created for your special day, Aylin. But this… This is my final offering.\"\n\nHe holds your hand one last time.\n\n\"Happy Birthday,\" he whispers. \"May this year bring you magic, joy, and endless wonder. Under the Blood Moon, you are celebrated.\"\n\nThe petals burst into red light—revealing your birthday video gift.\n\nCaelum's final words echo:\n\n\"Until we meet again… Happy Birthday, my Crimson Heart. 🎂✨\"",
    choices: [
      { text: "Claim Your Birthday Gift 🎂🌹", next: 'puzzle' },
    ],
  },
];

export const VampirePath = () => {
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
      <audio ref={audioRef} src={vampireMusic} loop muted={isMuted} />
      <button
        onClick={() => {
          setIsMuted(!isMuted);
          if (audioRef.current && isMuted) {
            audioRef.current.play().catch(() => {});
          }
        }}
        className="fixed top-4 right-4 z-50 p-3 bg-card/80 backdrop-blur-md border-2 border-primary rounded-full hover:bg-card transition-all"
      >
        {isMuted ? <VolumeX className="w-6 h-6 text-primary" /> : <Volume2 className="w-6 h-6 text-primary" />}
      </button>
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

          {stage.title && (
            <h2 className="font-cursive text-2xl md:text-3xl text-primary text-center mb-6">
              {stage.title}
            </h2>
          )}
          
          <p className="font-serif text-lg md:text-xl leading-relaxed text-left mb-12 text-foreground/90 whitespace-pre-line">
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
