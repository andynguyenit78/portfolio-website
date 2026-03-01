"use client";

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

export default function ParticleBackground() {
    const canvasRef = useRef(null);
    const { resolvedTheme } = useTheme();
    const themeRef = useRef('dark');

    // Keep the latest theme in a ref so the requestAnimationFrame loop can access it without restarting
    useEffect(() => {
        themeRef.current = resolvedTheme;
    }, [resolvedTheme]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId;
        let width = window.innerWidth;
        let height = window.innerHeight;

        // 3D Perspective setup
        const FOV = Math.max(width, height);

        // Sphere properties
        // Make the sphere massive enough to fill the entire background
        const SPHERE_RADIUS = Math.max(width, height) * 1.5;
        const NUM_PARTICLES = width < 768 ? 1200 : 2500; // Increased density for larger sphere
        const PARTICLE_SIZES = [0.8, 1.2, 1.6, 2.0];

        // Google colors
        const colors = [
            { r: 66, g: 133, b: 244 },  // Blue
            { r: 234, g: 67, b: 53 },   // Red
            { r: 251, g: 188, b: 5 },   // Yellow
            { r: 52, g: 168, b: 83 }    // Green
        ];

        // Mouse tracking for 3D rotation
        let mouseX = 0;
        let mouseY = 0;
        let targetRotationX = 0;
        let targetRotationY = 0;
        let currentRotationX = 0;
        let currentRotationY = 0;

        // Base continuous rotation
        let baseRotationY = 0;
        let baseRotationX = 0;

        let particles = [];

        // Distribute points evenly on a sphere using Fibonacci sphere algorithm
        const initParticles = () => {
            particles = [];
            const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

            for (let i = 0; i < NUM_PARTICLES; i++) {
                // y goes from 1 to -1
                const y = 1 - (i / (NUM_PARTICLES - 1)) * 2;
                // radius at y
                const radiusAtY = Math.sqrt(1 - y * y);

                // golden angle increment
                const theta = phi * i;

                const x = Math.cos(theta) * radiusAtY;
                const z = Math.sin(theta) * radiusAtY;

                // Add subtle noise/jitter so it's not a perfect math sphere
                const distanceOffset = 0.85 + Math.random() * 0.3;

                particles.push({
                    x: x * SPHERE_RADIUS * distanceOffset,
                    y: y * SPHERE_RADIUS * distanceOffset,
                    z: z * SPHERE_RADIUS * distanceOffset,
                    baseSize: PARTICLE_SIZES[Math.floor(Math.random() * PARTICLE_SIZES.length)],
                    color: colors[Math.floor(Math.random() * colors.length)]
                });
            }
        };

        const render = () => {
            // Faint trailing effect matching the current theme
            const isDark = themeRef.current === 'dark';
            ctx.fillStyle = isDark ? 'rgba(5, 5, 5, 0.4)' : 'rgba(255, 255, 255, 0.4)';
            ctx.fillRect(0, 0, width, height);

            // Interpolate rotation for smooth mouse interaction
            currentRotationX += (targetRotationX - currentRotationX) * 0.05;
            currentRotationY += (targetRotationY - currentRotationY) * 0.05;

            // Continuous slow spin
            baseRotationY += 0.0008;
            baseRotationX += 0.0004;

            const totalRotY = currentRotationY + baseRotationY;
            const totalRotX = currentRotationX + baseRotationX;

            // Pre-calculate sin/cos for rotation matrices
            const sinY = Math.sin(totalRotY);
            const cosY = Math.cos(totalRotY);
            const sinX = Math.sin(totalRotX);
            const cosX = Math.cos(totalRotX);

            // Project completely from 3D coords
            particles.forEach((p) => {
                // Rotation around Y axis (Horizontal mouse movement)
                let rotY_X = p.x * cosY - p.z * sinY;
                let rotY_Z = p.z * cosY + p.x * sinY;
                let rotY_Y = p.y;

                // Rotation around X axis (Vertical mouse movement)
                let finalX = rotY_X;
                let finalY = rotY_Y * cosX - rotY_Z * sinX;
                let finalZ = rotY_Z * cosX + rotY_Y * sinX;

                // Move sphere slightly back in Z space so it sits behind the screen
                finalZ += SPHERE_RADIUS * 1.2;

                // 3D to 2D Projection
                if (finalZ > -FOV) {
                    const scale = FOV / (FOV + finalZ);
                    const projX = (finalX * scale) + (width / 2);
                    const projY = (finalY * scale) + (height / 2);

                    const projectedSize = p.baseSize * scale;

                    if (projectedSize > 0.1) {
                        ctx.beginPath();
                        ctx.arc(projX, projY, projectedSize, 0, Math.PI * 2);

                        // Depth-based opacity (farther = more transparent)
                        // Z roughly spans from 0 to SPHERE_RADIUS * 2.4
                        const depthPercentage = finalZ / (SPHERE_RADIUS * 2.4);
                        // Fade out objects in the back, keep objects in front solid
                        let opacity = 1 - Math.pow(depthPercentage, 1.5);
                        opacity = Math.max(0.05, Math.min(0.8, opacity));

                        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${opacity})`;
                        ctx.fill();
                    }
                }
            });

            animationFrameId = requestAnimationFrame(render);
        };

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            initParticles();
        };

        const handleMouseMove = (e) => {
            // Map mouse position to a rotation angle
            // Limit rotation to a subtle tilt (e.g. +/- 30 degrees)
            mouseX = (e.clientX / width) * 2 - 1;
            mouseY = (e.clientY / height) * 2 - 1;

            // Note: moving mouse right (positive X) should rotate around Y axis
            // moving mouse down (positive Y) should rotate around X axis
            targetRotationY = mouseX * (Math.PI / 6);
            targetRotationX = -mouseY * (Math.PI / 6);
        };

        const handleMouseLeave = () => {
            targetRotationX = 0;
            targetRotationY = 0;
        };

        handleResize();
        render();

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseout', handleMouseLeave);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseout', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                pointerEvents: 'none'
            }}
        />
    );
}
