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

const petalEmojis = ["🌸", "🌺", "💮", "🏵️", "✿"];

const FallingPetals = () => {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const generated: Petal[] = Array.from({ length: 35 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 12,
      duration: 7 + Math.random() * 8,
      size: 8 + Math.random() * 16,
      opacity: 0.25 + Math.random() * 0.45,
      emoji: petalEmojis[Math.floor(Math.random() * petalEmojis.length)],
    }));
    setPetals(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute text-primary"
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
