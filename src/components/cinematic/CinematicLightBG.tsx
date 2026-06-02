import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * Cinematic animated light shader - large soft moving lights
 * Mounted as a fixed pointer-events-none overlay behind content.
 */
const LightPlane = ({ accentColor }: { accentColor: string }) => {
  const mat = useRef<THREE.ShaderMaterial>(null!);
  const color = useMemo(() => new THREE.Color(accentColor), [accentColor]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: color },
    }),
    [color]
  );

  useFrame((state) => {
    if (mat.current) mat.current.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={mat}
        uniforms={uniforms}
        transparent
        vertexShader={`
          varying vec2 vUv;
          void main(){ vUv = uv; gl_Position = vec4(position,1.0); }
        `}
        fragmentShader={`
          varying vec2 vUv;
          uniform float uTime;
          uniform vec3 uColor;

          // simple 2d hash noise
          float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
          float noise(vec2 p){
            vec2 i=floor(p), f=fract(p);
            float a=hash(i), b=hash(i+vec2(1,0)), c=hash(i+vec2(0,1)), d=hash(i+vec2(1,1));
            vec2 u=f*f*(3.0-2.0*f);
            return mix(a,b,u.x)+(c-a)*u.y*(1.-u.x)+(d-b)*u.x*u.y;
          }

          void main(){
            vec2 uv = vUv;
            float t = uTime * 0.08;
            // 3 moving radial lights
            vec2 p1 = vec2(0.3 + 0.2*sin(t*1.2), 0.4 + 0.2*cos(t));
            vec2 p2 = vec2(0.7 + 0.2*cos(t*0.9), 0.6 + 0.15*sin(t*1.3));
            vec2 p3 = vec2(0.5 + 0.3*sin(t*0.6), 0.2 + 0.2*cos(t*0.7));
            float l1 = smoothstep(0.55, 0.0, distance(uv,p1));
            float l2 = smoothstep(0.55, 0.0, distance(uv,p2));
            float l3 = smoothstep(0.55, 0.0, distance(uv,p3));
            float n = noise(uv*3.0 + t*2.0)*0.15;
            float alpha = (l1*0.55 + l2*0.5 + l3*0.45 + n) * 0.55;
            vec3 col = uColor;
            gl_FragColor = vec4(col, alpha);
          }
        `}
      />
    </mesh>
  );
};

const CinematicLightBG = ({ accentColor = "#E8B4B8" }: { accentColor?: string }) => {
  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{ mixBlendMode: "screen", opacity: 0.85 }}
    >
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 1] }}
      >
        <LightPlane accentColor={accentColor} />
      </Canvas>
    </div>
  );
};

export default CinematicLightBG;
