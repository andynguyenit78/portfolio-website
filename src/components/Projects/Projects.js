"use client";

import styles from "./Projects.module.css";
import { useEffect, useRef, useState } from "react";

const projects = [
    {
        id: 1,
        title: "E-Commerce Dashboard",
        description: "A comprehensive analytics dashboard for online retailers with real-time data visualization.",
        tech: ["Next.js", "React", "Chart.js", "CSS Modules"],
        link: "#"
    },
    {
        id: 2,
        title: "Task Management App",
        description: "A collaborative project management tool featuring real-time updates and drag-and-drop boards.",
        tech: ["React", "TypeScript", "Redux", "Firebase"],
        link: "#"
    },
    {
        id: 3,
        title: "Finance Tracker",
        description: "A personal finance application to track expenses, set budgets, and achieve financial goals.",
        tech: ["JavaScript", "HTML5", "CSS3", "REST API"],
        link: "#"
    }
];

export default function Projects() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);

        return () => observer.disconnect();
    }, []);

    return (
        <section id="projects" ref={sectionRef} className={`section ${styles.projects} ${isVisible ? styles.visible : ""}`}>
            <div className="container">
                <h2 className={styles.sectionTitle}>Featured Work</h2>
                <div className={styles.grid}>
                    {projects.map((project) => (
                        <div key={project.id} className={styles.card}>
                            <div className={styles.cardContent}>
                                <h3 className={styles.title}>{project.title}</h3>
                                <p className={styles.description}>{project.description}</p>
                                <div className={styles.techStack}>
                                    {project.tech.map((tech, idx) => (
                                        <span key={idx} className={styles.techTag}>{tech}</span>
                                    ))}
                                </div>
                                <a href={project.link} className={styles.link}>
                                    View Project <span className={styles.arrow}>→</span>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
