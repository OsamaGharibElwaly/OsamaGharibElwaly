"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const SKILL_LABELS = ["Python", "LLMs", "RAG", "FastAPI", "Embeddings"] as const;

export function HeroAiThree() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    const maxDpr = Math.min(window.devicePixelRatio, 1.5);
    renderer.setPixelRatio(maxDpr);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 100);
    camera.position.set(0, 0.15, 4.2);

    const root = new THREE.Group();
    scene.add(root);

    const coreGeo = new THREE.IcosahedronGeometry(0.42, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    root.add(core);

    const innerGeo = new THREE.IcosahedronGeometry(0.22, 0);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.35,
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    root.add(innerCore);

    const ringGeo = new THREE.TorusGeometry(1.05, 0.018, 10, 48);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00aeef,
      transparent: true,
      opacity: 0.4,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    root.add(ring);

    const nodeGeo = new THREE.SphereGeometry(0.11, 10, 10);
    const nodeColors = [0x22d3ee, 0x38bdf8, 0x67e8f9, 0xa5f3fc, 0xc4b5fd];
    const nodes = new THREE.Group();
    root.add(nodes);

    const nodeMeshes: THREE.Mesh[] = [];
    for (let i = 0; i < SKILL_LABELS.length; i += 1) {
      const mat = new THREE.MeshBasicMaterial({
        color: nodeColors[i % nodeColors.length],
        transparent: true,
        opacity: 0.9,
      });
      const mesh = new THREE.Mesh(nodeGeo, mat);
      const a = (i / SKILL_LABELS.length) * Math.PI * 2;
      const r = 1.55;
      mesh.position.set(Math.cos(a) * r, Math.sin(a * 0.7) * 0.35, Math.sin(a) * r);
      nodes.add(mesh);
      nodeMeshes.push(mesh);
    }

    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;

    const onMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      targetX = Math.max(-1, Math.min(1, nx)) * 0.35;
      targetY = Math.max(-1, Math.min(1, ny)) * 0.22;
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);

    const clock = new THREE.Clock();
    let raf = 0;

    const resize = () => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / Math.max(h, 1);
      camera.updateProjectionMatrix();
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const animate = () => {
      const t = clock.getElapsedTime();
      curX += (targetX - curX) * 0.06;
      curY += (targetY - curY) * 0.06;

      root.rotation.y = t * 0.35 + curX;
      root.rotation.x = curY * 0.6;
      core.rotation.y = t * 0.5;
      core.rotation.x = t * 0.12;
      innerCore.rotation.y = -t * 0.25;
      ring.rotation.z = t * 0.2;

      nodes.rotation.y = t * 0.18;
      nodeMeshes.forEach((m, i) => {
        m.position.y += Math.sin(t * 1.2 + i * 1.1) * 0.0012;
      });

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
      renderer.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      nodeGeo.dispose();
      nodeMeshes.forEach((m) => (m.material as THREE.Material).dispose());
      scene.clear();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative h-[min(52vw,420px)] min-h-[280px] w-full overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-slate-950/90 via-slate-900/80 to-slate-950/90 shadow-[0_0_40px_-12px_rgba(34,211,238,0.35)] backdrop-blur-md dark:border-cyan-400/15"
      data-testid="hero-ai-three-wrap"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        data-testid="hero-ai-three-canvas"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(34,211,238,0.12),transparent_55%)]" />
      {SKILL_LABELS.map((label, i) => {
        const angle = (i / SKILL_LABELS.length) * Math.PI * 2 - Math.PI / 2;
        const pctX = 50 + Math.cos(angle) * 38;
        const pctY = 50 + Math.sin(angle) * 34;
        return (
          <span
            key={label}
            className="hero-ai-float-badge pointer-events-none absolute rounded-full border border-cyan-400/25 bg-slate-950/55 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-cyan-100/90 shadow-sm backdrop-blur-sm"
            style={{
              left: `${pctX}%`,
              top: `${pctY}%`,
              transform: "translate(-50%, -50%)",
              animationDelay: `${i * 0.35}s`,
            }}
            data-testid={`hero-skill-node-${label.toLowerCase()}`}
          >
            {label}
          </span>
        );
      })}
    </div>
  );
}
