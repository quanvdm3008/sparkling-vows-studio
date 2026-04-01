import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Pause, Play, SkipForward, SkipBack, Volume2, VolumeX, ChevronUp, ChevronDown } from "lucide-react";

export interface MusicTrack {
  id: string;
  name: string;
  emoji: string;
}

// Danh sách nhạc mẫu — sẽ dùng file thật hoặc API sau
const defaultTracks: MusicTrack[] = [
  { id: "romantic", name: "Nhạc Tình Yêu Nhẹ Nhàng", emoji: "💕" },
  { id: "piano", name: "Piano Cổ Điển", emoji: "🎹" },
  { id: "acoustic", name: "Guitar Acoustic", emoji: "🎸" },
  { id: "waltz", name: "Valse Lãng Mạn", emoji: "💃" },
  { id: "traditional", name: "Nhạc Truyền Thống", emoji: "🏮" },
  { id: "modern-pop", name: "Pop Ballad Hiện Đại", emoji: "🎤" },
];

interface MusicPlayerProps {
  accentColor: string;
  onTrackChange?: (track: MusicTrack) => void;
}

const MusicPlayer = ({ accentColor, onTrackChange }: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showList, setShowList] = useState(false);

  const currentTrack = defaultTracks[currentTrackIndex];

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    const next = (currentTrackIndex + 1) % defaultTracks.length;
    setCurrentTrackIndex(next);
    onTrackChange?.(defaultTracks[next]);
  };

  const prevTrack = () => {
    const prev = (currentTrackIndex - 1 + defaultTracks.length) % defaultTracks.length;
    setCurrentTrackIndex(prev);
    onTrackChange?.(defaultTracks[prev]);
  };

  const selectTrack = (index: number) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
    setShowList(false);
    onTrackChange?.(defaultTracks[index]);
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2, type: "spring" }}
      className="fixed bottom-6 right-6 z-[80]"
    >
      <AnimatePresence mode="wait">
        {/* Track selection list */}
        {showList && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-full right-0 mb-3 w-64 bg-card/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-border overflow-hidden"
          >
            <div className="p-3 border-b border-border">
              <p className="font-body text-xs font-semibold text-foreground flex items-center gap-2">
                <Music className="w-3.5 h-3.5" style={{ color: accentColor }} />
                Chọn Nhạc Nền
              </p>
            </div>
            <div className="max-h-[250px] overflow-y-auto">
              {defaultTracks.map((track, i) => (
                <motion.button
                  key={track.id}
                  whileHover={{ x: 4 }}
                  onClick={() => selectTrack(i)}
                  className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors ${
                    i === currentTrackIndex
                      ? "bg-primary/10"
                      : "hover:bg-secondary/50"
                  }`}
                >
                  <span className="text-lg">{track.emoji}</span>
                  <span className="font-body text-sm text-foreground flex-1">{track.name}</span>
                  {i === currentTrackIndex && (
                    <motion.div
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main player */}
      <div className="flex flex-col items-end gap-2">
        {/* Expanded controls */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="bg-card/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-border p-4 min-w-[220px]"
            >
              {/* Track info */}
              <button
                onClick={() => setShowList(!showList)}
                className="w-full text-left mb-3 group"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{currentTrack.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-sm font-semibold text-foreground truncate">
                      {currentTrack.name}
                    </p>
                    <p className="font-body text-xs text-muted-foreground group-hover:text-primary transition-colors">
                      Nhấn để đổi bài ↑
                    </p>
                  </div>
                </div>
              </button>

              {/* Fake progress bar */}
              <div className="w-full h-1 bg-secondary rounded-full mb-3 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: accentColor }}
                  animate={isPlaying ? { width: ["0%", "100%"] } : {}}
                  transition={isPlaying ? { duration: 180, ease: "linear", repeat: Infinity } : {}}
                  initial={{ width: "30%" }}
                />
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-3">
                <button onClick={prevTrack} className="p-1.5 text-muted-foreground hover:text-foreground transition-colors">
                  <SkipBack className="w-4 h-4" />
                </button>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={togglePlay}
                  className="p-3 rounded-full text-primary-foreground shadow-lg"
                  style={{ backgroundColor: accentColor }}
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </motion.button>
                <button onClick={nextTrack} className="p-1.5 text-muted-foreground hover:text-foreground transition-colors">
                  <SkipForward className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            setIsExpanded(!isExpanded);
            if (isExpanded) setShowList(false);
          }}
          className="relative p-4 rounded-full shadow-2xl text-primary-foreground border-2 border-primary-foreground/20"
          style={{ backgroundColor: accentColor }}
        >
          {isPlaying && (
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ border: `2px solid ${accentColor}` }}
              animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
          <Music className="w-6 h-6" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default MusicPlayer;
