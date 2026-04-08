"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Project } from "../../lib/portfolio-data";
import { ProjectCard } from "./project-card";

type ProjectCategory = "Fullstack Web" | "QA Testing";

const CATEGORY_ORDER: ProjectCategory[] = ["Fullstack Web", "QA Testing"];

function getProjectCategory(project: Project): ProjectCategory {
  return project.category ?? "Fullstack Web";
}

interface ProjectsShowcaseProps {
  projects: Project[];
}

export function ProjectsShowcase({ projects }: ProjectsShowcaseProps) {
  const [activeCategory, setActiveCategory] =
    useState<ProjectCategory>("Fullstack Web");
  const [hoveredCategory, setHoveredCategory] = useState<ProjectCategory | null>(
    null,
  );
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const visibleCategory = hoveredCategory ?? activeCategory;

  const filteredProjects = useMemo(
    () => projects.filter((project) => getProjectCategory(project) === visibleCategory),
    [projects, visibleCategory],
  );

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const parent = canvas.parentElement;
    if (!parent) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.z = 9;

    const geometry = new THREE.IcosahedronGeometry(0.035, 0);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00aeef,
      transparent: true,
      opacity: 0.45,
    });

    const particles = new THREE.InstancedMesh(geometry, material, 260);
    const dummy = new THREE.Object3D();
    const basePositions: Array<{ x: number; y: number; z: number }> = [];

    for (let i = 0; i < 260; i += 1) {
      const radius = 1.8 + Math.random() * 3.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      basePositions.push({ x, y, z });

      dummy.position.set(x, y, z);
      dummy.updateMatrix();
      particles.setMatrixAt(i, dummy.matrix);
    }

    scene.add(particles);

    const resize = () => {
      const width = parent.clientWidth;
      const height = parent.clientHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
    };

    resize();
    window.addEventListener("resize", resize);

    const clock = new THREE.Clock();
    let rafId = 0;

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      particles.rotation.y = elapsed * 0.08;
      particles.rotation.x = elapsed * 0.03;

      for (let i = 0; i < basePositions.length; i += 1) {
        const point = basePositions[i];
        const wave = 1 + Math.sin(elapsed * 0.9 + i * 0.21) * 0.08;
        dummy.position.set(point.x * wave, point.y * wave, point.z * wave);
        dummy.updateMatrix();
        particles.setMatrixAt(i, dummy.matrix);
      }

      particles.instanceMatrix.needsUpdate = true;
      renderer.render(scene, camera);
      rafId = window.requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      scene.clear();
    };
  }, []);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#E0E0E0] bg-white/90 p-4 shadow-sm dark:border-darkBorder dark:bg-darkSurface/80">
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full opacity-60"
        data-testid="projects-three-canvas"
      />

      <div className="relative z-10 mb-6 flex flex-wrap items-center gap-3">
        {CATEGORY_ORDER.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              type="button"
              data-testid={`projects-category-${category.replace(/\s+/g, "-").toLowerCase()}`}
              onMouseEnter={() => setHoveredCategory(category)}
              onMouseLeave={() => setHoveredCategory(null)}
              onFocus={() => setHoveredCategory(category)}
              onBlur={() => setHoveredCategory(null)}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-[#00AEEF] text-white shadow-md"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      <div className="relative z-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project, index) => (
          <ProjectCard key={project.name} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}
