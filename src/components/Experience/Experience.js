"use client";

import styles from "./Experience.module.css";
import { useEffect, useRef, useState } from "react";

const experiences = [
    {
        id: 1,
        role: "Front-End Developer",
        company: "FPT Software",
        period: "2019 - Present",
        description: "Specialized in front-end technologies, building responsive and high-performance web applications. Collaborated with cross-functional teams to deliver pixel-perfect user interfaces and smooth user experiences for large-scale enterprise clients.",
        skills: ["React", "JavaScript", "HTML/CSS", "Web Performance"]
    }
];

export default function Experience() {
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
            { threshold: 0.2 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);

        return () => observer.disconnect();
    }, []);

    return (
        <section id="experience" ref={sectionRef} className={`section ${styles.experience} ${isVisible ? styles.visible : ""}`}>
            <div className="container">
                <h2 className={styles.sectionTitle}>Work Experience</h2>

                <div className={styles.timeline}>
                    {experiences.map((exp) => (
                        <div key={exp.id} className={styles.item}>
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
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
