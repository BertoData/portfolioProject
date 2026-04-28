'use client';

import React, { useEffect, useRef } from 'react';

// --- FRAGMENT SHADER ---
// Contrast-based smoke that's visible against navy background
const fragmentShaderSource = `#version 300 es
precision highp float;
out vec4 O;
uniform float time;
uniform vec2 resolution;
uniform vec3 u_color;

float hash(vec2 p) {
  float h = dot(p, vec2(127.1, 311.7));
  return fract(sin(h) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float n = mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
  return n;
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for(int i = 0; i < 5; i++) {
    value += amplitude * noise(p);
    p *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  
  // Add time-based movement
  uv.y += time * 0.03;
  uv.x += sin(time * 0.02) * 0.15;
  
  // Generate smoke pattern with strong contrast
  float smoke = fbm(uv * 2.5);
  smoke += fbm(uv * 5.0) * 0.5;
  smoke += fbm(uv * 10.0) * 0.25;
  
  // Create bright and dark areas (contrast effect)
  float contrast = smoke * 2.0 - 1.0;
  
  // Base navy color
  vec3 baseColor = u_color;
  
  // Create lighter and darker variations
  vec3 lightColor = baseColor + vec3(0.3);
  vec3 darkColor = baseColor * 0.4;
  
  // Blend based on smoke contrast
  vec3 finalColor = mix(darkColor, lightColor, smoothstep(-0.5, 0.5, contrast));
  
  // Add subtle color shift based on smoke
  finalColor += u_color * (smoke - 0.5) * 0.3;
  
  O = vec4(finalColor, 1.0);
}`;

// --- RENDERER CLASS ---
// Updated to handle the new color uniform
class Renderer {
  private readonly vertexSrc = `#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`;
  private readonly vertices = [-1, 1, -1, -1, 1, 1, 1, -1];
  
  private gl: WebGL2RenderingContext;
  private canvas: HTMLCanvasElement;
  private program: WebGLProgram | null = null;
  private vs: WebGLShader | null = null;
  private fs: WebGLShader | null = null;
  private buffer: WebGLBuffer | null = null;
  private color: [number, number, number] = [0.118, 0.251, 0.686]; // Navy #1e40af as default

  constructor(canvas: HTMLCanvasElement, fragmentSource: string) {
    this.canvas = canvas;
    const ctx = canvas.getContext('webgl2', { 
      alpha: false,
      antialias: false,
      preserveDrawingBuffer: false 
    });
    if (!ctx) {
      throw new Error('WebGL2 context not available');
    }
    this.gl = ctx;
    this.setup(fragmentSource);
    this.init();
  }
  
  updateColor(newColor: [number, number, number]) {
    this.color = newColor;
  }

  updateScale() {
    const dpr = Math.max(1, window.devicePixelRatio);
    const { innerWidth: width, innerHeight: height } = window;
    this.canvas.width = width * dpr;
    this.canvas.height = height * dpr;
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
  }

  private compile(shader: WebGLShader, source: string) {
    const gl = this.gl;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(`Shader compilation error: ${gl.getShaderInfoLog(shader)}`);
    }
  }

  reset() {
    const { gl, program, vs, fs } = this;
    if (!program) return;
    if (vs) { gl.detachShader(program, vs); gl.deleteShader(vs); }
    if (fs) { gl.detachShader(program, fs); gl.deleteShader(fs); }
    gl.deleteProgram(program);
    this.program = null;
  }

  private setup(fragmentSource: string) {
    const gl = this.gl;
    this.vs = gl.createShader(gl.VERTEX_SHADER);
    this.fs = gl.createShader(gl.FRAGMENT_SHADER);
    const program = gl.createProgram();
    if (!this.vs || !this.fs || !program) return;
    this.compile(this.vs, this.vertexSrc);
    this.compile(this.fs, fragmentSource);
    this.program = program;
    gl.attachShader(this.program, this.vs);
    gl.attachShader(this.program, this.fs);
    gl.linkProgram(this.program);
    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      console.error(`Program linking error: ${gl.getProgramInfoLog(this.program)}`);
    }
  }

  private init() {
    const { gl, program } = this;
    if (!program) return;
    this.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    Object.assign(program, {
      resolution: gl.getUniformLocation(program, 'resolution'),
      time: gl.getUniformLocation(program, 'time'),
      u_color: gl.getUniformLocation(program, 'u_color'),
    });
  }

  render(now = 0) {
    const { gl, program, buffer, canvas } = this;
    if (!program || !gl.isProgram(program)) return;
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.uniform2f((program as any).resolution, canvas.width, canvas.height);
    gl.uniform1f((program as any).time, now * 1e-3);
    gl.uniform3fv((program as any).u_color, this.color);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
}

// --- UTILITY FUNCTION ---
const hexToRgb = (hex: string): [number, number, number] | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? [
          parseInt(result[1], 16) / 255,
          parseInt(result[2], 16) / 255,
          parseInt(result[3], 16) / 255,
        ]
      : null;
};

// --- REACT COMPONENT ---
interface SmokeBackgroundProps {
  smokeColor?: string;
}

export const SmokeBackground: React.FC<SmokeBackgroundProps> = ({ 
  smokeColor = '#1e40af'
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rendererRef = useRef<Renderer | null>(null);
    const [hasError, setHasError] = React.useState(false);

    useEffect(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        
        try {
            const renderer = new Renderer(canvas, fragmentShaderSource);
            rendererRef.current = renderer;
            
            const handleResize = () => {
                renderer.updateScale();
            };
            
            // Initial setup
            renderer.updateScale();
            window.addEventListener('resize', handleResize);
            
            let animationFrameId: number;
            const loop = (now: number) => {
                renderer.render(now);
                animationFrameId = requestAnimationFrame(loop);
            };
            animationFrameId = requestAnimationFrame(loop);

            return () => {
                window.removeEventListener('resize', handleResize);
                cancelAnimationFrame(animationFrameId);
                renderer.reset(); 
            };
        } catch (error) {
            console.error('Failed to initialize SmokeBackground:', error);
            setHasError(true);
        }
    }, []);
    
    useEffect(() => {
        const renderer = rendererRef.current;
        if (renderer) {
            const rgbColor = hexToRgb(smokeColor);
            if (rgbColor) {
                renderer.updateColor(rgbColor);
            }
        }
    }, [smokeColor]);

    return (
        <>
            {/* Fallback background */}
            <div 
                className="fixed top-0 left-0 right-0 bottom-0 -z-10" 
                style={{ 
                    background: 'linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%)',
                    opacity: hasError ? 1 : 0
                }} 
            />
            {/* WebGL Canvas */}
            <canvas 
                ref={canvasRef} 
                className="fixed top-0 left-0 right-0 bottom-0 -z-10 block" 
                style={{ width: '100%', height: '100%', display: 'block' }}
            />
        </>
    );
};
