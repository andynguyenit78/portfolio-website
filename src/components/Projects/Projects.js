"use client";

import styles from "./Projects.module.css";
import { motion } from "framer-motion";

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

    const fadeUpVariant = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (idx) => ({
            opacity: 1,
            y: 0,
            transition: { delay: idx * 0.15, duration: 0.5 }
        })
    };

    return (
        <section id="projects" className={`section ${styles.projects}`}>
            <div className="container">
                <motion.h2
                    className={styles.sectionTitle}
                    variants={fadeUpVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    Featured Work
                </motion.h2>
                <div className={styles.grid}>
                    {projects.map((project, idx) => (
                        <motion.div
                            key={project.id}
                            className={styles.card}
                            custom={idx}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            whileHover={{ y: -8, transition: { duration: 0.2 } }}
                        >
                            <div className={styles.cardContent}>
                                <h3 className={styles.title}>{project.title}</h3>
                                <p className={styles.description}>{project.description}</p>
                                <div className={styles.techStack}>
                                    {project.tech.map((tech, i) => (
                                        <span key={i} className={styles.techTag}>{tech}</span>
                                    ))}
                                </div>
                                <a href={project.link} className={styles.link}>
                                    View Project <span className={styles.arrow}>→</span>
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
