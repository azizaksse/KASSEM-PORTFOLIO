"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Optimized but beautiful lava lamp shader
const vertexShader = `
varying vec2 vUv;
uniform float time;
uniform vec4 resolution;

void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
}
`;

const fragmentShader = `
precision mediump float;
varying vec2 vUv;
uniform float time;
uniform vec4 resolution;

float PI = 3.141592653589793238;

// Simplified rotation matrix
vec3 rotate(vec3 v, vec3 axis, float angle) {
    float s = sin(angle);
    float c = cos(angle);
    float oc = 1.0 - c;
    return vec3(
        oc * axis.x * axis.x + c,
        oc * axis.x * axis.y - axis.z * s,
        oc * axis.z * axis.x + axis.y * s
    ) * v.x + vec3(
        oc * axis.x * axis.y + axis.z * s,
        oc * axis.y * axis.y + c,
        oc * axis.y * axis.z - axis.x * s
    ) * v.y + vec3(
        oc * axis.z * axis.x - axis.y * s,
        oc * axis.y * axis.z + axis.x * s,
        oc * axis.z * axis.z + c
    ) * v.z;
}

// Smooth minimum function
float smin(float a, float b, float k) {
    float h = max(k - abs(a - b), 0.0) / k;
    return min(a, b) - h * h * h * k * (1.0 / 6.0);
}

float sphereSDF(vec3 p, float r) {
    return length(p) - r;
}

// Simplified SDF for better performance
float sdf(vec3 p) {
    vec3 p1 = rotate(p, vec3(0.0, 0.0, 1.0), time * 0.2);
    vec3 p2 = rotate(p, vec3(1.0, 0.0, 0.0), -time * 0.3);
    
    float final = sphereSDF(p1 - vec3(-0.3, 0.0, 0.0), 0.4);
    float nextSphere = sphereSDF(p2 - vec3(0.4, 0.0, 0.0), 0.3);
    final = smin(final, nextSphere, 0.15);
    
    return final;
}

// Simplified normal calculation
vec3 getNormal(vec3 p) {
    float d = 0.01;
    return normalize(vec3(
        sdf(p + vec3(d, 0.0, 0.0)) - sdf(p - vec3(d, 0.0, 0.0)),
        sdf(p + vec3(0.0, d, 0.0)) - sdf(p - vec3(0.0, d, 0.0)),
        sdf(p + vec3(0.0, 0.0, d)) - sdf(p - vec3(0.0, 0.0, d))
    ));
}

// Simplified ray marching
float rayMarch(vec3 rayOrigin, vec3 ray) {
    float t = 0.0;
    for (int i = 0; i < 50; i++) { // Reduced iterations for performance
        vec3 p = rayOrigin + ray * t;
        float d = sdf(p);
        if (d < 0.01) return t;
        t += d;
        if (t > 50.0) break;
    }
    return -1.0;
}

void main() {
    vec2 newUV = (vUv - vec2(0.5)) * resolution.zw + vec2(0.5);
    vec3 cameraPos = vec3(0.0, 0.0, 3.0);
    vec3 ray = normalize(vec3((vUv - vec2(0.5)) * resolution.zw, -1));
    vec3 color = vec3(0.1, 0.1, 0.2);

    float t = rayMarch(cameraPos, ray);
    if (t > 0.0) {
        vec3 p = cameraPos + ray * t;
        vec3 normal = getNormal(p);
        float fresnel = pow(1.0 + dot(ray, normal), 2.0);
        color = mix(
            vec3(0.2, 0.4, 0.8),
            vec3(0.6, 0.3, 0.9),
            fresnel
        );
        gl_FragColor = vec4(color, 0.4);
    } else {
        gl_FragColor = vec4(color, 0.1);
    }
}
`;

function LavaLampShader() {
  const meshRef = useRef<THREE.Mesh | null>(null);
  const { size } = useThree();

  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
      resolution: { value: new THREE.Vector4() },
    }),
    [],
  );

  useEffect(() => {
    const { width, height } = size;
    const imageAspect = 1;
    let a1, a2;

    if (height / width > imageAspect) {
      a1 = (width / height) * imageAspect;
      a2 = 1;
    } else {
      a1 = 1;
      a2 = (height / width) / imageAspect;
    }

    uniforms.resolution.value.set(width, height, a1, a2);
  }, [size, uniforms]);

  useFrame((state) => {
    if (meshRef.current) {
      uniforms.time.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[5, 5]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
      />
    </mesh>
  );
}

// CSS-only fallback background for low-end devices
function CSSBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 h-full w-full bg-transparent">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(56,189,248,0.3),transparent_50%)] animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(168,85,247,0.3),transparent_50%)] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.2),transparent_60%)] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
    </div>
  );
}

export function LavaLamp() {
  const [use3D, setUse3D] = useState(true);
  const [isLowPerformance, setIsLowPerformance] = useState(false);

  useEffect(() => {
    // Detect device performance - but be less aggressive
    const checkPerformance = () => {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      
      if (!gl) {
        setIsLowPerformance(true);
        setUse3D(false);
        return;
      }

      // Only disable 3D for very low-end devices or explicit reduced motion
      const isVeryLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 2;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      // Keep 3D for most devices, only disable for very low-end or reduced motion
      if (isVeryLowEnd || prefersReducedMotion) {
        setIsLowPerformance(true);
        setUse3D(false);
      } else {
        // Enable 3D for desktop and most mobile devices
        setIsLowPerformance(false);
        setUse3D(true);
      }
    };

    checkPerformance();
  }, []);

  // Use CSS fallback for low-performance devices
  if (!use3D || isLowPerformance) {
    return <CSSBackground />;
  }

  return (
    <div className="pointer-events-none absolute inset-0 h-full w-full bg-transparent">
      <Canvas
          camera={{
            left: -0.5,
            right: 0.5,
            top: 0.5,
            bottom: -0.5,
            near: -1000,
            far: 1000,
            position: [0, 0, 2],
          }}
          orthographic
          gl={{ 
            antialias: false, // Disable for better performance
            alpha: true,
            powerPreference: "high-performance",
            stencil: false,
            depth: false
          }}
          dpr={1} // Fixed DPR for consistency
          performance={{ min: 0.8 }} // Higher threshold for smooth scrolling
      >
        <LavaLampShader />
      </Canvas>
    </div>
  );
}
