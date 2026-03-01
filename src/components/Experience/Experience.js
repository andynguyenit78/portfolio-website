"use client";

import styles from "./Experience.module.css";
import { motion } from "framer-motion";
import { useTranslations } from 'next-intl';

export default function Experience() {
    const t = useTranslations('Experience');
    const experiences = t.raw('items');

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
                    {t('title')}
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
                                    {exp.skills.map((skill, sIdx) => (
                                        <span key={sIdx} className={styles.skillTag}>{skill}</span>
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
