"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Download } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type NowPlayingData = {
  isPlaying: boolean;
  name: string;
  artist: string;
  album: string;
  trackUrl: string;
  lastfmUrl: string;
  error?: string;
};

type Genre = 
  | 'rock' | 'pop' | 'ballad' | 'classic' | 'instrumental' 
  | 'orchestra' | 'bolero' | 'jazz' | 'blues' | 'bossa' | 'lofi' | 'default';

const WaveformLine = () => {
  const [data, setData] = useState<NowPlayingData>(() => ({
    isPlaying: false,
    name: "",
    artist: "",
    album: "",
    trackUrl: "",
    lastfmUrl: ""
  }));
  const [isHovered, setIsHovered] = useState(false);
  const [genre, setGenre] = useState<Genre>('default');
  const [time, setTime] = useState(0);

  const guessGenre = (name: string, artist: string): Genre => {
    const text = `${name} ${artist}`.toLowerCase();
    
    if (['rock', 'metal', 'punk', 'grunge'].some(k => text.includes(k))) return 'rock';
    if (['jazz', 'swing', 'bebop', 'soul'].some(k => text.includes(k))) return 'jazz';
    if (['blues', 'r&b', 'rhythm'].some(k => text.includes(k))) return 'blues';
    if ([' bossa ', 'nova', 'samba', 'brazil'].some(k => text.includes(k))) return 'bossa';
    if (['lofi', 'chill', 'study', 'relax'].some(k => text.includes(k))) return 'lofi';
    if (['pop', 'dance', 'disco', 'k-pop', 'v-pop'].some(k => text.includes(k))) return 'pop';
    if (['ballad', 'slow', 'acoustic', 'unplugged', 'sad', 'lo-fi'].some(k => text.includes(k))) return 'ballad';
    if (['classic', 'symphony', 'mozart', 'piano solo'].some(k => text.includes(k))) return 'classic';
    if (['instrumental', 'violin', 'guitar', 'saxophone', 'richard clayderman'].some(k => text.includes(k))) return 'instrumental';
    if (['orchestra', 'philharmonic', 'cinematic'].some(k => text.includes(k))) return 'orchestra';
    if (['bolero', 'thuy nga', 'tru tinh', 'que huong'].some(k => text.includes(k))) return 'bolero';
    
    return 'default';
  };

  const genreConfig = useMemo(() => ({
    rock: { freq: 8.5, amp: 1.5, speed: 0.015 },
    pop: { freq: 5.0, amp: 1.1, speed: 0.009 },
    ballad: { freq: 1.8, amp: 0.5, speed: 0.004 },
    classic: { freq: 3.2, amp: 0.7, speed: 0.005 },
    instrumental: { freq: 4.0, amp: 0.8, speed: 0.006 },
    orchestra: { freq: 6.0, amp: 1.3, speed: 0.008 },
    jazz: { freq: 4.5, amp: 1.0, speed: 0.008 },
    blues: { freq: 3.5, amp: 0.9, speed: 0.005 },
    bossa: { freq: 2.8, amp: 0.7, speed: 0.006 },
    lofi: { freq: 1.2, amp: 0.4, speed: 0.002 },
    bolero: { freq: 2.2, amp: 0.6, speed: 0.004 },
    default: { freq: 3.5, amp: 1.2, speed: 0.005 }
  }), []);

  useEffect(() => {
    let active = true;
    const fetchNowPlaying = async () => {
      try {
        const response = await fetch(`/api/now-playing?t=${Date.now()}`, {
          cache: "no-store",
          headers: { "Cache-Control": "no-cache, no-store, must-revalidate" },
        });
        if (!response.ok) return;
        const json = (await response.json()) as NowPlayingData;
        if (!active) return;
        setData(json);
        if (json.name && json.artist) setGenre(guessGenre(json.name, json.artist));
      } catch { /* Fail silently */ }
    };
    fetchNowPlaying();
    const interval = window.setInterval(fetchNowPlaying, 30000);
    return () => { active = false; window.clearInterval(interval); };
  }, []);

  useEffect(() => {
    if (!data?.isPlaying) return;
    let frameId: number;
    const animate = (t: number) => {
      setTime(t);
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [data.isPlaying]);

  const generatePath = (phaseOffset: number, freqMult: number, ampMult: number) => {
    const width = 120;
    const height = 24;
    if (!data?.isPlaying) return `M 0 ${height / 2} L ${width} ${height / 2}`;

    const { freq, amp, speed } = genreConfig[genre];
    const points = 60;
    const baseAmplitude = 6;
    let p = `M 0 ${height / 2}`;

    for (let i = 0; i <= points; i++) {
      const x = (i / points) * width;
      const envelope = Math.sin((i / points) * Math.PI);
      const y = height / 2 +
        Math.sin((i / points) * Math.PI * freq * freqMult + (time * speed) + phaseOffset) *
        baseAmplitude * amp * ampMult * envelope;
      p += ` L ${x} ${y}`;
    }
    return p;
  };

  const handleClick = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  return (
    <div className="relative mt-4">
      <motion.div
        layoutId="waveform"
        className="cursor-pointer flex items-center justify-center h-8"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={handleClick}
      >
        <svg width="120" height="24" viewBox="0 0 120 24" className="overflow-visible">
          <defs>
            <linearGradient id="midGrad" x1="0" y1="0" x2="120" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="rgba(255,255,255,0)" />
              <stop offset="30%" stopColor="rgba(255,255,255,0.8)" />
              <stop offset="70%" stopColor="rgba(255,255,255,0.8)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
            <linearGradient id="lowGrad" x1="0" y1="0" x2="120" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="rgba(34,197,94,0)" />
              <stop offset="30%" stopColor="rgba(34,197,94,0.9)" />
              <stop offset="70%" stopColor="rgba(34,197,94,0.9)" />
              <stop offset="100%" stopColor="rgba(34,197,94,0)" />
            </linearGradient>
            <linearGradient id="highGrad" x1="0" y1="0" x2="120" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="rgba(245,158,11,0)" />
              <stop offset="30%" stopColor="rgba(245,158,11,0.9)" />
              <stop offset="70%" stopColor="rgba(245,158,11,0.9)" />
              <stop offset="100%" stopColor="rgba(245,158,11,0)" />
            </linearGradient>
            {/* BLUE GRADIENT (Mid-Treble) */}
            <linearGradient id="blueGrad" x1="0" y1="0" x2="120" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="rgba(59,130,246,0)" />
              <stop offset="30%" stopColor="rgba(59,130,246,0.9)" />
              <stop offset="70%" stopColor="rgba(59,130,246,0.9)" />
              <stop offset="100%" stopColor="rgba(59,130,246,0)" />
            </linearGradient>
          </defs>

          {/* GREEN WAVE (Bass) */}
          <motion.path
            d={generatePath(Math.PI * 0.8, 0.5, 1.3)}
            stroke="url(#lowGrad)"
            strokeWidth="2.2"
            fill="none"
            animate={data.isPlaying ? { 
              opacity: [0.5, 1, 0.5], 
              filter: ["blur(1.5px)", "blur(4px)", "blur(1.5px)"] 
            } : {}}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* BLUE WAVE (Mid-Treble) */}
          <motion.path
            d={generatePath(Math.PI * 0.5, 1.8, 0.7)}
            stroke="url(#blueGrad)"
            strokeWidth="1.8"
            fill="none"
            animate={data.isPlaying ? { 
              opacity: [0.4, 0.9, 0.4], 
              filter: ["blur(1px)", "blur(2.5px)", "blur(1px)"] 
            } : {}}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* AMBER WAVE (Treble) */}
          <motion.path
            d={generatePath(Math.PI * 1.5, 2.2, 1.0)}
            stroke="url(#highGrad)"
            strokeWidth="1.4"
            fill="none"
            animate={data.isPlaying ? { 
              opacity: [0.5, 1, 0.5], 
              filter: ["blur(1px)", "blur(3.5px)", "blur(1px)"] 
            } : {}}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* WHITE WAVE (Mid/Vocals) */}
          <motion.path
            d={generatePath(0, 1, 0.4)}
            stroke="url(#midGrad)"
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
            animate={data.isPlaying ? { 
              filter: ["drop-shadow(0 0 1px white)", "drop-shadow(0 0 4px white)", "drop-shadow(0 0 1px white)"] 
            } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </svg>
      </motion.div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-8 right-0 whitespace-nowrap bg-black/80 text-white text-[10px] px-2 py-1 rounded border border-white/10 backdrop-blur-sm"
          >
            {data.isPlaying ? `Listening: ${data.name} (${genre})` : "Not listening"}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Navbar = () => {
  return (
    <div className="fixed top-6 right-6 z-50 md:top-10 md:right-20">
      <div className="flex flex-col items-end gap-2">
        <div className="flex items-center gap-4">
          <Link
            target="_blank"
            href="https://github.com/biisal/portfolio"
            className="hidden md:flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-white/20 hover:scale-105 backdrop-blur-md border border-white/5"
          >
            <span>Source Code</span>
            <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </Link>
          <Link
            target="_blank"
            href="https://drive.google.com/file/d/1wcR-9LoLmYQQ3lh-m35V7NxV1AdURNda/view?usp=drive_link"
            className="flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-white/20 hover:scale-105 backdrop-blur-md border border-white/5"
          >
            <span>Download CV</span>
            <Download className="h-4 w-4" />
          </Link>
        </div>
        <WaveformLine />
      </div>
    </div>
  );
};

export default Navbar;