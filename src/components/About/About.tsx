"use client";

import styles from "./About.module.css";
import { motion, Variants } from "framer-motion";
import { useTranslations } from 'next-intl';

const skills = [
    "HTML5", "CSS3 / SCSS", "JavaScript (ES6+)", "TypeScript",
    "React.js", "Next.js", "Redux", "Tailwind CSS",
    "Git & GitHub", "RESTful APIs", "Responsive Design", "Agile / Scrum"
];

export default function About() {
    const t = useTranslations('About');

    const fadeUpVariant: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
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
                        <h2 className={styles.heading}>{t('title')}</h2>
                        <p className={styles.text}>
                            {t('p1')}
                        </p>
                        <p className={styles.text}>
                            {t('p2')}
                        </p>
                        <p className={styles.text}>
                            {t('p3')}
                        </p>
                    </motion.div>

                    <motion.div
                        className={styles.skills}
                        variants={fadeUpVariant}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <h2 className={styles.heading}>{t('skillsTitle')}</h2>
                        <ul className={styles.skillList}>
                            {skills.map((skill: string, index: number) => (
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
