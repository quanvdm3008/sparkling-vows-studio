import { useEffect, useState } from "react";

interface Petal {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
}

const FallingPetals = () => {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const generated: Petal[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 8 + Math.random() * 6,
      size: 8 + Math.random() * 14,
      opacity: 0.3 + Math.random() * 0.4,
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
          🌸
        </div>
      ))}
    </div>
  );
};

export default FallingPetals;
