"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { buildShape, type ShapeId } from "./shapes";

const VERT = /* glsl */ `
uniform float uTime;
uniform float uSize;
uniform float uPR;
attribute float aScale;
attribute float aSeed;
varying float vAlpha;
varying float vDepth;
void main() {
  vec3 p = position;
  p += 0.025 * vec3(sin(uTime * 0.9 + aSeed * 30.0), cos(uTime * 0.7 + aSeed * 20.0), sin(uTime * 0.8 + aSeed * 10.0));
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  float tw = 0.6 + 0.4 * sin(uTime * 1.8 + aSeed * 50.0);
  gl_PointSize = uSize * aScale * uPR * (0.7 + 0.3 * tw) / -mv.z;
  vAlpha = tw;
  vDepth = smoothstep(10.0, 5.0, -mv.z);
}`;

const FRAG = /* glsl */ `
uniform vec3 uColor;
uniform vec3 uColor2;
varying float vAlpha;
varying float vDepth;
void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = pow(smoothstep(0.5, 0.0, d), 1.7);
  vec3 col = mix(uColor2, uColor, 0.7 + 0.3 * vDepth);
  col += smoothstep(0.14, 0.0, d) * 0.7;
  gl_FragColor = vec4(col, a * (0.55 + 0.45 * vAlpha) * (0.45 + 0.55 * vDepth));
}`;

type Api = { morph: (s: ShapeId) => void; setColor: (c: string) => void };

export default function HeroCanvas({ shape, color }: { shape: ShapeId; color: string }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<Api | null>(null);
  const initial = useRef({ shape, color });

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.innerWidth < 768;
    const N = mobile ? 3500 : 9000;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "high-performance" });
    } catch {
      return; // no WebGL — CSS background still looks good
    }
    const pr = Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(pr);
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.display = "block";

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 8);

    const cache = new Map<ShapeId, Float32Array>();
    const getShape = (s: ShapeId) => {
      let v = cache.get(s);
      if (!v) cache.set(s, (v = buildShape(s, N)));
      return v;
    };

    // ---- main particle cloud ----
    const start = getShape(initial.current.shape);
    const positions = new Float32Array(start);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const scale = new Float32Array(N), seed = new Float32Array(N), delay = new Float32Array(N), dirs = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      scale[i] = 0.5 + Math.random() * Math.random() * 1.8;
      seed[i] = Math.random();
      delay[i] = Math.random() * 0.35;
      const th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1);
      dirs.set([Math.sin(ph) * Math.cos(th), Math.sin(ph) * Math.sin(th), Math.cos(ph)], i * 3);
    }
    geo.setAttribute("aScale", new THREE.BufferAttribute(scale, 1));
    geo.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));

    const target = new THREE.Color(initial.current.color);
    const uniforms = {
      uTime: { value: 0 },
      uSize: { value: mobile ? 36 : 34 },
      uPR: { value: pr },
      uColor: { value: target.clone() },
      uColor2: { value: new THREE.Color("#22d3ee") },
    };
    const mat = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const points = new THREE.Points(geo, mat);

    const tilt = new THREE.Group(); // follows the mouse
    const spin = new THREE.Group(); // slow auto-rotation
    spin.add(points);
    tilt.add(spin);
    scene.add(tilt);

    // ---- distant star field ----
    const SN = mobile ? 400 : 900;
    const sp = new Float32Array(SN * 3);
    for (let i = 0; i < SN; i++) sp.set([(Math.random() - 0.5) * 30, (Math.random() - 0.5) * 18, -4 - Math.random() * 10], i * 3);
    const sgeo = new THREE.BufferGeometry();
    sgeo.setAttribute("position", new THREE.BufferAttribute(sp, 3));
    const smat = new THREE.PointsMaterial({ size: 0.035, color: 0x8d95a8, transparent: true, opacity: 0.5, depthWrite: false });
    const stars = new THREE.Points(sgeo, smat);
    scene.add(stars);

    // ---- morphing ----
    let elapsed = 0, last = performance.now();
    let current: ShapeId = initial.current.shape;
    let from = new Float32Array(positions);
    let to = start;
    let morphStart = -1;
    const DURATION = 2.0;
    const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

    const api: Api = {
      morph: (s) => {
        const next = getShape(s);
        if (next === to) return;
        current = s;
        if (reduced) {
          positions.set(next);
          geo.attributes.position.needsUpdate = true;
          to = next;
          return;
        }
        from = new Float32Array(positions);
        to = next;
        morphStart = elapsed;
      },
      setColor: (c) => {
        target.set(c);
      },
    };
    apiRef.current = api;

    // ---- layout ----
    const layout = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      const wide = w >= 1024;
      tilt.position.set(wide ? 2.3 : 0, wide ? 0 : 0.9, 0);
      tilt.scale.setScalar(wide ? 1 : w < 640 ? 0.78 : 0.9);
    };
    const ro = new ResizeObserver(layout);
    ro.observe(mount);
    layout();

    // ---- input ----
    const mouse = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    // ---- loop (paused when off-screen or tab hidden) ----
    let visible = true, raf = 0, running = false;
    const frame = () => {
      raf = requestAnimationFrame(frame);
      const now = performance.now();
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      elapsed += dt;
      const t = elapsed;
      uniforms.uTime.value = reduced ? 0 : t;

      if (morphStart >= 0) {
        const p = (t - morphStart) / DURATION;
        for (let i = 0; i < N; i++) {
          const lt = Math.min(Math.max((p - delay[i]) / 0.65, 0), 1);
          const e = ease(lt);
          const burst = Math.sin(lt * Math.PI) * 0.9;
          const k = i * 3;
          positions[k] = from[k] + (to[k] - from[k]) * e + dirs[k] * burst;
          positions[k + 1] = from[k + 1] + (to[k + 1] - from[k + 1]) * e + dirs[k + 1] * burst;
          positions[k + 2] = from[k + 2] + (to[k + 2] - from[k + 2]) * e + dirs[k + 2] * burst;
        }
        geo.attributes.position.needsUpdate = true;
        if (p >= 1) morphStart = -1;
      }

      uniforms.uColor.value.lerp(target, 0.04);
      if (!reduced) {
        // gentle sway keeps each shape facing the viewer; the gear turns like a real gear
        spin.rotation.y = Math.sin(t * 0.3) * (current === "name" ? 0.3 : current === "heatmap" ? 1.2 : 0.65);
        if (current === "gear") spin.rotation.z -= dt * 0.35;
        else {
          let z = spin.rotation.z % (Math.PI * 2);
          if (Math.abs(z) > Math.PI) z -= Math.sign(z) * Math.PI * 2;
          spin.rotation.z = z * 0.95;
        }
      }
      tilt.rotation.y += (mouse.x * 0.45 - tilt.rotation.y) * 0.04;
      tilt.rotation.x += (mouse.y * 0.25 + 0.12 - tilt.rotation.x) * 0.04;
      stars.rotation.y = mouse.x * 0.03;
      renderer.render(scene, camera);
    };
    const sync = () => {
      const should = visible && !document.hidden;
      if (should && !running) {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(frame);
      } else if (!should && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      sync();
    });
    io.observe(mount);
    document.addEventListener("visibilitychange", sync);
    sync();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("pointermove", onMove);
      geo.dispose();
      mat.dispose();
      sgeo.dispose();
      smat.dispose();
      renderer.dispose();
      renderer.domElement.remove();
      apiRef.current = null;
    };
  }, []);

  useEffect(() => {
    apiRef.current?.morph(shape);
  }, [shape]);
  useEffect(() => {
    apiRef.current?.setColor(color);
  }, [color]);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />;
}
