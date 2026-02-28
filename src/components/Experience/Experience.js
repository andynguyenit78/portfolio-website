"use client";

import styles from "./Experience.module.css";
import { motion } from "framer-motion";

const experiences = [
    {
        id: 1,
        role: "Senior Software Engineer",
        company: "FPT Software",
        period: "Jul 2023 - Present",
        description: "Participated in a Scrum team. Managed requirement gathering, feedback, ticket breakdown, and estimation. Developed frontend designs and implementations using React.js, and backend APIs with Java Spring Boot (including unit tests). Wrote test cases and maintained code quality.",
        skills: ["React.js", "Java", "Spring Boot", "Scrum", "Frontend", "Backend", "Testing"]
    },
    {
        id: 2,
        role: "Frontend Developer",
        company: "Estuary Solutions",
        period: "Oct 2021 - Apr 2023",
        description: "Communicated with stakeholders to build UI and integrate APIs. Developed and maintained web features with advanced animations (Framer Motion, CSS). Built responsive, cross-browser, SEO-friendly pages. Defined architecture, coding conventions, and mentored fresher developers.",
        skills: ["Figma", "Next.js", "Framer Motion", "CSS", "UI/UX", "Mentoring"]
    },
    {
        id: 3,
        role: "Frontend Developer",
        company: "Ant-Tech",
        period: "Oct 2020 - Oct 2021",
        description: "Participated in UI/UX discussions and API integration. Built reusable components and an internal shared component library. Optimized page speed and responsiveness for small-screen devices.",
        skills: ["React Query", "Google Maps API", "React", "Performance Optimization"]
    }
];

export default function Experience() {

    const fadeUpVariant = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <section id="experience" className={`section ${styles.experience}`}>
            <div className="container">
                <motion.h2
                    className={styles.sectionTitle}
                    variants={fadeUpVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    Work Experience
                </motion.h2>

                <div className={styles.timeline}>
                    {experiences.map((exp, idx) => (
                        <motion.div
                            key={exp.id}
                            className={styles.item}
                            variants={fadeUpVariant}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <div className={styles.period}>{exp.period}</div>
                            <div className={styles.content}>
                                <h3 className={styles.role}>{exp.role}</h3>
                                <h4 className={styles.company}>{exp.company}</h4>
                                <p className={styles.description}>{exp.description}</p>
                                <div className={styles.skills}>
                                    {exp.skills.map((skill, idx) => (
                                        <span key={idx} className={styles.skillTag}>{skill}</span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
