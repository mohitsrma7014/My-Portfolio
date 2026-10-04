// Point clouds for the portfolio hero. Each returns n xyz triplets fitted to roughly radius 2.

export type ShapeId = "name" | "neural" | "scatter" | "heatmap" | "gear";

function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Out = Float32Array;

/** "MOHIT" rendered to an offscreen canvas and sampled into particles. */
function name(out: Out, n: number, r: () => number) {
  const W = 640, H = 170;
  const pts: [number, number][] = [];
  if (typeof document !== "undefined") {
    const c = document.createElement("canvas");
    c.width = W;
    c.height = H;
    const ctx = c.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#fff";
      ctx.font = "800 150px system-ui, -apple-system, Segoe UI, Arial, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("MOHIT", W / 2, H / 2 + 6);
      const data = ctx.getImageData(0, 0, W, H).data;
      for (let y = 0; y < H; y += 2) for (let x = 0; x < W; x += 2) if (data[(y * W + x) * 4 + 3] > 140) pts.push([x, y]);
    }
  }
  for (let i = 0; i < n; i++) {
    if (!pts.length) {
      out.set([(r() - 0.5) * 4, (r() - 0.5) * 1, (r() - 0.5) * 0.3], i * 3);
      continue;
    }
    const [x, y] = pts[Math.floor(r() * pts.length)];
    out.set([(x / W - 0.5) * 4.2 + (r() - 0.5) * 0.02, -(y / H - 0.5) * 1.12, (r() - 0.5) * 0.35], i * 3);
  }
}

/** Layered neural network: nodes plus the connections between layers. */
function neural(out: Out, n: number, r: () => number) {
  const layers = [4, 7, 9, 7, 3];
  const xs = layers.map((_, i) => -2 + (i * 4) / (layers.length - 1));
  const nodes = layers.map((count, li) =>
    Array.from({ length: count }, (_, k) => [xs[li], (k - (count - 1) / 2) * 0.42, 0] as [number, number, number]),
  );
  for (let i = 0; i < n; i++) {
    if (r() < 0.45) {
      // node: small sphere
      const layer = nodes[Math.floor(r() * nodes.length)];
      const [x, y, z] = layer[Math.floor(r() * layer.length)];
      const th = r() * Math.PI * 2, ph = Math.acos(2 * r() - 1), rad = 0.09;
      out.set([x + Math.sin(ph) * Math.cos(th) * rad, y + Math.sin(ph) * Math.sin(th) * rad, z + Math.cos(ph) * rad], i * 3);
    } else {
      // edge between adjacent layers
      const li = Math.floor(r() * (nodes.length - 1));
      const a = nodes[li][Math.floor(r() * nodes[li].length)];
      const b = nodes[li + 1][Math.floor(r() * nodes[li + 1].length)];
      const t = r();
      out.set([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, (r() - 0.5) * 0.02], i * 3);
    }
  }
}

/** Two data clusters with a regression line — classic ML plot, in 3D. */
function scatter(out: Out, n: number, r: () => number) {
  const gauss = () => Math.sqrt(-2 * Math.log(r() + 1e-9)) * Math.cos(2 * Math.PI * r());
  for (let i = 0; i < n; i++) {
    const p = r();
    if (p < 0.12) {
      const t = r() * 4 - 2; // regression line
      out.set([t, t * 0.55, 0], i * 3);
    } else if (p < 0.2) {
      // axes
      const t = r() * 4.4 - 2.2;
      out.set(r() < 0.5 ? [t, -1.6, 0] : [-2.2, t * 0.75, 0], i * 3);
    } else {
      const t = r() * 4 - 2;
      const side = r() < 0.5 ? 1 : -1;
      out.set([t + gauss() * 0.15, t * 0.55 + side * (0.35 + Math.abs(gauss()) * 0.3), gauss() * 0.35], i * 3);
    }
  }
}

/** Dashboard heat map: a 3D grid of bars like a live KPI surface. */
function heatmap(out: Out, n: number, r: () => number) {
  const G = 9;
  for (let i = 0; i < n; i++) {
    const gx = Math.floor(r() * G), gz = Math.floor(r() * G);
    const x = (gx / (G - 1) - 0.5) * 3.6, z = (gz / (G - 1) - 0.5) * 3.6;
    const h = 0.25 + 1.6 * (0.5 + 0.5 * Math.sin(gx * 0.8) * Math.cos(gz * 0.7)) * (0.6 + 0.4 * Math.sin(gx + gz));
    const y = r() < 0.4 ? h : r() * h;
    out.set([x + (r() - 0.5) * 0.12, y - 1.1, z + (r() - 0.5) * 0.12], i * 3);
  }
}

function gear(out: Out, n: number, r: () => number) {
  const teeth = 12, Rb = 1.55, Rt = 1.95, Rh = 0.55, depth = 0.5;
  const profile = (a: number) => {
    const s = Math.sin(a * teeth);
    return s > 0.15 ? Rt : s < -0.15 ? Rb : Rb + ((s + 0.15) / 0.3) * (Rt - Rb);
  };
  for (let i = 0; i < n; i++) {
    const a = r() * Math.PI * 2;
    const pick = r();
    let rad: number, z: number;
    if (pick < 0.45) {
      rad = profile(a);
      z = (r() - 0.5) * depth;
    } else if (pick < 0.62) {
      rad = Rh;
      z = (r() - 0.5) * depth;
    } else if (pick < 0.75) {
      rad = 0.95;
      z = (r() < 0.5 ? -0.5 : 0.5) * depth;
    } else {
      rad = Rh + Math.sqrt(r()) * (profile(a) - Rh);
      z = (r() < 0.5 ? -0.5 : 0.5) * depth;
    }
    out.set([Math.cos(a) * rad, Math.sin(a) * rad, z], i * 3);
  }
}

const GEN: Record<ShapeId, (o: Out, n: number, r: () => number) => void> = { name, neural, scatter, heatmap, gear };

export function buildShape(shape: ShapeId, n: number): Float32Array {
  const out = new Float32Array(n * 3);
  GEN[shape](out, n, rng(shape.length * 7919 + n));
  return out;
}
