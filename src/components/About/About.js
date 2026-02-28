"use client";

import styles from "./About.module.css";
import { motion } from "framer-motion";

const skills = [
    "HTML5", "CSS3 / SCSS", "JavaScript (ES6+)", "TypeScript",
    "React.js", "Next.js", "Redux", "Tailwind CSS",
    "Git & GitHub", "RESTful APIs", "Responsive Design", "Agile / Scrum"
];

export default function About() {

    const fadeUpVariant = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <section id="about" className={`section ${styles.about}`}>
            <div className="container">
                <div className={styles.grid}>
                    <motion.div
                        className={styles.bio}
                        variants={fadeUpVariant}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                    >
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
                    </motion.div>

                    <motion.div
                        className={styles.skills}
                        variants={fadeUpVariant}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <h2 className={styles.heading}>My Skills</h2>
                        <ul className={styles.skillList}>
                            {skills.map((skill, index) => (
                                <motion.li
                                    key={index}
                                    className={styles.skillItem}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                >
                                    {skill}
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
