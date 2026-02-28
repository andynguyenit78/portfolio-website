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

        const colors = ['#4285F4', '#EA4335', '#FBBC05', '#34A853', '#8A2BE2', '#FF69B4'];

        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                // Start from center
                this.x = width / 2;
                this.y = height / 2;

                // Random angle and distance
                this.angle = Math.random() * Math.PI * 2;
                this.radius = Math.random() * (width / 1.5);

                // Final target positions based on vortex shape
                this.targetX = width / 2 + Math.cos(this.angle) * this.radius;
                this.targetY = height / 2 + Math.sin(this.angle) * this.radius;

                // Current position starts near center and expands out
                this.currentRadius = Math.random() * 50;

                this.size = Math.random() * 2 + 1;
                this.speed = Math.random() * 0.002 + 0.001; // Rotation speed
                this.expansionSpeed = Math.random() * 2 + 0.5; // Outward speed

                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.opacity = Math.random() * 0.5 + 0.2;
            }

            update() {
                // Rotate slowly
                this.angle += this.speed;

                // Expand outwards until reaching target radius
                if (this.currentRadius < this.radius) {
                    this.currentRadius += this.expansionSpeed;
                }

                // Add a slight wave/vortex effect to the radius based on angle
                const wave = Math.sin(this.angle * 3) * 20;

                this.x = width / 2 + Math.cos(this.angle) * (this.currentRadius + wave);
                this.y = height / 2 + Math.sin(this.angle) * (this.currentRadius + wave);

                // Reset if it goes out of bounds (though technically it shouldn't often with the radius cap)
                if (this.x < -100 || this.x > width + 100 || this.y < -100 || this.y > height + 100) {
                    this.reset();
                }
            }

            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                // Rotate the dash to point somewhat along the circle
                ctx.rotate(this.angle + Math.PI / 2);

                ctx.beginPath();
                // Draw a small dash instead of a circle, to match the visual reference
                ctx.moveTo(0, -this.size * 2);
                ctx.lineTo(0, this.size * 2);
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

            // Density based on screen size
            const numberOfParticles = Math.floor((width * height) / 4000);
            particles = [];
            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

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

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
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
                opacity: 0.6 // Keep it subtle so it doesn't overwhelm the content
            }}
        />
    );
}
