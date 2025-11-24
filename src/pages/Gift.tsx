import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BackgroundEffects } from '@/components/BackgroundEffects';
import { PageTransition } from '@/components/PageTransition';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Download, Upload, Heart, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { toast } from 'sonner';
import giftVideo from '@/assets/SpotiDownloader.com - bargad - sufr 2_2.mp4';
import moonlitDesires from '@/assets/Moonlit Desires (1).mp3';
import moonlitHearts from '@/assets/Moonlit Hearts.mp3';
import eternalBite from '@/assets/Eternal Bite (1).mp3';

const songs = [
  { name: 'Moonlit Desires', file: moonlitDesires },
  { name: 'Moonlit Hearts', file: moonlitHearts },
  { name: 'Eternal Bite', file: eternalBite },
];

export const Gift = () => {
  const navigate = useNavigate();
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>(giftVideo);
  const [recipientName, setRecipientName] = useState('Aylin');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const downloadMusic = () => {
    const link = document.createElement('a');
    link.href = songs[currentSongIndex].file;
    link.download = `${songs[currentSongIndex].name}-Birthday-Gift.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Music downloaded!');
  };

  const changeSong = (index: number) => {
    const wasPlaying = isPlaying;
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setCurrentSongIndex(index);
    setIsPlaying(false);
    setTimeout(() => {
      if (wasPlaying && audioRef.current) {
        audioRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }, 100);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('video/')) {
        setVideoFile(file);
        setVideoUrl(URL.createObjectURL(file));
        toast.success('Video uploaded successfully!');
      } else {
        toast.error('Please upload a video file');
      }
    }
  };

  const handleDownload = () => {
    if (videoFile) {
      const link = document.createElement('a');
      link.href = videoUrl;
      link.download = videoFile.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Video downloaded!');
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden px-4 py-20">
        <BackgroundEffects />

        {/* Giant glowing moon */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-gradient-to-br from-blood to-blood-dark moon-glow animate-pulse-glow pointer-events-none"
        />

        {/* Falling petals */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-3xl opacity-60"
              initial={{ top: '-10%', left: `${Math.random() * 100}%`, rotate: 0 }}
              animate={{
                top: '110%',
                rotate: 360,
                x: [0, 50, -50, 0],
              }}
              transition={{
                duration: 8 + Math.random() * 8,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: 'linear',
              }}
            >
              🌹
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 max-w-4xl w-full">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="font-gothic text-6xl md:text-7xl text-glow mb-6">
              Happy Birthday Aylin! 🎉
            </h1>
            <p className="font-cursive text-3xl text-primary/80 mb-4">
              Your Special Day Under the Blood Moon
            </p>
            <div className="flex items-center justify-center gap-2 text-blood animate-pulse-glow">
              <Heart className="w-6 h-6 fill-current" />
              <Heart className="w-8 h-8 fill-current" />
              <Heart className="w-6 h-6 fill-current" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-card/90 backdrop-blur-md border-2 border-primary rounded-lg p-8 md:p-12 deep-shadow mb-8"
          >
            {/* Certificate */}
            <div className="mb-10 p-6 border-2 border-blood/50 rounded-lg bg-gradient-to-br from-blood/10 to-transparent">
              <h3 className="font-gothic text-2xl text-center mb-4 text-glow">
                🎂 Happy Birthday Certificate 🎂
              </h3>
              <div className="flex flex-col gap-4 items-center">
                <Label htmlFor="name" className="font-cursive text-xl">
                  This special birthday gift is for:
                </Label>
                <Input
                  id="name"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="Enter your name"
                  className="max-w-md text-center font-cursive text-xl bg-background/50 border-primary"
                />
                {recipientName && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-gothic text-3xl text-glow mt-2"
                  >
                    {recipientName}
                  </motion.p>
                )}
              </div>
            </div>

            {/* Music Player */}
            <div className="mb-10 p-6 border-2 border-primary/50 rounded-lg bg-gradient-to-br from-primary/10 to-transparent">
              <audio ref={audioRef} src={songs[currentSongIndex].file} loop />
              <h3 className="font-gothic text-2xl text-center mb-6 text-glow">
                🎵 Your Birthday Song 🎵
              </h3>
              <div className="glass-morphism-card p-6 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={togglePlay}
                      className="w-14 h-14 bg-gradient-blood rounded-full flex items-center justify-center hover:brightness-110 transition-all moon-glow"
                    >
                      {isPlaying ? <Pause className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 text-white ml-1" />}
                    </button>
                    <div>
                      <select
                        value={currentSongIndex}
                        onChange={(e) => changeSong(Number(e.target.value))}
                        className="font-gothic text-lg bg-transparent border-none text-glow cursor-pointer hover:text-primary transition-colors"
                      >
                        {songs.map((song, index) => (
                          <option key={index} value={index} className="bg-card text-foreground">
                            {song.name}
                          </option>
                        ))}
                      </select>
                      <p className="font-cursive text-sm text-muted-foreground">Birthday Special</p>
                    </div>
                  </div>
                  <Button
                    onClick={downloadMusic}
                    variant="outline"
                    size="sm"
                    className="border-primary hover:bg-primary/20"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleMute}
                    className="p-2 hover:bg-primary/20 rounded-full transition-all"
                  >
                    {isMuted ? <VolumeX className="w-5 h-5 text-primary" /> : <Volume2 className="w-5 h-5 text-primary" />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, hsl(0 85% 35%) 0%, hsl(0 85% 35%) ${volume * 100}%, hsl(0 20% 12%) ${volume * 100}%, hsl(0 20% 12%) 100%)`
                    }}
                  />
                  <span className="text-sm text-muted-foreground w-12 text-right">{Math.round(volume * 100)}%</span>
                </div>
              </div>
            </div>

            {/* Video Upload/Display */}
            <div className="mb-8">
              <h3 className="font-gothic text-2xl text-center mb-6 text-glow">
                🎁 Your Birthday Video Gift 🎁
              </h3>

              {!videoUrl ? (
                <div className="flex flex-col items-center gap-6">
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full aspect-video bg-gradient-to-br from-blood/20 to-secondary border-2 border-dashed border-primary rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blood transition-all duration-300 group"
                  >
                    <Upload className="w-16 h-16 text-primary group-hover:text-blood transition-colors mb-4" />
                    <p className="font-cursive text-xl text-muted-foreground group-hover:text-foreground transition-colors">
                      Click to upload your video gift
                    </p>
                    <p className="font-cursive text-sm text-muted-foreground mt-2">
                      (MP4, MOV, AVI, etc.)
                    </p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6"
                >
                  <div className="relative rounded-lg overflow-hidden border-2 border-primary moon-glow">
                    <video
                      src={videoUrl || giftVideo}
                      controls
                      className="w-full aspect-video bg-black"
                    />
                  </div>
                  <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <Button
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = videoUrl || giftVideo;
                        link.download = 'bloodmoon-gift.mp4';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        toast.success('Video downloaded!');
                      }}
                      size="lg"
                      className="font-cursive text-xl bg-gradient-blood border-2 border-primary text-primary-foreground hover:brightness-110 text-glow"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Download Your Video Gift ❤️
                    </Button>
                    {videoFile && (
                      <Button
                        onClick={() => {
                          setVideoFile(null);
                          setVideoUrl(giftVideo);
                        }}
                        variant="outline"
                        size="lg"
                        className="font-cursive text-xl border-primary hover:bg-primary/20"
                      >
                        <Upload className="w-5 h-5 mr-2" />
                        Upload Different Video
                      </Button>
                    )}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Heartfelt message section */}
            <div className="p-6 border-2 border-blood/30 rounded-lg bg-gradient-to-br from-blood/5 to-transparent">
              <p className="font-cursive text-xl text-center leading-relaxed text-foreground/90">
                "Happy Birthday, Aylin! 🎂✨ On this special day under the crimson Blood Moon,
                I wanted to give you something as unique and magical as you are.
                May this year bring you endless joy, unforgettable adventures,
                and dreams that come true. Like the eternal bond between vampire and wolf,
                our friendship is timeless. You light up every moment, and today we celebrate YOU!
                Here's to another amazing year of your incredible journey. Enjoy your special gift! 🎉💝"
              </p>
              <div className="flex justify-center gap-2 mt-6">
                <Heart className="w-5 h-5 text-blood fill-current animate-heartbeat" />
                <Heart className="w-5 h-5 text-blood fill-current animate-heartbeat" style={{ animationDelay: '0.2s' }} />
                <Heart className="w-5 h-5 text-blood fill-current animate-heartbeat" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </motion.div>

          {/* Navigation buttons */}
          <div className="flex flex-col items-center gap-4">
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              size="lg"
              className="font-cursive text-xl border-primary hover:bg-primary/20"
            >
              Replay Journey 🌙
            </Button>
          </div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="relative z-10 mt-20 text-center"
        >
          <div className="flex items-center justify-center gap-8 mb-4">
            <div className="text-4xl animate-pulse-glow">🐺</div>
            <div className="text-4xl animate-pulse-glow" style={{ animationDelay: '0.5s' }}>🦇</div>
          </div>
          <p className="font-cursive text-xl text-muted-foreground">
            Happy Birthday, Aylin! May your day be as magical as the Bloodmoon. 🎂🌙
          </p>
        </motion.footer>
      </div>
    </PageTransition>
  );
};
