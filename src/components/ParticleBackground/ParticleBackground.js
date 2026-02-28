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

        // Mouse tracking for interaction
        let mouse = {
            x: undefined,
            y: undefined,
            radius: 120 // How far the repulsion effect reaches
        };

        const colors = ['#4285F4', '#EA4335', '#FBBC05', '#34A853']; // Main Google colors for closer match

        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = width / 2;
                this.y = height / 2;

                this.angle = Math.random() * Math.PI * 2;
                this.radius = Math.random() * (width / 1.2);

                this.currentRadius = Math.random() * 50;
                this.size = Math.random() * 2 + 1;
                this.speed = Math.random() * 0.001 + 0.0005; // Slightly slower base rotation
                this.expansionSpeed = Math.random() * 2 + 0.5;

                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.opacity = Math.random() * 0.6 + 0.2;

                // Base anchor position for the particle (without mouse interaction)
                this.baseX = this.x;
                this.baseY = this.y;
            }

            update() {
                this.angle += this.speed;

                if (this.currentRadius < this.radius) {
                    this.currentRadius += this.expansionSpeed;
                }

                const wave = Math.sin(this.angle * 3) * 20;

                // Compute where the particle *wants* to be
                this.baseX = width / 2 + Math.cos(this.angle) * (this.currentRadius + wave);
                this.baseY = height / 2 + Math.sin(this.angle) * (this.currentRadius + wave);

                // Mouse interaction logic (Repulsion)
                if (mouse.x != null && mouse.y != null) {
                    let dx = mouse.x - this.baseX;
                    let dy = mouse.y - this.baseY;
                    let distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < mouse.radius) {
                        // Particle is inside the mouse radius, push it away
                        const forceDirectionX = dx / distance;
                        const forceDirectionY = dy / distance;

                        // Closer to mouse = stronger force. 
                        // Use a slightly damped force to make it feel "spongy"
                        const force = (mouse.radius - distance) / mouse.radius;

                        // Max push distance
                        const pushX = forceDirectionX * force * 50;
                        const pushY = forceDirectionY * force * 50;

                        this.x = this.baseX - pushX;
                        this.y = this.baseY - pushY;
                    } else {
                        // Smoothly ease back to base pos
                        this.x += (this.baseX - this.x) * 0.1;
                        this.y += (this.baseY - this.y) * 0.1;
                    }
                } else {
                    // No mouse, normal orbit
                    this.x = this.baseX;
                    this.y = this.baseY;
                }

                if (this.x < -100 || this.x > width + 100 || this.y < -100 || this.y > height + 100) {
                    this.reset();
                }
            }

            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.angle + Math.PI / 2);

                ctx.beginPath();
                ctx.moveTo(0, -this.size * 3); // Longer dashes 
                ctx.lineTo(0, this.size * 3);
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

            const numberOfParticles = Math.floor((width * height) / 3500); // Slightly more dense
            particles = [];
            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            // Use a slight fade instead of clearRect for a tiny bit of trailing effect, 
            // similar to highly polished canvas setups
            ctx.fillStyle = 'rgba(255, 255, 255, 0.15)'; // Slower fade for longer dash trails
            ctx.fillRect(0, 0, width, height);

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
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        }

        const handleMouseLeave = () => {
            mouse.x = undefined;
            mouse.y = undefined;
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
                pointerEvents: 'none', // Critical so it doesn't block underlying links
                opacity: 1 // Raised opacity as the trails provide custom fading
            }}
        />
    );
}
