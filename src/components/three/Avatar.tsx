"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// Stylised 3D "coder Mohit": fair skin, dark curly hair, white hoodie, glasses,
// headphones round the neck, typing on a laptop with floating code + data panels.
// Everything is procedural — no model files to download.

const SKIN = "#f1c6a3";
const HAIR = "#2a1c16";
const HOODIE = "#f2f2ee";
const ACCENT = "#b6ff3b";
const CYAN = "#22d3ee";

const CODE = [
  "import pandas as pd",
  "from sklearn.ensemble import XGB",
  "",
  "df = pd.read_sql(query, db)",
  "X, y = features(df), df.target",
  "",
  "model = XGB(n_estimators=400)",
  "model.fit(X_train, y_train)",
  "",
  "acc = model.score(X_test, y_test)",
  "print(f'accuracy: {acc:.2%}')",
  "# >> accuracy: 97.40% ✓",
  "",
  "llm = Assistant(rag=faiss_index)",
  "llm.ask('OEE trend this week?')",
  "deploy(model, env='prod')  # 🚀",
];

function makeCanvasTexture(w: number, h: number) {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return { canvas, ctx: canvas.getContext("2d")!, tex };
}

function panelFrame(ctx: CanvasRenderingContext2D, w: number, h: number, title: string, color: string) {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "rgba(8,10,12,0.82)";
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.roundRect(4, 4, w - 8, h - 8, 22);
  ctx.fill();
  ctx.stroke();
  ["#ff5f57", "#febc2e", "#28c840"].forEach((c, i) => {
    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.arc(32 + i * 22, 30, 7, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.fillStyle = "#8d95a8";
  ctx.font = "20px ui-monospace, Consolas, monospace";
  ctx.fillText(title, 110, 37);
}

export default function Avatar() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.display = "block";

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 50);
    camera.position.set(0, 1.45, 6.3);
    camera.lookAt(0, 1.0, 0);

    // ---------- lights ----------
    scene.add(new THREE.HemisphereLight(0xffffff, 0x1a1c24, 1.1));
    const key = new THREE.DirectionalLight(0xffffff, 2.2);
    key.position.set(2.5, 3.5, 4);
    scene.add(key);
    const rim = new THREE.DirectionalLight(ACCENT, 2.4);
    rim.position.set(-3, 2.5, -3);
    scene.add(rim);
    const rim2 = new THREE.DirectionalLight(CYAN, 1.6);
    rim2.position.set(3, 1.5, -2.5);
    scene.add(rim2);
    const screenGlow = new THREE.PointLight("#dff6ff", 0.9, 3, 1.6);
    screenGlow.position.set(0, 0.75, 0.75);
    scene.add(screenGlow);

    // ---------- materials ----------
    const mat = {
      skin: new THREE.MeshStandardMaterial({ color: SKIN, roughness: 0.65 }),
      hair: new THREE.MeshStandardMaterial({ color: HAIR, roughness: 0.85 }),
      hoodie: new THREE.MeshStandardMaterial({ color: HOODIE, roughness: 0.9 }),
      dark: new THREE.MeshStandardMaterial({ color: "#16181d", roughness: 0.5, metalness: 0.2 }),
      white: new THREE.MeshStandardMaterial({ color: "#ffffff", roughness: 0.3 }),
      pupil: new THREE.MeshStandardMaterial({ color: "#2a1a12", roughness: 0.2 }),
      frame: new THREE.MeshStandardMaterial({ color: "#0d0d0f", roughness: 0.3, metalness: 0.6 }),
      lip: new THREE.MeshStandardMaterial({ color: "#b5705a", roughness: 0.6 }),
      accent: new THREE.MeshStandardMaterial({ color: ACCENT, emissive: ACCENT, emissiveIntensity: 0.6 }),
      laptop: new THREE.MeshStandardMaterial({ color: "#2b2f36", roughness: 0.35, metalness: 0.7 }),
    };

    const root = new THREE.Group();
    scene.add(root);

    // ---------- body (white hoodie) ----------
    const body = new THREE.Group();
    root.add(body);
    const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.62, 0.7, 8, 24), mat.hoodie);
    torso.scale.set(1.25, 1, 0.78);
    torso.position.y = 0.3;
    body.add(torso);
    const hood = new THREE.Mesh(new THREE.TorusGeometry(0.36, 0.13, 12, 32), mat.hoodie);
    hood.position.set(0, 1.0, -0.12);
    hood.rotation.x = Math.PI / 2.3;
    body.add(hood);
    for (const sx of [-1, 1]) {
      const string = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.38, 8), mat.dark);
      string.position.set(sx * 0.11, 0.78, 0.47);
      string.rotation.x = -0.15;
      body.add(string);
      const tip = new THREE.Mesh(new THREE.SphereGeometry(0.028, 10, 10), mat.accent);
      tip.position.set(sx * 0.11, 0.59, 0.5);
      body.add(tip);
    }
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.2, 0.3, 16), mat.skin);
    neck.position.y = 1.08;
    body.add(neck);

    // headphones resting round the neck
    const band = new THREE.Mesh(new THREE.TorusGeometry(0.33, 0.035, 10, 40, Math.PI), mat.dark);
    band.position.set(0, 0.98, 0.02);
    band.rotation.x = Math.PI / 2;
    body.add(band);
    for (const sx of [-1, 1]) {
      const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.08, 24), mat.dark);
      cup.rotation.z = Math.PI / 2;
      cup.position.set(sx * 0.35, 0.98, 0.04);
      body.add(cup);
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.012, 8, 24), mat.accent);
      ring.rotation.y = Math.PI / 2;
      ring.position.set(sx * 0.395, 0.98, 0.04);
      body.add(ring);
    }

    // ---------- head ----------
    const head = new THREE.Group();
    head.position.y = 1.58;
    root.add(head);
    const skull = new THREE.Mesh(new THREE.SphereGeometry(0.5, 40, 40), mat.skin);
    skull.scale.set(0.93, 1.06, 0.95);
    head.add(skull);
    const jaw = new THREE.Mesh(new THREE.SphereGeometry(0.36, 32, 32), mat.skin);
    jaw.scale.set(1.05, 0.8, 1);
    jaw.position.set(0, -0.2, 0.08);
    head.add(jaw);
    for (const sx of [-1, 1]) {
      const ear = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 16), mat.skin);
      ear.scale.set(0.6, 1, 0.8);
      ear.position.set(sx * 0.47, -0.02, 0);
      head.add(ear);
    }
    const nose = new THREE.Mesh(new THREE.SphereGeometry(0.06, 16, 16), mat.skin);
    nose.scale.set(0.9, 1.1, 1);
    nose.position.set(0, -0.07, 0.48);
    head.add(nose);

    // eyes (blink by scaling)
    const eyes: THREE.Group[] = [];
    for (const sx of [-1, 1]) {
      const eye = new THREE.Group();
      eye.position.set(sx * 0.17, 0.04, 0.42);
      const sclera = new THREE.Mesh(new THREE.SphereGeometry(0.075, 20, 20), mat.white);
      sclera.scale.z = 0.6;
      eye.add(sclera);
      const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.042, 16, 16), mat.pupil);
      pupil.position.z = 0.04;
      eye.add(pupil);
      head.add(eye);
      eyes.push(eye);
      const brow = new THREE.Mesh(new THREE.CapsuleGeometry(0.022, 0.13, 4, 8), mat.hair);
      brow.rotation.z = Math.PI / 2 - sx * 0.1;
      brow.position.set(sx * 0.17, 0.19, 0.45);
      head.add(brow);
      // glasses
      const lens = new THREE.Mesh(new THREE.TorusGeometry(0.11, 0.013, 8, 32), mat.frame);
      lens.position.set(sx * 0.18, 0.04, 0.5);
      head.add(lens);
      const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.45, 6), mat.frame);
      arm.rotation.x = Math.PI / 2;
      arm.position.set(sx * 0.3, 0.06, 0.28);
      head.add(arm);
    }
    const bridge = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.13, 6), mat.frame);
    bridge.rotation.z = Math.PI / 2;
    bridge.position.set(0, 0.06, 0.5);
    head.add(bridge);
    // smile
    const arc = Math.PI * 0.62;
    const smile = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.016, 8, 24, arc), mat.lip);
    smile.rotation.z = (3 * Math.PI) / 2 - arc / 2;
    smile.position.set(0, -0.15, 0.44);
    head.add(smile);

    // curly hair: instanced blobs + curls on the top / back of the head
    const rand = (() => {
      let s = 42;
      return () => ((s = (s * 16807) % 2147483647) / 2147483647);
    })();
    const curlPositions: THREE.Vector3[] = [];
    for (let i = 0; i < 900 && curlPositions.length < 240; i++) {
      const u = rand(), v = rand();
      const theta = Math.acos(1 - 2 * u);
      const phi = v * Math.PI * 2;
      const dir = new THREE.Vector3(Math.sin(theta) * Math.cos(phi), Math.cos(theta), Math.sin(theta) * Math.sin(phi));
      const front = dir.z > 0.25;
      if (front ? theta > 0.9 : theta > (dir.z < -0.2 ? 1.85 : 1.35)) continue; // keep the face & ears clear
      curlPositions.push(dir);
    }
    const blobGeo = new THREE.IcosahedronGeometry(1, 1);
    const blobs = new THREE.InstancedMesh(blobGeo, mat.hair, curlPositions.length);
    const curlGeo = new THREE.TorusGeometry(0.07, 0.03, 6, 14);
    const curls = new THREE.InstancedMesh(curlGeo, mat.hair, curlPositions.length);
    const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), sc = new THREE.Vector3(), pos = new THREE.Vector3();
    const tint = new THREE.Color();
    curlPositions.forEach((dir, i) => {
      const r = 0.085 + rand() * 0.05;
      pos.copy(dir).multiply(new THREE.Vector3(0.46, 0.52, 0.47)).addScaledVector(dir, 0.03 + rand() * 0.04);
      pos.y += 0.03;
      q.setFromEuler(new THREE.Euler(rand() * 6, rand() * 6, rand() * 6));
      sc.setScalar(r);
      blobs.setMatrixAt(i, m4.compose(pos, q, sc));
      tint.set(HAIR).offsetHSL(0, 0, (rand() - 0.5) * 0.05);
      blobs.setColorAt(i, tint);
      pos.addScaledVector(dir, r * 0.75);
      q.setFromEuler(new THREE.Euler(rand() * 6, rand() * 6, rand() * 6));
      sc.setScalar(0.65 + rand() * 0.45);
      curls.setMatrixAt(i, m4.compose(pos, q, sc));
    });
    head.add(blobs, curls);

    // ---------- arms + laptop ----------
    const laptop = new THREE.Group();
    laptop.position.set(0, 0.12, 0.85);
    root.add(laptop);
    const base = new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.05, 0.8), mat.laptop);
    laptop.add(base);
    const hinge = new THREE.Group();
    hinge.position.set(0, 0.025, 0.4);
    hinge.rotation.x = 0.28;
    laptop.add(hinge);
    const lid = new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.8, 0.035), mat.laptop);
    lid.position.y = 0.4;
    hinge.add(lid);
    // glowing logo on the back of the lid
    const logo = makeCanvasTexture(256, 256);
    logo.ctx.fillStyle = ACCENT;
    logo.ctx.font = "bold 120px ui-monospace, Consolas, monospace";
    logo.ctx.textAlign = "center";
    logo.ctx.textBaseline = "middle";
    logo.ctx.fillText("</>", 128, 132);
    logo.tex.needsUpdate = true;
    const logoMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.42, 0.42), new THREE.MeshBasicMaterial({ map: logo.tex, transparent: true, toneMapped: false }));
    logoMesh.position.set(0, 0.42, 0.02);
    hinge.add(logoMesh);

    // desk (also hides the lower body)
    const desk = new THREE.Mesh(new THREE.BoxGeometry(4.2, 1.4, 1.7), new THREE.MeshStandardMaterial({ color: "#101216", roughness: 0.6, metalness: 0.3 }));
    desk.position.set(0, 0.095 - 0.7, 0.75);
    root.add(desk);
    const edge = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.012, 0.012), mat.accent);
    edge.position.set(0, 0.095, 1.6);
    root.add(edge);
    const mug = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.09, 0.22, 20), new THREE.MeshStandardMaterial({ color: "#f2f2ee", roughness: 0.4 }));
    mug.position.set(1.0, 0.205, 0.95);
    root.add(mug);
    const coffee = new THREE.Mesh(new THREE.CircleGeometry(0.085, 20), new THREE.MeshStandardMaterial({ color: "#3b2416", roughness: 0.3 }));
    coffee.rotation.x = -Math.PI / 2;
    coffee.position.set(1.0, 0.3, 0.95);
    root.add(coffee);

    const hands: THREE.Mesh[] = [];
    const armGeo = new THREE.CapsuleGeometry(0.11, 0.62, 6, 12);
    for (const sx of [-1, 1]) {
      const shoulder = new THREE.Vector3(sx * 0.72, 0.72, 0);
      const hand = new THREE.Vector3(sx * 0.32, 0.22, 0.62);
      const arm = new THREE.Mesh(armGeo, mat.hoodie);
      arm.position.copy(shoulder).lerp(hand, 0.5);
      arm.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), hand.clone().sub(shoulder).normalize());
      root.add(arm);
      const h = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 16), mat.skin);
      h.scale.set(1, 0.7, 1.2);
      h.position.copy(hand);
      root.add(h);
      hands.push(h);
    }

    // ---------- floating code + data panels ----------
    const code = makeCanvasTexture(640, 460);
    const codePanel = new THREE.Mesh(
      new THREE.PlaneGeometry(1.5, 1.08),
      new THREE.MeshBasicMaterial({ map: code.tex, transparent: true, toneMapped: false, side: THREE.DoubleSide }),
    );
    codePanel.position.set(-1.5, 1.5, -0.4);
    codePanel.rotation.y = 0.42;
    scene.add(codePanel);

    const chart = makeCanvasTexture(420, 320);
    const chartPanel = new THREE.Mesh(
      new THREE.PlaneGeometry(1.05, 0.8),
      new THREE.MeshBasicMaterial({ map: chart.tex, transparent: true, toneMapped: false, side: THREE.DoubleSide }),
    );
    chartPanel.position.set(1.5, 1.2, -0.3);
    chartPanel.rotation.y = -0.45;
    scene.add(chartPanel);

    const drawCode = (chars: number) => {
      const { ctx } = code;
      panelFrame(ctx, 640, 460, "model.py", ACCENT);
      ctx.font = "21px ui-monospace, Consolas, monospace";
      // lines typed so far, scrolled so the newest 13 stay visible
      const typedLines: string[] = [];
      let left = chars;
      for (const line of CODE) {
        if (left <= 0) break;
        typedLines.push(line.slice(0, left));
        left -= line.length + 1;
      }
      const start = Math.max(0, typedLines.length - 13);
      typedLines.slice(start).forEach((shown, i, arr) => {
        const y = 82 + i * 27;
        ctx.fillStyle = "#4b5160";
        ctx.fillText(String(start + i + 1).padStart(2, " "), 22, y);
        ctx.fillStyle = shown.startsWith("#") ? ACCENT : /^(import|from|def|print)/.test(shown) ? "#c084fc" : "#e9edf6";
        ctx.fillText(shown, 64, y);
        if (i === arr.length - 1 && Math.floor(performance.now() / 400) % 2 === 0) {
          ctx.fillStyle = ACCENT;
          ctx.fillRect(64 + ctx.measureText(shown).width + 2, y - 18, 11, 22);
        }
      });
      code.tex.needsUpdate = true;
    };

    const drawChart = (t: number) => {
      const { ctx } = chart;
      panelFrame(ctx, 420, 320, "training.log", CYAN);
      ctx.strokeStyle = "#262a33";
      ctx.lineWidth = 1;
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo(30, 90 + i * 50);
        ctx.lineTo(395, 90 + i * 50);
        ctx.stroke();
      }
      // loss curve (falling) + accuracy (rising)
      const curve = (fn: (x: number) => number, color: string) => {
        ctx.strokeStyle = color;
        ctx.lineWidth = 4;
        ctx.beginPath();
        for (let x = 0; x <= 1.0001; x += 0.02) {
          const px = 35 + x * 355;
          const py = 270 - fn(x) * 170 + Math.sin(x * 40 + t * 3) * 2;
          if (x === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      };
      curve((x) => 0.15 + 0.82 * Math.exp(-x * 4.5), "#ff7a59");
      curve((x) => 0.97 * (1 - Math.exp(-x * 5)), CYAN);
      ctx.font = "18px ui-monospace, Consolas, monospace";
      ctx.fillStyle = CYAN;
      ctx.fillText("acc 0.974", 260, 74);
      ctx.fillStyle = "#ff7a59";
      ctx.fillText("loss ↓", 150, 74);
      chart.tex.needsUpdate = true;
    };

    // floating glyphs
    const glyphs: { sprite: THREE.Sprite; r: number; speed: number; y: number; phase: number }[] = [];
    ["{ }", "</>", "λ", "AI", "01", "SQL", "py", "∑"].forEach((g, i) => {
      const { ctx, tex } = makeCanvasTexture(128, 128);
      ctx.font = "bold 54px ui-monospace, Consolas, monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = i % 2 ? CYAN : ACCENT;
      ctx.fillText(g, 64, 66);
      tex.needsUpdate = true;
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, opacity: 0.85, toneMapped: false, depthWrite: false }));
      sprite.scale.setScalar(0.32);
      scene.add(sprite);
      glyphs.push({ sprite, r: 1.7 + (i % 3) * 0.25, speed: 0.18 + (i % 4) * 0.05, y: 0.6 + (i % 4) * 0.45, phase: (i / 8) * Math.PI * 2 });
    });

    // ---------- layout ----------
    const layout = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(layout);
    ro.observe(mount);
    layout();

    // ---------- interaction ----------
    const mouse = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      const r = mount.getBoundingClientRect();
      mouse.x = THREE.MathUtils.clamp(((e.clientX - (r.left + r.width / 2)) / window.innerWidth) * 2, -1, 1);
      mouse.y = THREE.MathUtils.clamp(((e.clientY - (r.top + r.height * 0.35)) / window.innerHeight) * 2, -1, 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    // ---------- loop ----------
    let raf = 0, running = false, visible = true, last = performance.now(), t = 0;
    let nextBlink = 2.5, typed = 0, lastDraw = 0;
    const frame = () => {
      raf = requestAnimationFrame(frame);
      const now = performance.now();
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      t += reduced ? 0 : dt;

      // head follows the cursor; gentle idle sway
      head.rotation.y += (mouse.x * 0.5 + Math.sin(t * 0.6) * 0.05 - head.rotation.y) * 0.08;
      head.rotation.x += (mouse.y * 0.25 + 0.08 + Math.sin(t * 2.2) * 0.012 - head.rotation.x) * 0.08;
      root.rotation.y += (mouse.x * 0.15 - root.rotation.y) * 0.04;
      body.scale.y = 1 + Math.sin(t * 1.6) * 0.008; // breathing

      // typing
      hands[0].position.y = 0.22 + Math.max(0, Math.sin(t * 14)) * 0.03;
      hands[1].position.y = 0.22 + Math.max(0, Math.sin(t * 14 + 1.7)) * 0.03;

      // blink
      if (t > nextBlink) {
        const k = t - nextBlink;
        const s = k < 0.07 ? 1 - k / 0.07 : k < 0.14 ? (k - 0.07) / 0.07 : 1;
        eyes.forEach((e) => (e.scale.y = Math.max(0.08, s)));
        if (k >= 0.14) nextBlink = t + 2.5 + Math.random() * 3;
      }

      codePanel.position.y = 1.5 + Math.sin(t * 0.9) * 0.05;
      chartPanel.position.y = 1.2 + Math.sin(t * 0.9 + 1.5) * 0.05;
      glyphs.forEach((g) => {
        const a = g.phase + t * g.speed;
        g.sprite.position.set(Math.cos(a) * g.r, g.y + Math.sin(t + g.phase) * 0.08, Math.sin(a) * g.r * 0.6 - 0.3);
      });
      screenGlow.intensity = 0.9 + Math.sin(t * 3) * 0.12;

      if (now - lastDraw > 70) {
        lastDraw = now;
        const total = CODE.join("").length + CODE.length;
        typed = reduced ? total : (typed + 2) % (total + 60);
        drawCode(Math.min(typed, total));
        drawChart(t);
      }
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
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        m.geometry?.dispose();
        const mats = Array.isArray(m.material) ? m.material : m.material ? [m.material] : [];
        mats.forEach((mm) => {
          (mm as THREE.MeshBasicMaterial).map?.dispose();
          mm.dispose();
        });
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />;
}
