import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BackgroundEffects } from '@/components/BackgroundEffects';
import { PageTransition } from '@/components/PageTransition';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Download, Upload, Heart } from 'lucide-react';
import { toast } from 'sonner';

export const Gift = () => {
  const navigate = useNavigate();
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [recipientName, setRecipientName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

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
              Your Final Gift
            </h1>
            <p className="font-cursive text-3xl text-primary/80 mb-4">
              Under the Blood Moon
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
                Bloodmoon Certificate of Destiny
              </h3>
              <div className="flex flex-col gap-4 items-center">
                <Label htmlFor="name" className="font-cursive text-xl">
                  This eternal bond is bestowed upon:
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

            {/* Video Upload/Display */}
            <div className="mb-8">
              <h3 className="font-gothic text-2xl text-center mb-6 text-glow">
                Your Video Gift
              </h3>

              {!videoFile ? (
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
                      src={videoUrl}
                      controls
                      className="w-full aspect-video bg-black"
                    />
                  </div>
                  <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <Button
                      onClick={handleDownload}
                      size="lg"
                      className="font-cursive text-xl bg-gradient-blood border-2 border-primary text-primary-foreground hover:brightness-110 text-glow"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Download Your Video Gift ❤️
                    </Button>
                    <Button
                      onClick={() => {
                        setVideoFile(null);
                        setVideoUrl('');
                      }}
                      variant="outline"
                      size="lg"
                      className="font-cursive text-xl border-primary hover:bg-primary/20"
                    >
                      <Upload className="w-5 h-5 mr-2" />
                      Upload Different Video
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Heartfelt message section */}
            <div className="p-6 border-2 border-blood/30 rounded-lg bg-gradient-to-br from-blood/5 to-transparent">
              <p className="font-cursive text-xl text-center leading-relaxed text-foreground/90">
                "In the crimson light of the Blood Moon, under stars that have
                witnessed countless eternities, this gift is yours. A memory
                forever captured, a moment made eternal. Like the bond between
                vampire and mortal, wolf and moon—what we share transcends time
                itself. You are the dawn in my endless night, the heartbeat in
                my immortal existence. This is for you, forever."
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
            Under the Bloodmoon, your story is eternal.
          </p>
        </motion.footer>
      </div>
    </PageTransition>
  );
};
