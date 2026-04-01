import { useEffect, useState } from "react";

interface Petal {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
  emoji: string;
}

const defaultEmojis = ["🌸", "🌺", "💮", "🏵️", "✿"];

interface FallingPetalsProps {
  emojis?: string[];
}

const FallingPetals = ({ emojis = defaultEmojis }: FallingPetalsProps) => {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const generated: Petal[] = Array.from({ length: 35 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 12,
      duration: 7 + Math.random() * 8,
      size: 8 + Math.random() * 16,
      opacity: 0.25 + Math.random() * 0.45,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    }));
    setPetals(generated);
  }, [emojis]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute"
          style={{
            left: `${petal.left}%`,
            top: "-20px",
            fontSize: `${petal.size}px`,
            opacity: petal.opacity,
            animation: `petal-fall ${petal.duration}s linear ${petal.delay}s infinite`,
          }}
        >
          {petal.emoji}
        </div>
      ))}
    </div>
  );
};

export default FallingPetals;
