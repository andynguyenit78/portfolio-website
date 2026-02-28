"use client";

import styles from "./About.module.css";
import { useEffect, useRef, useState } from "react";

const skills = [
    "HTML5", "CSS3 / SCSS", "JavaScript (ES6+)", "TypeScript",
    "React.js", "Next.js", "Redux", "Tailwind CSS",
    "Git & GitHub", "RESTful APIs", "Responsive Design", "Agile / Scrum"
];

export default function About() {
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
        <section id="about" ref={sectionRef} className={`section ${styles.about} ${isVisible ? styles.visible : ""}`}>
            <div className="container">
                <div className={styles.grid}>
                    <div className={styles.bio}>
                        <h2 className={styles.heading}>About Me</h2>
                        <p className={styles.text}>
                            I am a dedicated Front-End Developer with over four years of experience in web development, currently contributing to innovative projects at <strong>FPT Software</strong> in Ho Chi Minh City.
                        </p>
                        <p className={styles.text}>
                            My focus is on bridging the gap between design and engineering, ensuring that the applications I build are not only visually appealing but also highly performant and accessible to all users. I thrive in collaborative environments and am passionate about learning and applying new technologies to solve complex problems.
                        </p>
                        <p className={styles.text}>
                            When I&apos;m not coding, I enjoy exploring new web design trends and continuously refining my craft to build pixel-perfect interfaces.
                        </p>
                    </div>
                    <div className={styles.skills}>
                        <h2 className={styles.heading}>My Skills</h2>
                        <ul className={styles.skillList}>
                            {skills.map((skill, index) => (
                                <li key={index} className={styles.skillItem}>{skill}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
