"use client";

import { useEffect, useRef } from 'react';

export default function ParticleBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let particles = [];
        let animationFrameId;
        let width = window.innerWidth;
        let height = window.innerHeight;

        // Mouse tracking for fluid wake interaction
        let mouse = {
            x: -1000,
            y: -1000,
            prevX: -1000,
            prevY: -1000,
            vx: 0,
            vy: 0,
            radius: 150 // Area of influence
        };

        const colors = ['#4285F4', '#EA4335', '#FBBC05', '#34A853']; // Google colors

        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = width / 2;
                this.y = height / 2;

                // Base orbit properties
                this.baseAngle = Math.random() * Math.PI * 2;
                this.baseRadius = Math.random() * (width / 1.5);
                this.orbitSpeed = Math.random() * 0.001 + 0.0005;

                // Physics properties
                this.vx = 0;
                this.vy = 0;
                this.friction = 0.92; // Damping
                this.springFactor = 0.03; // Pull back to base orbit

                // Visual properties
                this.size = Math.random() * 1.5 + 1;
                // Capsule length relative to size
                this.length = this.size * (Math.random() * 3 + 2);
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.opacity = Math.random() * 0.6 + 0.3;

                // Current apparent rotation (aligns with velocity)
                this.rotation = this.baseAngle;
            }

            update() {
                // 1. Calculate base "home" orbit position
                this.baseAngle += this.orbitSpeed;
                const targetX = width / 2 + Math.cos(this.baseAngle) * this.baseRadius;
                const targetY = height / 2 + Math.sin(this.baseAngle) * this.baseRadius;

                // 2. Mouse Interaction (Fluid Wake / Momentum Transfer)
                if (mouse.x > 0 && mouse.y > 0) {
                    const dx = this.x - mouse.x;
                    const dy = this.y - mouse.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < mouse.radius && (Math.abs(mouse.vx) > 0.1 || Math.abs(mouse.vy) > 0.1)) {
                        // Inherit velocity from the mouse wake based on proximity
                        const force = (mouse.radius - distance) / mouse.radius;
                        this.vx += mouse.vx * force * 0.15;
                        this.vy += mouse.vy * force * 0.15;
                    }
                }

                // 3. Spring back to base position
                const dxHome = targetX - this.x;
                const dyHome = targetY - this.y;
                this.vx += dxHome * this.springFactor;
                this.vy += dyHome * this.springFactor;

                // 4. Apply friction (damping)
                this.vx *= this.friction;
                this.vy *= this.friction;

                // 5. Update position based on velocity
                this.x += this.vx;
                this.y += this.vy;

                // 6. Calculate rotation based on current movement direction
                const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
                if (speed > 0.1) {
                    // Turn to face movement direction
                    this.rotation = Math.atan2(this.vy, this.vx);
                } else {
                    // Slowly return to facing the orbit direction
                    const targetRotation = this.baseAngle + Math.PI / 2;
                    // Simplistic rotation smoothing (doesn't handle 360 wrap around perfectly but sufficient for small particles)
                    this.rotation += (targetRotation - this.rotation) * 0.05;
                }
            }

            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation);

                ctx.beginPath();
                // Draw a small capsule/line that stretches based on velocity
                const stretch = Math.max(1, Math.sqrt(this.vx * this.vx + this.vy * this.vy) * 0.2);
                ctx.moveTo(-this.length * stretch, 0);
                ctx.lineTo(this.length * stretch, 0);

                ctx.strokeStyle = this.color;
                ctx.lineWidth = this.size;
                ctx.globalAlpha = this.opacity;
                ctx.lineCap = 'round';
                ctx.stroke();

                ctx.restore();
            }
        }

        const init = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;

            // Density based on screen size, similar to reference
            const numberOfParticles = Math.floor((width * height) / 3000);
            particles = [];
            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle());
                // Instantly advance them so they don't start clustered in the exact center
                particles[i].x = width / 2 + Math.cos(particles[i].baseAngle) * particles[i].baseRadius;
                particles[i].y = height / 2 + Math.sin(particles[i].baseAngle) * particles[i].baseRadius;
            }
        };

        const animate = () => {
            // Gentle fade for very slight trails, but mostly crisp capsules
            ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
            ctx.fillRect(0, 0, width, height);

            // Calculate mouse velocity for this frame
            mouse.vx = mouse.x - mouse.prevX;
            mouse.vy = mouse.y - mouse.prevY;
            mouse.prevX = mouse.x;
            mouse.prevY = mouse.y;

            // Decay mouse velocity if it stops moving
            mouse.vx *= 0.8;
            mouse.vy *= 0.8;

            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        init();
        animate();

        const handleResize = () => {
            init();
        };

        const handleMouseMove = (e) => {
            mouse.prevX = mouse.x;
            mouse.prevY = mouse.y;
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        }

        const handleMouseLeave = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        }

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
                pointerEvents: 'none',
                opacity: 1
            }}
        />
    );
}
